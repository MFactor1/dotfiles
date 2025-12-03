#!/bin/bash

connected=$(bluetoothctl devices Connected)
paired=$(bluetoothctl devices Paired)
if [[ -n "$connected" ]]; then
    paired=$(echo "$paired" | grep -v -F "$connected")
else
    paired="$paired"
fi

if [[ -n "$connected" ]]; then
	connected_names=$(echo "$connected" | awk '{$1=$2=""; print $0}' | sed 's/^ *//' | sed 's/ *$//' | sed 's/^/-> /')
else
	connected_names="No connected devices to disconnect"
fi

if [[ -n "$paired" ]]; then
	paired_names=$(echo "$paired" | awk '{$1=$2=""; print $0}' | sed 's/^ *//' | sed 's/ *$//' | sed 's/^/-> /')
else
	paired_names="No Paired devices to connect"
fi

menu_text="-- Connected --
$connected_names
-- Paired --
$paired_names"
selected_name=$(echo "$menu_text" | rofi -dmenu -p "Connect/Disconnect BT devices")

selected_name=$(echo "$selected_name" | sed 's/-> *//' | sed 's/ *$//')

selected_mac_connected=$(echo "$connected" | grep "$selected_name" | awk '{print $2}')
selected_mac_paired=$(echo "$paired" | grep "$selected_name" | awk '{print $2}')

if [[ -n "$selected_mac_connected" ]]; then
	bluetoothctl disconnect $selected_mac_connected
elif [[ -n "$selected_mac_paired" ]]; then
	bluetoothctl connect $selected_mac_paired
fi
