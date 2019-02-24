#!/bin/sh

# Eradicates a file completely from git
# ./git-sensitive-remove.sh <name of file>

git filter-branch --tree-filter "rm -rf '$1'" --prune-empty HEAD
git for-each-ref --format="%(refname)" refs/original/ | xargs -n 1 git update-ref -d
git gc
