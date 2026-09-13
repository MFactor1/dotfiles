#!/usr/bin/env bash
set -euo pipefail

STATE_FILE="/tmp/ddcutil_dimmed"

if [ -f $STATE_FILE ]; then
	~/.config/scripts/ddcutil_restore.sh
else
	~/.config/scripts/ddcutil_dim.sh 25
fi
