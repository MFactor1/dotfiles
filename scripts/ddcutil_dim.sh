#!/usr/bin/env bash
set -euo pipefail

STATE_DIR="/tmp/ddcutil_state"
DIMMED_FILE="/tmp/ddcutil_dimmed"
mkdir -p "$STATE_DIR"

# Detect displays
DISPLAYS=$(ddcutil detect | grep "Display [0-9]" | awk '{print $2}')

for D in $DISPLAYS; do
    # Save brightness (VCP 10)
    #ddcutil --display "$D" dump "$STATE_DIR/brightness_$D"
	ddcutil --display "$D" getvcp 10 --terse | awk '{print $4}' > "$STATE_DIR/brightness_$D"

    ddcutil --display "$D" setvcp 10 $@
done

touch $DIMMED_FILE
