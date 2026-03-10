#!/usr/bin/env bash
set -euo pipefail

STATE_DIR="/tmp/ddcutil_state"

DISPLAYS=$(ddcutil detect | grep "Display [0-9]" | awk '{print $2}')

for D in $DISPLAYS; do
    if [[ -f "$STATE_DIR/brightness_$D" ]]; then
        #ddcutil --display "$D" load "$STATE_DIR/brightness_$D"
		VAL=$(cat "$STATE_DIR/brightness_$D")
        ddcutil --display "$D" setvcp 10 "$VAL"
    fi
done

