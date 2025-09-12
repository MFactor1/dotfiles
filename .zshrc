# Lines configured by zsh-newuser-install
HISTFILE=~/.histfile
HISTSIZE=1000
SAVEHIST=1000
# End of lines configured by zsh-newuser-install

autoload -Uz compinit && compinit

eval "$(starship init zsh)"
eval "$(zoxide init zsh)"

USER=`whoami`

export JAVA_HOME=/usr/lib/jvm/java-21-openjdk

export PATH=$PATH:/home/$USER/.spicetify
export PATH=$PATH:/home/$USER/bin
export PATH=$PATH:/home/$USER/.cargo/bin
export PATH=$PATH:/home/$USER/.local/bin

export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools

export SSH_AUTH_SOCK="$XDG_RUNTIME_DIR/ssh-agent.socket"

# Add ssh keys (not automatic for whatever reason)
ssh-add ~/.ssh/id_ed25519 >/dev/null 2>&1
ssh-add ~/.ssh/azure-dc-dev-test.pem >/dev/null 2>&1
ssh-add ~/.ssh/oracle-live-media-systems.pem >/dev/null 2>&1

unit_sig_file="/tmp/unit.done"
integ_sig_file="/tmp/integration.done"
lvl1_sig_file="/tmp/level1.done"
api_sig_file="/tmp/api.done"
cmdr_dir="$HOME/gitrepos/mn-server/dcscommander"
test_dir="$HOME/gitrepos/mn-server/tests"
build_dir="$cmdr_dir/build"
cmdr_venv_done="$cmdr_dir/venv/dcscommander.installed"
sys_venv_done="$test_dir/venv/dc_system_tests.installed"
repo_make="$cmdr_dir/makefile.container"
test_make="$test_dir/makefile.container"
fixtures="$HOME/gitrepos/mn-server/tests/dctools/src/dctools/fixtures/storage.py"
current_workspace=$(hyprctl activeworkspace -j | jq -r '.id')

function test_full() {
	rm_sig_files
	docker-kill
	build_all_venv

	# Remove existing builds before building
	rm -rf $build_dir
    # Run the deb build in a new terminal and wait for it to complete
    kitty -d $cmdr_dir --title="deb build" -- bash -c "
		make -f makefile.container deb
	" &

	sleep 0.2
	hyprctl dispatch movetoworkspacesilent $current_workspace,title:deb build

    # Run unit/integration tests
    kitty -d $cmdr_dir --title="unit suite" -- bash -c "
		make -f makefile.container unit
		echo 'Unit tests complete, press ENTER to close'
		touch $unit_sig_file
		read line
	" &

	sleep 0.2
	hyprctl dispatch movetoworkspacesilent $current_workspace,title:unit suite

	while [[ ! -f "$unit_sig_file" ]]; do
		echo "Waiting for unit tests to complete..."
		sleep 5
	done

    kitty -d $cmdr_dir --title="integration suite" -- bash -c "
		make -f makefile.container integration
		echo 'Integration tests complete, press ENTER to close'
		touch $integ_sig_file
		read line
	" &

	sleep 0.2
	hyprctl dispatch movetoworkspacesilent $current_workspace,title:integration suite

    # Wait for deb build to complete by monitoring the deb file
    echo "Waiting for deb build to complete..."
    while [[ ! -d "$build_dir" ]]; do
		echo "Waiting for deb build to complete..."
        sleep 5
    done

    # Get the actual deb filename
    local deb_file=$(ls $build_dir/dcscommander_*.deb | head -1)
    local deb_name=$(basename "$deb_file")

    echo "Deb build complete. Found: $deb_name"
    echo "Copying deb files to servers..."

    # SCP files to both servers in parallel
    scp "$deb_file" ubuntu@10.8.3.52:~/auto/ &
    local scp1_pid=$!
    scp "$deb_file" ubuntu@10.8.3.191:~/auto/ &
    local scp2_pid=$!

    # Wait for both SCP operations to complete
    wait $scp1_pid $scp2_pid
    echo "SCP operations complete."

    echo "Installing packages and running clearall on servers..."

    # Install and run clearall on both servers in parallel
    ssh ubuntu@10.8.3.52 "sudo dpkg -i ~/auto/$deb_name && sudo dcs clearall" &
    local install1_pid=$!
    ssh ubuntu@10.8.3.191 "sudo dpkg -i ~/auto/$deb_name && sudo dcs clearall" &
    local install2_pid=$!

    # Wait for both installations to complete
    wait $install1_pid $install2_pid
    echo "Remote installations and clearall complete."

    echo "Starting test suites..."

    # Run tests in separate Ghostty terminals
    kitty -d $test_dir --title="level1 suite" -- bash -c "
		make -f makefile.container level1 DCSERVER=10.8.3.191
		echo 'level1 tests complete, press ENTER to close'
		touch $lvl1_sig_file
		read line
	" &

	sleep 0.2
	hyprctl dispatch movetoworkspacesilent $current_workspace,title:level1 suite

	while [[ ! -f "$lvl1_sig_file" ]]; do
		echo "Waiting for integration tests to complete..."
		sleep 5
	done

    kitty -d $test_dir --title="api suite" -- bash -c "
		make -f makefile.container api DCSERVER=10.8.3.52
		echo 'api tests complete, press ENTER to close'
		touch $api_sig_file
		read line
	" &

	sleep 0.2
	hyprctl dispatch movetoworkspacesilent $current_workspace,title:api suite

	while [[ ! -f "$api_sig_file" || ! -f "$integ_sig_file" ]]; do
		echo "Waiting for final tests to complete"
		sleep 5
	done

}

