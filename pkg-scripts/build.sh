#!/bin/sh

ELECTRON="2.0.8"
MAC_ID="com.gmail.junehanabi.pokered-save-editor"
MAC_CATEGORY="public.app-category.utilities"

DIR_BUILD="./build"
DIR_BUILD_APP="$DIR_BUILD/app"
DIR_BUILD_APP_ICON="$DIR_BUILD_APP/icon"
DIR_BUILD_OUT="$DIR_BUILD/package"

ICON_PREFIX="icon"
ICON_PNG="./dist/pokered-save-editor/assets/icons/png/256x256.png"
ICON_ICNS="./dist/pokered-save-editor/assets/icons/icns/all.icns"
ICON_ICO="./dist/pokered-save-editor/assets/icons/ico/all.ico"

# Create build folder if doesn't exist
# All build artifacts will go here
if [ ! -d "$DIR_BUILD" ]; then
    mkdir "$DIR_BUILD"
fi

# Create app folder if doesn't exist
# Everything in this folder will be directly packaged into the app
if [ ! -d "$DIR_BUILD_APP" ]; then
    mkdir "$DIR_BUILD_APP"

    # Link app files into it
    ln -s ../../main.js ../../dist ../../LICENSE ../../README.md ../../CODE_OF_CONDUCT.md ../../package.json ../../package-lock.json "$DIR_BUILD_APP"
fi

# Create icon folder if it doesn't exist
# Only 3 icons files need to go in here, a png, icns, and ico file
# They all need to have the same name and will be automatically selected based
# on platform
# They are intentionally hard-linked since it throws errors otherwise
if [ ! -d "$DIR_BUILD_APP_ICON" ]; then
    mkdir "$DIR_BUILD_APP_ICON"

    ln "$ICON_PNG" "$DIR_BUILD_APP_ICON/$ICON_PREFIX.png"
    ln "$ICON_ICNS" "$DIR_BUILD_APP_ICON/$ICON_PREFIX.icns"
    ln "$ICON_ICO" "$DIR_BUILD_APP_ICON/$ICON_PREFIX.ico"
fi

# Package it
npx electron-packager \
    "$DIR_BUILD_APP" \
    --app-copyright="$DIR_BUILD_APP/LICENSE" \
    --electron-version="$ELECTRON" \
    --icon="$DIR_BUILD_APP_ICON/$ICON_PREFIX" \
    --ignore="/ng-cli-pug-loader" \
    --out="$DIR_BUILD_OUT" \
    --overwrite \
    --app-bundle-id="$MAC_ID" \
    --app-category-type="$MAC_CATEGORY"
