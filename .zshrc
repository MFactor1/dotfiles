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

autoload -Uz compinit && compinit

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
alias cp='cp -r'
alias scp='scp -r'
alias ls='eza --all'
alias tree='eza --tree --all --git-ignore'
alias ll='eza --all --long --total-size'
alias cd='z'
alias tokei='tokei --sort code'
