# Pokered Save Editor [![Build Status](https://travis-ci.org/junebug12851/pokered-save-editor.svg?branch=master)](https://travis-ci.org/junebug12851/pokered-save-editor)

_Side Note_: SourceTree had royally messed up the git repo so a complete rebase
including all tag recreations and all non-master branch recreations had to
happen from scratch unfortunately. It made a few files a bit quirky but it's
all cleaned up and I think I've caught all the quirks that happened in the
various files and corrected them back hopefully. Theres no doubt more work to
do to recover including getting Travis back on and the previous releases that
were on Github.

## About this project

This is aimed to be a complete Pokemon Red and Blue save editor, as in, all
bytes and areas of the save file would be editable. It's designed to be very
simple to jump-in and use right away intuitively with a well-designed interface.

The first version has been released and all used areas of the save file are editable. There are currently varying UI glitches such as overlapping controls in some cases and a couple of misc features which don't work like the virtual keyboards but the overall the app has accomplished it's first goal of many which is to provide easy and intuitive editing to the entirety of the useable Save File.

Here are some of the features

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

![Options](https://thumbs.gfycat.com/FeistyLongIcelandgull-size_restricted.gif)

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
