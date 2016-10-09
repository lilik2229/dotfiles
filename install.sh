#!/bin/bash

for f in .??*
do
  [ "$f" = ".git" ] && continue
  # echo "$f" "$HOME"/"$f"
  # rm -r "$HOME"/"$f"
  ln -snfv "$PWD"/"$f" "$HOME"/"$f"
done