function test_unit() {
	rm_sig_files
	build_cmdr_venv

    # Open Ghostty terminals and run the make commands
    kitty -d $cmdr_dir --title="unit suite" -e bash -c "
		make -f makefile.container unit
		echo 'Unit tests complete, press ENTER to close'
		read line
	" &

	sleep 0.2
	hyprctl dispatch movetoworkspacesilent $current_workspace,title:unit suite
}

function test_local() {
	rm_sig_files
	docker-kill
	build_cmdr_venv

    # Open Ghostty terminals and run the make commands
    kitty -d $cmdr_dir --title="unit suite" -- bash -c "
	make -f makefile.container unit
	echo 'Unit tests complete, press ENTER to close'
	touch $unit_sig_file
	read line
	" &

	sleep 0.2
	hyprctl dispatch movetoworkspacesilent $current_workspace,title:unit suite

	while [[ ! -f "$unit_sig_file" ]]; do
		echo "Waiting for unit tests to complete..."
		sleep 5
	done

    kitty -d $cmdr_dir --title="integration suite" -- bash -c "
	make -f makefile.container integration
	echo 'Integration tests complete, press ENTER to close'
	touch $integ_sig_file
	read line
	" &

	sleep 0.2
	hyprctl dispatch movetoworkspacesilent $current_workspace,title:integration suite

	while [[ ! -f "$integ_sig_file" ]]; do
		echo "Waiting for integration tests to complete..."
		sleep 5
	done

}

function test_system() {
	rm_sig_files
	build_test_venv

	patch_systems

    echo "Starting test suites..."

    # Run tests in separate Ghostty terminals
    kitty -d $test_dir --title="level1 suite" -- bash -c "
		make -f makefile.container level1 DCSERVER=10.8.3.191
		echo 'level1 tests complete, press ENTER to close'
		touch $lvl1_sig_file
		read line
	" &

	sleep 0.2
	hyprctl dispatch movetoworkspacesilent $current_workspace,title:level1 suite

	while [[ ! -f "$lvl1_sig_file" ]]; do
		echo "Waiting for integration tests to complete..."
		sleep 5
	done

    kitty -d $test_dir --title="api suite" -- bash -c "
		make -f makefile.container api DCSERVER=10.8.3.52
		echo 'api tests complete, press ENTER to close'
		touch $api_sig_file
		read line
	" &

	sleep 0.2
	hyprctl dispatch movetoworkspacesilent $current_workspace,title:api suite

	while [[ ! -f "$api_sig_file" ]]; do
		echo "Waiting for integration tests to complete..."
		sleep 5
	done

}

function patch_systems() {
	build_test_venv

	# Remove existing builds before building
	rm -rf $build_dir
    # Run the deb build in a new terminal and wait for it to complete
    kitty -d $cmdr_dir --title="deb build" -- bash -c "
		make -f makefile.container deb
	" &

	sleep 0.2
	hyprctl dispatch movetoworkspacesilent $current_workspace,title:deb build

    # Wait for deb build to complete by monitoring the deb file
    echo "Waiting for deb build to complete..."
    while [[ ! -d "$build_dir" ]]; do
		echo "Waiting for deb build to complete..."
        sleep 5
    done

    # Get the actual deb filename
    local deb_file=$(ls $build_dir/dcscommander_*.deb | head -1)
    local deb_name=$(basename "$deb_file")

    echo "Deb build complete. Found: $deb_name"
    echo "Copying deb files to servers..."

    # SCP files to both servers in parallel
    scp "$deb_file" ubuntu@10.8.3.52:~/auto/ &
    local scp1_pid=$!
    scp "$deb_file" ubuntu@10.8.3.191:~/auto/ &
    local scp2_pid=$!

    # Wait for both SCP operations to complete
    wait $scp1_pid $scp2_pid
    echo "SCP operations complete."

    echo "Installing packages and running clearall on servers..."

    # Install and run clearall on both servers in parallel
    ssh ubuntu@10.8.3.52 "sudo dpkg -i ~/auto/$deb_name && sudo dcs clearall" &
    local install1_pid=$!
    ssh ubuntu@10.8.3.191 "sudo dpkg -i ~/auto/$deb_name && sudo dcs clearall" &
    local install2_pid=$!

    # Wait for both installations to complete
    wait $install1_pid $install2_pid
    echo "Remote installations and clearall complete."
}

