# .bashrc

# Source global definitions
if [ -f /etc/bashrc ]; then
    . /etc/bashrc
fi

# User specific environment
if ! [[ "$PATH" =~ "$HOME/.local/bin:$HOME/bin:" ]]; then
    PATH="$HOME/.local/bin:$HOME/bin:$PATH"
fi
export PATH

# Uncomment the following line if you don't like systemctl's auto-paging feature:
# export SYSTEMD_PAGER=

# User specific aliases and functions
if [ -d ~/.bashrc.d ]; then
    for rc in ~/.bashrc.d/*; do
        if [ -f "$rc" ]; then
            . "$rc"
        fi
    done
fi
unset rc

export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-21.0.2.0.13-1.fc39.x86_64

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
alias purge-repo='purge_repo_cache'

