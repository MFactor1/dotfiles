#!/usr/bin/bash
if [ -f "../../.zshrc" ]; then
    echo "Removing existing .zshrc"
    rm /home/$USER/.zshrc
fi

if [ ! -d "../../.config" ]; then
    echo "No existing .config folder, creating one"
    mkdir /home/$USER/.config
fi

if [ -f "../../.config/starship.toml" ]; then
    echo "Removing existing .config/starship.toml"
    rm /home/$USER/.config/starship.toml
fi

if [ -f "../../.bashrc" ]; then
    echo "Removing existing .bashrc"
    rm /home/$USER/.bashrc
fi

if [ -d "../../.config/warp-terminal" ]; then
    echo "Removing existing .config/warp-terminal"
    rm -r /home/$USER/.config/warp-terminal
fi

if [ -d "../../.themes" ]; then
    echo "Removing existing .themes"
    rm -r /home/$USER/.themes
fi

#if [ -d "../../.vscode" ]; then
#    echo "Removing existing .vscode"
#    rm -r /home/$USER/.vscode
#fi

if [ -d "/home/$USER/.local/share/icons" ]; then
	echo "Removing existing .local/share/icons"
	rm -r /home/$USER/.local/share/icons
fi

if [ -d "../../Pictures/wallpapers" ]; then
	echo "Removing existing wallpapers folder"
	rm -r /home/$USER/Pictures/wallpapers
fi

if [ -d "../../.spicetify/Themes" ]; then
	echo "Removing existing .spicetify/Themes folder"
	rm -r /home/$USER/.spicetify/Themes
fi

if [ ! -d "../../.spicetify" ]; then
	echo "No existing .spicetify folder. Please install Spicetify if you would like to Symlink Spicetify themes: https://spicetify.app/docs/advanced-usage/installation"
fi

if [ -d "../../.config/gtk-4.0" ]; then
	echo "Removing existing .config/gtk-4.0 folder"
	rm -r /home/$USER/.config/gtk-4.0
fi

echo "Symlinking .zshrc"
ln -s gitrepos/dotfiles/.zshrc /home/$USER/.zshrc

echo "Symlinking .config/starship.toml"
ln -s ../gitrepos/dotfiles/starship.toml /home/$USER/.config/starship.toml

echo "Symlinking .bashrc"
ln -s gitrepos/dotfiles/.bashrc /home/$USER/.bashrc

echo "Symlinking .config/warp-terminal"
ln -s ../gitrepos/dotfiles/warp-terminal /home/$USER/.config/warp-terminal

echo "Symlinking .themes"
ln -s gitrepos/dotfiles/.themes /home/$USER/.themes

#echo "Symlinking .vscode"
#ln -s gitrepos/dotfiles/.vscode /home/$USER/.vscode

echo "Symlinking .local/share/icons"
ln -s ../../gitrepos/dotfiles/icons /home/$USER/.local/share/icons

echo "Symlinking wallpapers"
ln -s ../gitrepos/dotfiles/wallpapers /home/$USER/Pictures/wallpapers

echo "Symlinking .config/gtk-4.0"
ln -s ../gitrepos/dotfiles/gtk-4.0 /home/$USER/.config/gtk-4.0

if [ -d "../../.spicetify" ]; then
	echo "Symlinking .spicetify/Themes"
	ln -s ../gitrepos/dotfiles/Themes /home/$USER/.spicetify/Themes
fi

read -p "Would you like to apply flatpak custom cursor workaround?[y/n]: " ans

if [ "$ans" = "y" ]; then
	echo "Applying workaround"
	flatpak --user override --filesystem=/home/$USER/.icons/:ro
	flatpak --user override --filesystem=/usr/share/icons/:ro
fi
