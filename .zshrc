# Lines configured by zsh-newuser-install
HISTFILE=~/.histfile
HISTSIZE=1000
SAVEHIST=1000
# End of lines configured by zsh-newuser-install
eval "$(starship init zsh)"

USER=`whoami`

export JAVA_HOME=/usr/lib/jvm/java-21-openjdk

export PATH=$PATH:/home/$USER/.spicetify
export PATH=$PATH:/home/$USER/bin
export PATH=$PATH:/home/$USER/.cargo/bin
export PATH=$PATH:/home/$USER/.local/bin

export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools

function test_full() {
    local repo_dir="$HOME/gitrepos/mn-server/dcscommander"
    local test_dir="$HOME/gitrepos/mn-server/tests"
	local build_dir="$repo_dir/build"
	local cmdr_venv_done="$repo_dir/venv/dcscommander.installed"
	local sys_venv_done="$test_dir/venv/dc_system_tests.installed"

	build_all_venv

    # Open Ghostty terminals and run the make commands
    flatpak run app.devsuite.Ptyxis -e bash -c "
		pwd && cd $repo_dir && pwd && make -f makefile.container unit
		echo 'Unit tests complete, press ENTER to close'
		read line
		" &
    flatpak run app.devsuite.Ptyxis -e bash -c "
		trap 'exit 0' EXIT
		pwd && cd $repo_dir && pwd && make -f makefile.container integration
		echo 'Integration tests complete, press ENTER to close'
		read line
		" &

	# Remove existing builds before building
	rm -rf $build_dir
    # Run the deb build in a new terminal and wait for it to complete
    flatpak run app.devsuite.Ptyxis -e bash -c "
		pwd && cd $repo_dir && pwd && make -f makefile.container deb
	" &

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
    flatpak run app.devsuite.Ptyxis -e bash -c "
		pwd && cd $test_dir && pwd && make -f makefile.container level1 DCSERVER=10.8.3.191
		echo 'level1 tests complete, press ENTER to close'
		read line
	" &
    flatpak run app.devsuite.Ptyxis -e bash -c "
		pwd && cd $test_dir && pwd && make -f makefile.container api DCSERVER=10.8.3.52
		echo 'api tests complete, press ENTER to close'
		read line
		" &
}

function test_unit() {
    local repo_dir="$HOME/gitrepos/mn-server/dcscommander"
    local test_dir="$HOME/gitrepos/mn-server/tests"
	local build_dir="$repo_dir/build"

	build_cmdr_venv

    # Open Ghostty terminals and run the make commands
    flatpak run app.devsuite.Ptyxis -e bash -c "pwd && cd $repo_dir && pwd && make -f makefile.container unit; echo 'Unit tests complete, press ENTER to close'; read line" &
}

function test_local() {
    local repo_dir="$HOME/gitrepos/mn-server/dcscommander"
    local test_dir="$HOME/gitrepos/mn-server/tests"
	local build_dir="$repo_dir/build"

	build_cmdr_venv

    # Open Ghostty terminals and run the make commands
    flatpak run app.devsuite.Ptyxis -e bash -c "pwd && cd $repo_dir && pwd && make -f makefile.container unit; echo 'Unit tests complete, press ENTER to close'; read line" &
    flatpak run app.devsuite.Ptyxis -e bash -c "pwd && cd $repo_dir && pwd && make -f makefile.container integration; echo 'Integration tests complete, press ENTER to close'; read line" &
}

function test_system() {
	local repo_dir="$HOME/gitrepos/mn-server/dcscommander"
    local test_dir="$HOME/gitrepos/mn-server/tests"
	local build_dir="$repo_dir/build"

	build_test_venv

	# Remove existing builds before building
	rm -rf $build_dir
    # Run the deb build in a new terminal and wait for it to complete
    flatpak run app.devsuite.Ptyxis -e bash -c "pwd && cd $repo_dir && pwd && make -f makefile.container deb" &

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
    flatpak run app.devsuite.Ptyxis -e bash -c "pwd && cd $test_dir && pwd && make -f makefile.container level1 DCSERVER=10.8.3.191; echo 'level1 tests complete, press ENTER to close'; read line" &
    flatpak run app.devsuite.Ptyxis -e bash -c "pwd && cd $test_dir && pwd && make -f makefile.container api DCSERVER=10.8.3.52; echo 'api tests complete, press ENTER to close'; read line" &
}

