#!/bin/bash
cd /home/kavia/workspace/code-generation/web-snake-interactive-82003-82021/snake_game_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

