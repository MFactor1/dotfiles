#!/bin/bash

rofi -dmenu -p "Loading Networks..." -fixed-num-lines 1 &
loading_pid=$!

networks=$(nmcli -t -f SSID device wifi list | grep -v '^$' | sort -u)

kill $loading_pid 2>/dev/null

selected_ssid=$(echo "$networks" | rofi -dmenu -p "Select WiFi Network: ")

if [ -z "$selected_ssid" ] || [ "$selected_ssid" = "Loading Networks..." ]; then
    exit 0
fi

# Try to connect - nmcli will use saved credentials if available
connection_result=$(nmcli device wifi connect "$selected_ssid" 2>&1)

if [ ! $? -eq 0 ]; then
    # Check if it failed due to missing password
    if echo "$connection_result" | grep -q "Secrets were required"; then
        # Ask for password
        password=$(rofi -dmenu -password -p "Password for $selected_ssid: ")
        if [ -n "$password" ]; then
            if ! nmcli device wifi connect "$selected_ssid" password "$password"; then
                hyprctl notify 3 5000 0 "Failed to connect - check password"
            fi
        else
            hyprctl notify 3 5000 0 "No password provided"
        fi
    else
        hyprctl notify 3 5000 0 "Failed to connect: $connection_result"
    fi
fi
