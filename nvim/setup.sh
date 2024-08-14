if [ ! -d "/home/$USER/.config/nvim" ]; then
	mkdir /home/$USER/.config/nvim
fi

if [ ! -f '"${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim' ]; then
	sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'	
fi

if [ -d "/home/$USER/.config/nvim/coc-settings.json" ]; then
	echo "Removing existing .config/nvim/coc-settings.json"
	rm -r /home/$USER/.config/nvim/coc-settings.json
fi

if [ -d "/home/$USER/.config/nvim/init.lua" ]; then
	echo "Removing existing .config/nvim/init.lua"
	rm -r /home/$USER/.config/nvim/init.lua
fi

echo "Symlinking coc-settings.json"
cp ./coc-settings.json /home/$USER/.config/nvim/coc-settings.json

echo "Symlinking init.lua"
cp ./init.lua /home/$USER/.config/nvim/init.lua

nvim -c ":PlugInstall"
