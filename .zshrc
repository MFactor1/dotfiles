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

    echo "Starting build processes..."

    # Open three Ghostty terminals and run the make commands
    ghostty -e bash -c "pwd && cd $repo_dir && pwd && make -f makefile.container unit; echo 'Unit tests complete, press ENTER to close'; read line" &
    ghostty -e bash -c "pwd && cd $repo_dir && pwd && make -f makefile.container integration; echo 'Integration tests complete, press ENTER to close'; read line" &

	# Remove existing builds before building
	rm -rf $build_dir
    # Run the deb build in a new terminal and wait for it to complete
    ghostty -e bash -c "pwd && cd $repo_dir && pwd && make -f makefile.container deb" &

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
    ghostty -e bash -c "pwd && cd $test_dir && pwd && make -f makefile.container level1 DCSERVER=10.8.3.191; echo 'level1 tests complete, press ENTER to close'; read line" &
    ghostty -e bash -c "pwd && cd $test_dir && pwd && make -f makefile.container api DCSERVER=10.8.3.52; echo 'api tests complete, press ENTER to close'; read line" &
}

function test_local() {
    local repo_dir="$HOME/gitrepos/mn-server/dcscommander"
    local test_dir="$HOME/gitrepos/mn-server/tests"
	local build_dir="$repo_dir/build"

    echo "Starting build processes..."

    # Open three Ghostty terminals and run the make commands
    ghostty -e bash -c "pwd && cd $repo_dir && pwd && make -f makefile.container unit; echo 'Unit tests complete, press ENTER to close'; read line" &
    ghostty -e bash -c "pwd && cd $repo_dir && pwd && make -f makefile.container integration; echo 'Integration tests complete, press ENTER to close'; read line" &
}

function test_system() {
    local repo_dir="$HOME/gitrepos/mn-server/dcscommander"
    local test_dir="$HOME/gitrepos/mn-server/tests"
	local build_dir="$repo_dir/build"
	# Remove existing builds before building
	rm -rf $build_dir
    # Run the deb build in a new terminal and wait for it to complete
    ghostty -e bash -c "pwd && cd $repo_dir && pwd && make -f makefile.container deb" &

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
    ghostty -e bash -c "pwd && cd $test_dir && pwd && make -f makefile.container level1 DCSERVER=10.8.3.191; echo 'level1 tests complete, press ENTER to close'; read line" &
    ghostty -e bash -c "pwd && cd $test_dir && pwd && make -f makefile.container api DCSERVER=10.8.3.52; echo 'api tests complete, press ENTER to close'; read line" &
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

alias purge-repo='purge_repo_cache'
alias cp='cp -r'
alias purge-docker='docker system prune -a --volumes'
alias docker-kill='docker kill $(docker ps -a -q)'
alias purge-bak='rm ./**/*.py.bak'
alias container='make -f makefile.container TERM=xterm-256color'
alias reset-vpn='sudo systemctl restart wg-quick@oracle-dev wg-quick@wg0'
alias ping-vpn='ping -w 3 10.0.0.1 && ping -w 3 10.0.5.1'
alias test-full='test_full'
alias test-system='test_system'
alias test-local='test_local'
