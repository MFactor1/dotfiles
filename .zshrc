# Lines configured by zsh-newuser-install
HISTFILE=~/.histfile
HISTSIZE=1000
SAVEHIST=1000
# End of lines configured by zsh-newuser-install
eval "$(starship init zsh)"

export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-21.0.4.0.7-2.fc40.x86_64

export PATH=$PATH:/home/$USER/.spicetify
export PATH=$PATH:/home/$USER/bin

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

