#!/usr/bin/bash
USER=`whoami`
if [ -e "../../.zshrc" ]; then
    echo "Removing existing ~/.zshrc"
    rm /home/$USER/.zshrc
fi

if [ ! -e "../../.config" ]; then
    echo "No existing ~/.config folder, creating one"
    mkdir /home/$USER/.config
fi

if [ -e "../../.config/starship.toml" ]; then
    echo "Removing existing ~/.config/starship.toml"
    rm /home/$USER/.config/starship.toml
fi

if [ -e "../../.bashrc" ]; then
    echo "Removing existing ~/.bashrc"
    rm /home/$USER/.bashrc
fi

if [ -e "../../.config/warp-terminal" ]; then
    echo "Removing existing ~/.config/warp-terminal"
    rm -r /home/$USER/.config/warp-terminal
fi

if [ -e "../../.themes" ]; then
    echo "Removing existing ~/.themes"
    rm -r /home/$USER/.themes
fi

#if [ -d "../../.vscode" ]; then
#    echo "Removing existing .vscode"
#    rm -r /home/$USER/.vscode
#fi

if [ -e "/home/$USER/.local/share/icons" ]; then
	echo "Removing existing ~/.local/share/icons"
	rm -r /home/$USER/.local/share/icons
fi

if [ -e "../../Pictures/wallpapers" ]; then
	echo "Removing existing wallpapers folder"
	rm -r /home/$USER/Pictures/wallpapers
fi

if [ -e "../../.spicetify/Themes" ]; then
	echo "Removing existing ~/.config/spicetify/Themes folder"
	rm -r /home/$USER/.config/spicetify/Themes
fi

if [ ! -d "../../.spicetify" ]; then
	echo "No existing ~/.spicetify folder. Please install Spicetify if you would like to Symlink Spicetify themes: https://spicetify.app/docs/advanced-usage/installation"
fi

if [ -e "/home/$USER/.config/gtk-4.0" ]; then
	echo "Removing existing ~/.config/gtk-4.0 folder"
	rm -r /home/$USER/.config/gtk-4.0
fi

if [ -e "/home/$USER/.config/ghostty/config" ]; then
	echo "Removing existing ~/.config/ghostty/config file"
	rm -r /home/$USER/.config/ghostty/config
fi

if [ -e "/home/$USER/.config/hypr" ]; then
	echo "Removing existing ~/.config/hypr dir"
	rm -r /home/$USER/.config/hypr
fi

if [ -e "/home/$USER/.config/rofi" ]; then
	echo "Removing existing ~/.config/rofi dir"
	rm -r /home/$USER/.config/rofi
fi

if [ -e "/home/$USER/.config/waybar" ]; then
	echo "Removing existing ~/.config/waybar dir"
	rm -r /home/$USER/.config/waybar
fi

echo "Symlinking .config/hypr"
ln -s ../gitrepos/dotfiles/hypr /home/$USER/.config/hypr

echo "Symlinking .config/rofi"
ln -s ../gitrepos/dotfiles/rofi /home/$USER/.config/rofi

echo "Symlinking .config/waybar"
ln -s ../gitrepos/dotfiles/waybar /home/$USER/.config/waybar

hyprctl reload

echo "Symlinking ~/.zshrc"
ln -s gitrepos/dotfiles/.zshrc /home/$USER/.zshrc

echo "Symlinking ~/.bashrc"
ln -s gitrepos/dotfiles/.bashrc /home/$USER/.bashrc

echo "Symlinking ~/.config/warp-terminal"
ln -s ../gitrepos/dotfiles/warp-terminal /home/$USER/.config/warp-terminal

echo "Symlinking ~/.themes"
ln -s gitrepos/dotfiles/.themes /home/$USER/.themes

#echo "Symlinking .vscode"
#ln -s gitrepos/dotfiles/.vscode /home/$USER/.vscode

echo "Symlinking ~/.local/share/icons"
ln -s ../../gitrepos/dotfiles/icons /home/$USER/.local/share/icons

echo "Symlinking wallpapers"
ln -s ../gitrepos/dotfiles/wallpapers /home/$USER/Pictures/wallpapers

if [ -d "../../.config/spicetify" ]; then
	echo "Symlinking ~/.config/spicetify/Themes"
	ln -s ../../gitrepos/dotfiles/Themes /home/$USER/.config/spicetify/Themes
fi

if [ -d "/home/$USER/.config/vesktop" ]; then
	echo "Removing existing ~/.config/vesktop/themes"
	rm -rf "/home/$USER/.config/vesktop/themes"
	echo "Symlinking ~/.config/vesktop/themes"
	ln -s ../../gitrepos/dotfiles/vesktop_themes /home/$USER/.config/vesktop/themes
fi


read -p "Rose Pine (broken) or Catppuccin for GTK 4? [r/c]: " ans

if [ "$ans" = "r" ]; then
	echo "Applying GTK 4 Rose Pine theme"
	ln -s ../gitrepos/dotfiles/gtk-4.0-rosepine /home/$USER/.config/gtk-4.0
fi

if [ "$ans" = "c" ]; then
	echo "Applying GTK 4 Catppuccin theme"
	ln -s ../gitrepos/dotfiles/gtk-4.0-catppuccin /home/$USER/.config/gtk-4.0
fi

if [ -d "/home/$USER/.config/ghostty" ]; then
	read -p "Rose Pine or Catppuccin for ghostty? [r/c]: " ans

	if [ "$ans" = "r" ]; then
		echo "Symlinking ~/.config/ghostty/config"
		ln -s ../../gitrepos/dotfiles/ghostty/rosepine /home/$USER/.config/ghostty/config
	fi

	if [ "$ans" = "c" ]; then
		echo "Symlinking ~/.config/ghostty/config"
		ln -s ../../gitrepos/dotfiles/ghostty/catppuccin /home/$USER/.config/ghostty/config
	fi
fi

read -p "Rose Pine or Catppuccin for Starship? [r/c]: " ans

if [ "$ans" = "r" ]; then
	echo "Symlinking ~/.config/starship.toml to ./starship/rosepine.toml"
	ln -s ../gitrepos/dotfiles/starship/rosepine.toml /home/$USER/.config/starship.toml
fi

if [ "$ans" = "c" ]; then
	echo "Symlinking ~/.config/starship.toml to ./starship/catppuccin.toml"
	ln -s ../gitrepos/dotfiles/starship/catppuccin.toml /home/$USER/.config/starship.toml
fi

read -p "Would you like to apply flatpak custom cursor workaround?[y/n]: " ans

if [ "$ans" = "y" ]; then
	echo "Applying workaround"
	flatpak --user override --filesystem=/home/$USER/.icons/:ro
	flatpak --user override --filesystem=/usr/share/icons/:ro
fi

read -p "Would you like to apply flatpak Spotify permissions for Spicetify?[y/n]: " ans

if [ "$ans" = "y" ]; then
	echo "Applying permissions"
	sudo chmod a+wr /var/lib/flatpak/app/com.spotify.Client/x86_64/stable/active/files/extra/share/spotify
	sudo chmod a+wr -R /var/lib/flatpak/app/com.spotify.Client/x86_64/stable/active/files/extra/share/spotify/Apps
fi
