#!/usr/bin/bash
if [ -f "../../.zshrc" ]; then
    echo "Removing existing .zshrc"
    rm ../../.zshrc
fi

if [ ! -d "../../.config" ]; then
    echo "No existing .config folder, creating one"
    mkdir ../../.config
fi

if [ -f "../../.config/starship.toml" ]; then
    echo "Removing existing .config/starship.toml"
    rm ../../.config/starship.toml
fi

if [ -f "../../.bashrc" ]; then
    echo "Removing existing .bashrc"
    rm ../../.bashrc
fi

if [ -d "../../.config/warp-terminal" ]; then
    echo "Removing existing .config/warp-terminal"
    rm -r ../../.config/warp-terminal
fi

if [ -d "../../.themes" ]; then
    echo "Removing existing .themes"
    rm -r ../../.themes
fi

if [ -d "../../.vscode" ]; then
    echo "Removing existing .vscode"
    rm -r ../../.vscode
fi

if [ -d "../../.icons" ]; then
	echo "Removing existing .icons"
	rm -r ../../.icons
fi

if [ -d "../../Pictures/wallpapers" ]; then
	echo "Removing existing wallpapers folder"
	rm -r ../../Pictures/wallpapers
fi

if [ -d "../../.spicetify/Themes" ]; then
	echo "Removing existing .spicetify/Themes folder"
	rm -r ../../.spicetify/Themes
fi

if [ ! -d "../../.spicetify" ]; then
	echo "No existing .spicetify folder. Please install Spicetify if you would like to Symlink Spicetify themes: https://spicetify.app/docs/advanced-usage/installation"
fi

echo "Symlinking .zshrc"
ln -s gitrepos/dotfiles/.zshrc ../../.zshrc

echo "Symlinking .config/starship.toml"
ln -s ../gitrepos/dotfiles/starship.toml ../../.config/starship.toml

echo "Symlinking .bashrc"
ln -s gitrepos/dotfiles/.bashrc ../../.bashrc

echo "Symlinking .config/warp-terminal"
ln -s ../gitrepos/dotfiles/warp-terminal ../../.config/warp-terminal

echo "Symlinking .themes"
ln -s gitrepos/dotfiles/.themes ../../.themes

echo "Symlinking .vscode"
ln -s gitrepos/dotfiles/.vscode ../../.vscode

echo "Symlinking .icons"
ln -s gitrepos/dotfiles/.icons ../../.icons

echo "Symlinking wallpapers"
ln -s ../gitrepos/dotfiles/wallpapers ../../Pictures/wallpapers

if [ -d "../../.spicetify" ]; then
	echo "Symlinking .spicetify/Themes"
	ln -s ../gitrepos/dotfiles/Themes ../../.spicetify/Themes
fi

echo "Applying workaround"
flatpak --user override --filesystem=/home/$USER/.icons/:ro
flatpak --user override --filesystem=/usr/share/icons/:ro
