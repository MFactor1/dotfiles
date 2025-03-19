USER=`whoami`

if [ ! -d "/home/$USER/.config/nvim" ]; then
	echo "No existing nvim config, creating one"
	mkdir /home/$USER/.config/nvim
fi

if [ ! -f '/home/$USER/.local/share/nvim/site/autoload/plug.vim' ]; then
	echo "No exitsting Plug.nvim install found, installing it"
	sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'	
fi

if [ ! -e "/home/$USER/.config/nvim/lua" ]; then
    echo "No existing nvim/lua folder, creating one"
    mkdir /home/$USER/.config/nvim/lua
fi

if [ -d "/home/$USER/.config/nvim/coc-settings.json" ]; then
	echo "Removing existing .config/nvim/coc-settings.json"
	rm -r /home/$USER/.config/nvim/coc-settings.json
fi

if [ -d "/home/$USER/.config/nvim/init.lua" ]; then
	echo "Removing existing .config/nvim/init.lua"
	rm -r /home/$USER/.config/nvim/init.lua
fi

if [ -d "/home/$USER/.config/nvim/lua/selected-theme.lua" ]; then
	echo "Removing existing .config/nvim/lua/selected-theme.lua"
	rm -r /home/$USER/.config/nvim/lua/selected-theme.lua
fi

echo "Copying coc-settings.json"
cp ./coc-settings.json /home/$USER/.config/nvim/coc-settings.json

echo "Copying init.lua"
cp ./init.lua /home/$USER/.config/nvim/init.lua

read -p "Rose Pine or Catppuccin for nvim? [r/c]: " ans

if [ "$ans" = "r" ]; then
	echo "Applying Rose Pine theme"
	cp ./rosepine.lua /home/$USER/.config/nvim/lua/selected-theme.lua
fi

if [ "$ans" = "c" ]; then
	echo "Applying Catppuccin theme"
	cp ./catppuccin.lua /home/$USER/.config/nvim/lua/selected-theme.lua
fi

echo "Checking for SQL lsp"
if [ ! -d "/usr/local/lib/node_modules/sql-language-server" ]; then
	echo "SQL lsp not found"
	echo "Installing SQL lsp"
	sudo npm i -g sql-language-server
fi

nvim -c ":PlugInstall" -c ":PlugUpdate"