function build_test_venv() {
	build_venv $test_dir $sys_venv_done
}

function build_cmdr_venv() {
	build_venv $cmdr_dir $cmdr_venv_done
}

function build_venv() {
	rm -rf $2

	add_venv

	sleep 1

    kitty -d $1 --title="Venv Build" -- bash -c "
		make -f makefile.container venv
	" &

	sleep 0.2
	hyprctl dispatch movetoworkspacesilent $current_workspace,title:Venv Build

	echo "Waiting for venv build to complete..."
    while [[ ! -f "$2" ]]; do
		echo "Waiting for venv build to complete..."
        sleep 5
    done

	rm_venv
}

function build_all_venv() {
	rm -rf $cmdr_venv_done
	rm -rf $sys_venv_done

	add_venv

    kitty -d $cmdr_dir --title="Venv Build1" -- bash -c "
		make -f makefile.container venv
	" &

	sleep 0.2
	hyprctl dispatch movetoworkspacesilent $current_workspace,title:Venv Build1

    kitty -d $test_dir --title="Venv Build2" -- bash -c "
		make -f makefile.container venv
	" &

	sleep 0.2
	hyprctl dispatch movetoworkspacesilent $current_workspace,title:Venv Build2

	echo "Waiting for venv builds to complete..."
    while [[ ! -f "$cmdr_venv_done" || ! -f "$sys_venv_done" ]]; do
		echo "Waiting for venv builds to complete..."
        sleep 5
    done

	rm_venv
}

function add_venv() {
	echo "Adding venv inner targets"

	if ! grep "^INNER_TARGETS" "$repo_make" | grep -q "venv"; then
		sed -i 's/^\(INNER_TARGETS.*$\)/\1 venv/' "$repo_make"
	fi

	if ! grep "^INNER_TARGETS" "$test_make" | grep -q "venv"; then
		sed -i 's/^\(INNER_TARGETS.*$\)/\1 venv/' "$test_make"
	fi
}

function rm_venv() {
	echo "Removing venv inner targets"

	if grep "^INNER_TARGETS" "$repo_make" | grep -q "venv"; then
		sed -i 's/^\(INNER_TARGETS.*\) venv$/\1/' "$repo_make"
	fi

	if grep "^INNER_TARGETS" "$test_make" | grep -q "venv"; then
		sed -i 's/^\(INNER_TARGETS.*\) venv$/\1/' "$test_make"
	fi
}

function rm_sig_files() {
	rm -rf $unit_sig_file $integ_sig_file $lvl1_sig_file $api_sig_file
}

up() {
	declare -i d=${@:-1}
	(( $d < 0 )) && (>&2 echo "up: Error: negative value provided") && return 1;
	cd "$(pwd | sed -E 's;(/[^/]*){0,'$d'}$;;')/";
}

purge_repo_cache() {
    original_path="$(pwd)"
    cd "$(git rev-parse --show-toplevel)"
    git clean -dfx -e "**/.env*" -e "pyrightconfig.json"
    cd "$original_path"
}

irebase() {
	git rebase -i HEAD~$1
}

terminfo() {
	infocmp -x xterm-ghostty | ssh $1 -- tic -x -
}

glog() {
	git log --oneline -$1
}

branch-update() {
	git rebase master
}

update-continue() {
	git add .
	git rebase --continue
	git push --force
}

alias purge-repo='purge_repo_cache'
alias cp='cp -r'
alias scp='scp -r'
alias purge-docker='docker system prune -a --volumes'
alias docker-kill='docker kill $(docker ps -a -q)'
alias purge-bak='rm ./**/*.py.bak'
alias container='make -f makefile.container TERM=xterm-256color'
alias reset-vpn='sudo systemctl restart wg-quick@oracle-dev wg-quick@wg0'
alias ping-vpn='ping -w 3 10.0.0.1 && ping -w 3 10.0.5.1'
alias test-full='test_full'
alias test-system='test_system'
alias test-local='test_local'
alias test-unit='test_unit'
alias patch-systems='patch_systems'
alias ls='eza --all'
alias tree='eza --tree --all'
alias ll='eza --all --long --total-size'
alias cd='z'
alias grep='rg --no-ignore --hidden'
alias cargo='cargo-1.82'
alias tokei='tokei --sort code'
alias futurize-imports="python3 $HOME/pyscripts/futurize_imports.py"
