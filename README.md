# Pokered Save Editor

[![Travis (.org)](https://img.shields.io/travis/junebug12851/pokered-save-editor.svg?style=flat-square&label=full%20ci&logo=travis)](https://travis-ci.org/junebug12851/pokered-save-editor)
[![Scrutinizer Build](https://img.shields.io/scrutinizer/build/g/junebug12851/pokered-save-editor.svg?style=flat-square&label=simple%20ci&logo=scrutinizer)](https://scrutinizer-ci.com/g/junebug12851/pokered-save-editor)
[![Scrutinizer](https://img.shields.io/scrutinizer/g/junebug12851/pokered-save-editor.svg?style=flat-square&logo=scrutinizer)](https://scrutinizer-ci.com/g/junebug12851/pokered-save-editor)
[![LGTM Grade](https://img.shields.io/lgtm/grade/javascript/g/junebug12851/pokered-save-editor.svg?style=flat-square&label=code%20quality&logo=lgtm)](https://lgtm.com/projects/g/junebug12851/pokered-save-editor/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c0922f3f615b4ef69e480d2e9d930837)](https://www.codacy.com/app/junebug12851/pokered-save-editor?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=junebug12851/pokered-save-editor&amp;utm_campaign=Badge_Grade)
[![Code Climate](https://img.shields.io/codeclimate/maintainability/junebug12851/pokered-save-editor.svg?style=flat-square)](https://codeclimate.com/github/junebug12851/pokered-save-editor)
[![Code Climate](https://img.shields.io/codeclimate/maintainability-percentage/junebug12851/pokered-save-editor.svg?style=flat-square)](https://codeclimate.com/github/junebug12851/pokered-save-editor)
[![Code Climate](https://img.shields.io/codeclimate/tech-debt/junebug12851/pokered-save-editor.svg?style=flat-square)](https://codeclimate.com/github/junebug12851/pokered-save-editor)
[![Depfu](https://img.shields.io/depfu/junebug12851/pokered-save-editor.svg?style=flat-square)](https://github.com/junebug12851/pokered-save-editor)
[![GitHub issues](https://img.shields.io/github/issues/junebug12851/pokered-save-editor.svg?style=flat-square)](https://github.com/junebug12851/pokered-save-editor)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/junebug12851/pokered-save-editor.svg?style=flat-square)](https://github.com/junebug12851/pokered-save-editor)
[![GitHub last commit](https://img.shields.io/github/last-commit/junebug12851/pokered-save-editor.svg?style=flat-square)](https://github.com/junebug12851/pokered-save-editor)
[![GitHub](https://img.shields.io/github/license/junebug12851/pokered-save-editor.svg?style=flat-square&colorB=blue)](https://github.com/junebug12851/pokered-save-editor)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/junebug12851/pokered-save-editor.svg?style=flat-square)](https://github.com/junebug12851/pokered-save-editor)
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/junebug12851/pokered-save-editor.svg?style=flat-square)](https://github.com/junebug12851/pokered-save-editor)
[![GitHub package version](https://img.shields.io/github/package-json/v/junebug12851/pokered-save-editor.svg?style=flat-square)](https://github.com/junebug12851/pokered-save-editor)

## About this project
_We've reached 200 commits * Gasp * (⌒▽⌒)☆ !!!_

This is aimed to be a complete Pokemon Red and Blue save editor, as in, all
bytes and areas of the save file would be editable. It's designed to be very
simple to jump-in and use right away intuitively with a well-designed interface.
In other words the UI and UX are first-class citizens and as such the editing
ui is designed to be easy, intuitive, and a bit fun to use.

The full save file made use by the game is editable, all bits and bytes,
currently unused areas are not editable but this is a planned feature to
implement.

Here are some of the features

### All Font Characters

Typing names is meant to be as easy as simply using the keys on your keyboard
however the game allows up to 255 different tiles, control codes, and variables to be used for names
all of which are not directly typable on your keyboard.
To keep from being unfair and leaving them out, shorthand syntax is used such
as `<f>` or `<B>` to access all possible tile options. Even better, all 255
tiles and codes are available in a
full slide-out virtual keyboard with mouseover tooltips on their shortcode equivalent.

### Player

![Player Name](https://thumbs.gfycat.com/FoolhardyFriendlyDodobird-size_restricted.gif)

![Player Id and Money](https://thumbs.gfycat.com/AdeptBitterGalapagosalbatross-size_restricted.gif)

![Player Badges](https://thumbs.gfycat.com/MarvelousDishonestIchthyostega-size_restricted.gif)

### Pokedex

![Pokedex](https://thumbs.gfycat.com/WeepyDistantFinwhale-size_restricted.gif)

### Items

![Bag Items](https://thumbs.gfycat.com/PessimisticDarlingGlowworm-size_restricted.gif)

### Pokemon

![Party Pokemon](https://thumbs.gfycat.com/DelightfulEasyCrocodileskink-size_restricted.gif)

### Area

![Contrast](https://thumbs.gfycat.com/BountifulSkeletalEnglishpointer-size_restricted.gif)

![Sprites](https://thumbs.gfycat.com/LividUnrulyAmericanriverotter-size_restricted.gif)

![Wild Pokemon](https://thumbs.gfycat.com/MistyUnlawfulInvisiblerail-size_restricted.gif)

### World

![Events](https://thumbs.gfycat.com/SoupyCooperativeAfricangoldencat-size_restricted.gif)

![Hidden Items](https://thumbs.gfycat.com/FastOptimisticBrownbear-size_restricted.gif)

### Hall of Fame

![HoF](https://thumbs.gfycat.com/EllipticalInfiniteHog-size_restricted.gif)

### Wipe Unused Space

This features erases all unused data of your save file which there's a lot of. Your normal game will work as though nothing has changed however internally the save file has vastly been cleaned up which works especially well when viewing in editors yourself. Sometimes when submitting a bug report you may be asked to provide a cleaned up version of it since it can make degugging very easy.

Furthermore if you suspect tampering whether malicious or not such as extra code injected in your save file this will erase it.

![Wipe Unused Space](https://i.imgur.com/iWC0FU8.png)

## A quick disclaimer

Despite significant work going into this project including countless sleepless
nights and many many hours of planning and testing. I can't ever state this project
is perfect and flawless. Things happen and things go wrong as with any app or
game. I cannot be held liable for any damaged or corrupted games but I do want
above anything to be told via the issue tracker if things do happen so I can try
to find and issue a fix quickly.

### Repository Size Note for Contributors and Builders

We try to keep the repository size as small as possible however you will find
it's considered large for a git repo. This is a free and open source project
and as such can't afford monthly costs or premium features. One
of gits greatest creations is git-lfs which allows seamlessly seperating code
from non-code and Github well supports this however Github, like 99% of other
websites, want's to capitalize on this new feature and as such we can't use it.
Microsoft is the only one that provides this feature completely free with no
strings attached but at the cost of a completely private repo which doesn't
work.

What this means is the repo size will have to include all non-code assets and
not be able to use the git-lfs feature until it becomes free with no strings
attached and this also means a much higher repo size for a normal git
repository.

Still we need to try and keep assets small.

Hopefully Github will eliminate capitalization on git-lfs one day and allow
open-source projects to be able to use it as it's almost a core feature to use
in many projects.

## License

This project has an easy license, it's licensed Apache 2, just do whatever as
long as you credit me back.

This project makes use of quite a lot of external technologies and information
which is listed in the credits section and thus may be licensed differently.

## Contributing

Contributions are definately welcome, just fork and send a pull request.

## Credits

* Font Awesome Free (Web Fonts) - has 3 licenses "CC BY 4.0 License",
  "SIL OFL 1.1 License", and "MIT License" - Not my favorite but has some useful
  fonts.
* IcoMoon Free (Web Fonts) - Attribution - All of the thousands of free font
  icons from the site at the time when it was downloaded.
* PokeRed Team (Pokemon Red/Blue Source Code) - Public Domain, All the
  information I have came from those awesome people and their years of hard
  work.
* Pokemon Red Bitmap Font Sprite Sheet (Pokemon Red/Blue Source Code) - Also came
  from the pokered team.
* Electron (Desktop Platform) - License MIT, this is a desktop only app and this
  makes it possible very elegantly
* Materialize (UI Kit) - License MIT, Provides a pretty and simple UI framework
  to build the interface on. This project isn't meant to be overly complex and
  to keep things striaght forward and useable.
* Angular (Code Framework) - License MIT, About the only more complex aspect to
  the project but keeps a Single Page Application simple and does much of the
  heavy lifting.
* SASS (UI Language) - License MIT, CSS improved
* Typescript (Scripting language) - Apache 2 License, Eh, it comes with Angular
* Google Material Icons - (More Icons!) - License Apache 2 License
