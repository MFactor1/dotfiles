#!/usr/bin/env bash
USER=`whoami`
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if command -v nvim >/dev/null 2>&1; then
	NVIM=nvim
elif command -v flatpak run io.neovim.nvim >/dev/null 2>&1; then
	NVIM="flatpak run io.neovim.nvim"
else
	echo "nvim not detected! It needs to be installed"
	exit 1
fi

VERSION="$($NVIM --clean -u NONE -v | head -n 1 | sed 's/NVIM\ v//')"
VERSION_INT=$(echo $VERSION | sed 's/\.//g' | sed 's/^0*//')

echo "Detected nvim command: $NVIM"
echo "Detected nvim version: $VERSION"

if [ "$VERSION_INT" -lt 110 ]; then
	echo "nvim version must be > 0.11.0"
	exit 1
fi

CNF_DIR="$($NVIM --headless --clean -u NONE +'lua print(vim.fn.stdpath("config"))' +q 2>&1 | head -n 1 | xargs)"
DATA_DIR="$($NVIM --headless --clean -u NONE +'lua print(vim.fn.stdpath("data"))' +q 2>&1 | head -n 1 | xargs)"

echo "Detected config dir: $CNF_DIR"
echo "Detected data dir: $DATA_DIR"

read -p "Do these look correct/ok? [y/n]: " cont

if [ ! "$cont" = "y" ] && [ ! "$cont" = "Y" ]; then
	echo "Script aborted by user"
	exit 1
fi

if [ ! -d $CNF_DIR ]; then
	echo "No existing nvim config, creating one"
	mkdir $CNF_DIR
fi

if [ ! -f "$DATA_DIR/site/autoload/plug.vim" ]; then
	echo "No exitsting Plug.nvim install found, installing it"
	sh -c "curl -fLo $DATA_DIR/site/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim"
fi

if [ ! -e "$CNF_DIR/lua" ]; then
    echo "No existing nvim/lua folder, creating one"
    mkdir $CNF_DIR/lua
fi

if [ -d "$CNF_DIR/coc-settings.json" ]; then
	echo "Removing existing .config/nvim/coc-settings.json"
	rm -r $CNF_DIR/coc-settings.json
fi

if [ -d "$CNF_DIR/init.lua" ]; then
	echo "Removing existing .config/nvim/init.lua"
	rm -r $CNF_DIR/init.lua
fi

if [ -d "$CNF_DIR/lua/selected-theme.lua" ]; then
	echo "Removing existing .config/nvim/lua/selected-theme.lua"
	rm -r $CNF_DIR/lua/selected-theme.lua
fi

echo "Copying coc-settings.json"
cp $SCRIPT_DIR/coc-settings.json $CNF_DIR/coc-settings.json

echo "Copying init.lua"
cp $SCRIPT_DIR/init.lua $CNF_DIR/init.lua

read -p "Rose Pine or Catppuccin for nvim? [r/c]: " ans

if [ "$ans" = "r" ]; then
	echo "Applying Rose Pine theme"
	cp $SCRIPT_DIR/rosepine.lua $CNF_DIR/lua/selected-theme.lua
fi

if [ "$ans" = "c" ]; then
	echo "Applying Catppuccin theme"
	cp $SCRIPT_DIR/catppuccin.lua $CNF_DIR/lua/selected-theme.lua
fi

if [ ! -d "/usr/local/lib/node_modules/sql-language-server" ]; then
	echo "SQL lsp not found"
	if command -v npm >/dev/null 2>&1; then
		echo "Installing SQL lsp"
		sudo npm i -g sql-language-server
	else
		echo "npm in not installed, skipping SQL lsp"
	fi
fi

$NVIM -c ":PlugInstall" -c ":PlugUpdate"
