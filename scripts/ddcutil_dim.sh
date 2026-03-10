#!/usr/bin/env bash
set -euo pipefail

STATE_DIR="/tmp/ddcutil_state"
mkdir -p "$STATE_DIR"

# Detect displays
DISPLAYS=$(ddcutil detect | grep "Display [0-9]" | awk '{print $2}')

for D in $DISPLAYS; do
    # Save brightness (VCP 10)
    #ddcutil --display "$D" dump "$STATE_DIR/brightness_$D"
	ddcutil --display "$D" getvcp 10 --terse | awk '{print $4}' > "$STATE_DIR/brightness_$D"

    # Set brightness to 1 (not 0 for OLED safety)
    ddcutil --display "$D" setvcp 10 1
done