function patch_systems() {
	local repo_dir="$HOME/gitrepos/mn-server/dcscommander"
    local test_dir="$HOME/gitrepos/mn-server/tests"
	local build_dir="$repo_dir/build"

	build_test_venv

	# Remove existing builds before building
	rm -rf $build_dir
    # Run the deb build in a new terminal and wait for it to complete
    flatpak run app.devsuite.Ptyxis -e bash -c "pwd && cd $repo_dir && pwd && make -f makefile.container deb" &

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
    local test_dir="$HOME/gitrepos/mn-server/tests"
	local sys_venv_done="$test_dir/venv/dc_system_tests.installed"

	build_venv $test_dir $sys_venv_done
}

function build_cmdr_venv() {
	local cmdr_dir="$HOME/gitrepos/mn-server/dcscommander"
	local cmdr_venv_done="$cmdr_dir/venv/dcscommander.installed"

	build_venv $cmdr_dir $cmdr_venv_done
}

function build_venv() {
	local repo_dir="$HOME/gitrepos/mn-server/dcscommander"
	rm -rf $2

	add_api_key
	add_venv

    flatpak run app.devsuite.Ptyxis -e bash -c "
		pwd && cd $1 && pwd && make -f makefile.container venv
	" &

	echo "Waiting for venv build to complete..."
    while [[ ! -f "$2" ]]; do
		echo "Waiting for venv build to complete..."
        sleep 5
    done

	rm_api_key
	rm_venv
}

function build_all_venv() {
	local repo_dir="$HOME/gitrepos/mn-server/dcscommander"
    local test_dir="$HOME/gitrepos/mn-server/tests"
	local build_dir="$repo_dir/build"
	local cmdr_venv_done="$repo_dir/venv/dcscommander.installed"
	local sys_venv_done="$test_dir/venv/dc_system_tests.installed"
	rm -rf $cmdr_venv_done
	rm -rf $sys_venv_done

	add_api_key
	add_venv

    flatpak run app.devsuite.Ptyxis -e bash -c "
		trap 'exit 0' EXIT
		pwd && cd $repo_dir && pwd && make -f makefile.container venv
	" &

    flatpak run app.devsuite.Ptyxis -e bash -c "
		trap 'exit 0' EXIT
		pwd && cd $test_dir && pwd && make -f makefile.container venv
	" &

	echo "Waiting for venv builds to complete..."
    while [[ ! -f "$cmdr_venv_done" || ! -f "$sys_venv_done" ]]; do
		echo "Waiting for venv builds to complete..."
        sleep 5
    done

	rm_api_key
	rm_venv
}

function add_venv() {
	echo "Adding venv inner targets"
	local repo_make="$HOME/gitrepos/mn-server/dcscommander/makefile.container"
	local test_make="$HOME/gitrepos/mn-server/tests/makefile.container"

	if ! grep "^INNER_TARGETS" "$repo_make" | grep -q "venv"; then
		sed -i 's/^\(INNER_TARGETS.*$\)/\1 venv/' "$repo_make"
	fi

	if ! grep "^INNER_TARGETS" "$test_make" | grep -q "venv"; then
		sed -i 's/^\(INNER_TARGETS.*$\)/\1 venv/' "$test_make"
	fi
}

function rm_venv() {
	echo "Removing venv inner targets"
	local repo_make="$HOME/gitrepos/mn-server/dcscommander/makefile.container"
	local test_make="$HOME/gitrepos/mn-server/tests/makefile.container"

	if grep "^INNER_TARGETS" "$repo_make" | grep -q "venv"; then
		sed -i 's/^\(INNER_TARGETS.*\) venv$/\1/' "$repo_make"
	fi

	if grep "^INNER_TARGETS" "$test_make" | grep -q "venv"; then
		sed -i 's/^\(INNER_TARGETS.*\) venv$/\1/' "$test_make"
	fi
}

function add_api_key() {
	local fixtures="$HOME/gitrepos/mn-server/tests/dctools/src/dctools/fixtures/storage.py"
	local new_key=$(cat $HOME/env/.dcs_env)

	sed -i "s/client_secret=\"\(.*\)\",/client_secret=\"$new_key\",#\1/" "$fixtures"
}

function rm_api_key() {
	local fixtures="$HOME/gitrepos/mn-server/tests/dctools/src/dctools/fixtures/storage.py"

	sed -i "s/client_secret=\".*\",#\(.*\)$/client_secret=\"\1\",/" "$fixtures"
}

up() {
	declare -i d=${@:-1}
	(( $d < 0 )) && (>&2 echo "up: Error: negative value provided") && return 1;
	cd "$(pwd | sed -E 's;(/[^/]*){0,'$d'}$;;')/";
}

purge_repo_cache() {
	original_path="$(pwd)"
	cd "$(git rev-parse --show-toplevel)"
	git clean -dfx
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
alias cargo='cargo-1.82'
alias tokei='tokei --sort code'
alias futurize-imports="python3 $HOME/pyscripts/futurize_imports.py"
