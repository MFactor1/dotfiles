if [ ! -f "/home/$USER/.vim/autoload/plug.vim" ]
	curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
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
ln -s ./coc-settings.json /home/$USER/.config/nvim/coc-settings.json

echo "Symlinking init.lua"
ln -s ./init.lua home/$USER/.config/nvim/init.lua

nvim -c ":PlugInstall"
