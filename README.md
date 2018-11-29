# Pokered Save Editor

[![Travis (.org)](https://img.shields.io/travis/junebug12851/pokered-save-editor.svg?style=flat-square&label=full%20ci&logo=travis)](https://travis-ci.org/junebug12851/pokered-save-editor)
[![Scrutinizer Build](https://img.shields.io/scrutinizer/build/g/junebug12851/pokered-save-editor.svg?style=flat-square&label=simple%20ci&logo=scrutinizer)](https://scrutinizer-ci.com/g/junebug12851/pokered-save-editor)
[![Scrutinizer](https://img.shields.io/scrutinizer/g/junebug12851/pokered-save-editor.svg?style=flat-square&logo=scrutinizer)](https://scrutinizer-ci.com/g/junebug12851/pokered-save-editor)

## About this project

This is aimed to be a complete Pokemon Red and Blue save editor, as in, all
bytes and areas of the save file would be editable. It's designed to be very
simple to jump-in and use right away intuitively with a well-designed interface.
In other words the UI and UX are first-class citizens and as such the editing
ui is designed to be easy, intuitive, and a bit fun to use.

The full save file made use by the game is editable, all bits and bytes,
currently unused areas are not editable but this is a planned feature to
implement.

Here are some of the features

### Optional Virtual Keyboard

Typing names is meant to be as easy as simply using the keys on your keyboard
however the game allows up to 256 different tiles and control codes to be used for names
all of which are not directly typable on your keyboard.
To keep from being unfair and leaving them out, shorthand syntax is used such
as `<f>` or `<B>` to access all possible tile options. Even better, all 256
tiles and codes are available in a
full slide-out virtual keyboard.

![Player Name](https://thumbs.gfycat.com/FarEasyCarpenterant-size_restricted.gif)

### Player

![Player Name](https://thumbs.gfycat.com/PassionatePracticalGeese-size_restricted.gif)

![Player Id and Money](https://thumbs.gfycat.com/DifferentFastDrafthorse-size_restricted.gif)

![Player Badges](https://thumbs.gfycat.com/UnnaturalFewDinosaur-size_restricted.gif)

### Pokedex

![Pokedex](https://thumbs.gfycat.com/DistortedSnoopyGodwit-size_restricted.gif)

### Items

![Bag Items](https://thumbs.gfycat.com/BareJaggedBagworm-size_restricted.gif)

### Pokemon

![Party Pokemon](https://thumbs.gfycat.com/RegularInbornBassethound-size_restricted.gif)

### Area

![Contrast](https://thumbs.gfycat.com/AshamedHomelyBandicoot-size_restricted.gif)

![Music](https://thumbs.gfycat.com/HandyWhichAiredaleterrier-size_restricted.gif)

![Sprites](https://thumbs.gfycat.com/SillyGrouchyAbalone-size_restricted.gif)

![Wild Pokemon](https://thumbs.gfycat.com/SkinnySpeedyGrouse-size_restricted.gif)

### World

![Events](https://thumbs.gfycat.com/AnimatedFirsthandCuttlefish-size_restricted.gif)

![Hidden Items](https://thumbs.gfycat.com/AbleBigHerald-size_restricted.gif)

![Towns](https://thumbs.gfycat.com/WeeWateryAsianlion-size_restricted.gif)

![Options](https://thumbs.gfycat.com/SeparateOrganicKillerwhale-size_restricted.gif)

### Hall of Fame

![HoF](https://thumbs.gfycat.com/ZealousGenerousAmericantoad-size_restricted.gif)

### Other UI

Make use of the menu as a lot of work has gone into both shortcuts and available
options.

One of them is `Wipe Unused Space` which re-formats the entire save-file to
zeroes top-to-bottom afterwards writing only relevant bits and bytes back. The
game internally doesn't do this so the save file can become quite cluttered
over time. Furthermore if you suspect viruses or hi-jacking are embedded in the
save file this would erase it.

![Options](https://thumbs.gfycat.com/FeistyLongIcelandgull-size_restricted.gif)

## A quick disclaimer

Despite significant work going into this project including countless sleepless
nights and many many hours of planning and testing. I can't ever state this project
is perfect and flawless. Things happen and things go wrong as with any app or
game. I cannot be held liable for any damaged or corrupted games but I do want
above anything to be told via the issue tracker if things do happen so I can try
to find and issue a fix quickly.

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

## Development Instructions

The following development instructions curtesy of Angular CLI, needs some work
to tailor it for an electron based setup so WIP

This project was generated with
[Angular CLI](https://github.com/angular/angular-cli) version 6.1.1.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app
will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can
also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the
`dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via
[Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via
[Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the
[Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
