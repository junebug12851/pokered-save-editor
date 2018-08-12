import { Injectable } from '@angular/core';

export interface RawMove {
    name: string,
    ind: number,
    glitch?: boolean
}

export const rawMoves: RawMove[] = [
    { name: "Pound", ind: 0x01 },
    { name: "Karate chop", ind: 0x02 },
    { name: "Doubleslap", ind: 0x03 },
    { name: "Comet punch", ind: 0x04 },
    { name: "Mega punch", ind: 0x05 },
    { name: "Pay day", ind: 0x06 },
    { name: "Fire punch", ind: 0x07 },
    { name: "Ice punch", ind: 0x08 },
    { name: "Thunderpunch", ind: 0x09 },
    { name: "Scratch", ind: 0x0a },
    { name: "Vicegrip", ind: 0x0b },
    { name: "Guillotine", ind: 0x0c },
    { name: "Razor wind", ind: 0x0d },
    { name: "Swords dance", ind: 0x0e },
    { name: "Cut", ind: 0x0f },
    { name: "Gust", ind: 0x10 },
    { name: "Wing attack", ind: 0x11 },
    { name: "Whirlwind", ind: 0x12 },
    { name: "Fly", ind: 0x13 },
    { name: "Bind", ind: 0x14 },
    { name: "Slam", ind: 0x15 },
    { name: "Vine whip", ind: 0x16 },
    { name: "Stomp", ind: 0x17 },
    { name: "Double kick", ind: 0x18 },
    { name: "Mega kick", ind: 0x19 },
    { name: "Jump kick", ind: 0x1a },
    { name: "Rolling kick", ind: 0x1b },
    { name: "Sand attack", ind: 0x1c },
    { name: "Headbutt", ind: 0x1d },
    { name: "Horn attack", ind: 0x1e },
    { name: "Fury attack", ind: 0x1f },
    { name: "Horn drill", ind: 0x20 },
    { name: "Tackle", ind: 0x21 },
    { name: "Body slam", ind: 0x22 },
    { name: "Wrap", ind: 0x23 },
    { name: "Take down", ind: 0x24 },
    { name: "Thrash", ind: 0x25 },
    { name: "Double edge", ind: 0x26 },
    { name: "Tail whip", ind: 0x27 },
    { name: "Poison sting", ind: 0x28 },
    { name: "Twineedle", ind: 0x29 },
    { name: "Pin missile", ind: 0x2a },
    { name: "Leer", ind: 0x2b },
    { name: "Bite", ind: 0x2c },
    { name: "Growl", ind: 0x2d },
    { name: "Roar", ind: 0x2e },
    { name: "Sing", ind: 0x2f },
    { name: "Supersonic", ind: 0x30 },
    { name: "Sonicboom", ind: 0x31 },
    { name: "Disable", ind: 0x32 },
    { name: "Acid", ind: 0x33 },
    { name: "Ember", ind: 0x34 },
    { name: "Flamethrower", ind: 0x35 },
    { name: "Mist", ind: 0x36 },
    { name: "Water gun", ind: 0x37 },
    { name: "Hydro pump", ind: 0x38 },
    { name: "Surf", ind: 0x39 },
    { name: "Ice beam", ind: 0x3a },
    { name: "Blizzard", ind: 0x3b },
    { name: "Psybeam", ind: 0x3c },
    { name: "Bubblebeam", ind: 0x3d },
    { name: "Aurora beam", ind: 0x3e },
    { name: "Hyper beam", ind: 0x3f },
    { name: "Peck", ind: 0x40 },
    { name: "Drill peck", ind: 0x41 },
    { name: "Submission", ind: 0x42 },
    { name: "Low kick", ind: 0x43 },
    { name: "Counter", ind: 0x44 },
    { name: "Seismic toss", ind: 0x45 },
    { name: "Strength", ind: 0x46 },
    { name: "Absorb", ind: 0x47 },
    { name: "Mega drain", ind: 0x48 },
    { name: "Leech seed", ind: 0x49 },
    { name: "Growth", ind: 0x4a },
    { name: "Razor leaf", ind: 0x4b },
    { name: "Solarbeam", ind: 0x4c },
    { name: "Poisonpowder", ind: 0x4d },
    { name: "Stun spore", ind: 0x4e },
    { name: "Sleep powder", ind: 0x4f },
    { name: "Petal dance", ind: 0x50 },
    { name: "String shot", ind: 0x51 },
    { name: "Dragon rage", ind: 0x52 },
    { name: "Fire spin", ind: 0x53 },
    { name: "Thundershock", ind: 0x54 },
    { name: "Thunderbolt", ind: 0x55 },
    { name: "Thunder wave", ind: 0x56 },
    { name: "Thunder", ind: 0x57 },
    { name: "Rock throw", ind: 0x58 },
    { name: "Earthquake", ind: 0x59 },
    { name: "Fissure", ind: 0x5a },
    { name: "Dig", ind: 0x5b },
    { name: "Toxic", ind: 0x5c },
    { name: "Confusion", ind: 0x5d },
    { name: "Psychic m", ind: 0x5e },
    { name: "Hypnosis", ind: 0x5f },
    { name: "Meditate", ind: 0x60 },
    { name: "Agility", ind: 0x61 },
    { name: "Quick attack", ind: 0x62 },
    { name: "Rage", ind: 0x63 },
    { name: "Teleport", ind: 0x64 },
    { name: "Night shade", ind: 0x65 },
    { name: "Mimic", ind: 0x66 },
    { name: "Screech", ind: 0x67 },
    { name: "Double team", ind: 0x68 },
    { name: "Recover", ind: 0x69 },
    { name: "Harden", ind: 0x6a },
    { name: "Minimize", ind: 0x6b },
    { name: "Smokescreen", ind: 0x6c },
    { name: "Confuse ray", ind: 0x6d },
    { name: "Withdraw", ind: 0x6e },
    { name: "Defense curl", ind: 0x6f },
    { name: "Barrier", ind: 0x70 },
    { name: "Light screen", ind: 0x71 },
    { name: "Haze", ind: 0x72 },
    { name: "Reflect", ind: 0x73 },
    { name: "Focus energy", ind: 0x74 },
    { name: "Bide", ind: 0x75 },
    { name: "Metronome", ind: 0x76 },
    { name: "Mirror move", ind: 0x77 },
    { name: "Selfdestruct", ind: 0x78 },
    { name: "Egg bomb", ind: 0x79 },
    { name: "Lick", ind: 0x7a },
    { name: "Smog", ind: 0x7b },
    { name: "Sludge", ind: 0x7c },
    { name: "Bone club", ind: 0x7d },
    { name: "Fire blast", ind: 0x7e },
    { name: "Waterfall", ind: 0x7f },
    { name: "Clamp", ind: 0x80 },
    { name: "Swift", ind: 0x81 },
    { name: "Skull bash", ind: 0x82 },
    { name: "Spike cannon", ind: 0x83 },
    { name: "Constrict", ind: 0x84 },
    { name: "Amnesia", ind: 0x85 },
    { name: "Kinesis", ind: 0x86 },
    { name: "Softboiled", ind: 0x87 },
    { name: "Hi jump kick", ind: 0x88 },
    { name: "Glare", ind: 0x89 },
    { name: "Dream eater", ind: 0x8a },
    { name: "Poison gas", ind: 0x8b },
    { name: "Barrage", ind: 0x8c },
    { name: "Leech life", ind: 0x8d },
    { name: "Lovely kiss", ind: 0x8e },
    { name: "Sky attack", ind: 0x8f },
    { name: "Transform", ind: 0x90 },
    { name: "Bubble", ind: 0x91 },
    { name: "Dizzy punch", ind: 0x92 },
    { name: "Spore", ind: 0x93 },
    { name: "Flash", ind: 0x94 },
    { name: "Psywave", ind: 0x95 },
    { name: "Splash", ind: 0x96 },
    { name: "Acid armor", ind: 0x97 },
    { name: "Crabhammer", ind: 0x98 },
    { name: "Explosion", ind: 0x99 },
    { name: "Fury swipes", ind: 0x9a },
    { name: "Bonemerang", ind: 0x9b },
    { name: "Rest", ind: 0x9c },
    { name: "Rock slide", ind: 0x9d },
    { name: "Hyper fang", ind: 0x9e },
    { name: "Sharpen", ind: 0x9f },
    { name: "Conversion", ind: 0xa0 },
    { name: "Tri attack", ind: 0xa1 },
    { name: "Super fang", ind: 0xa2 },
    { name: "Slash", ind: 0xa3 },

    // below here are glitch moves

    { name: "Substitute", ind: 0xa4, glitch: true },
    { name: "Struggle", ind: 0xa5, glitch: true },
    { name: "Showpic anim", ind: 0xa6, glitch: true },
    { name: "Status affected anim", ind: 0xa7, glitch: true },
    { name: "Anim a8", ind: 0xa8, glitch: true },
    { name: "Anim a9", ind: 0xa9, glitch: true },
    { name: "Trade ball drop anim", ind: 0xaa, glitch: true },
    { name: "Trade ball shake anim", ind: 0xab, glitch: true },
    { name: "Trade ball tilt anim", ind: 0xac, glitch: true },
    { name: "Trade ball poof anim", ind: 0xad, glitch: true },
    { name: "Xstatitem anim", ind: 0xae, glitch: true }, // use x attack/defense/speed/special
    { name: "Anim af", ind: 0xaf, glitch: true },
    { name: "Anim b0", ind: 0xb0, glitch: true },
    { name: "Anim b1", ind: 0xb1, glitch: true },
    { name: "Anim b2", ind: 0xb2, glitch: true },
    { name: "Anim b3", ind: 0xb3, glitch: true },
    { name: "Anim b4", ind: 0xb4, glitch: true },
    { name: "Anim b5", ind: 0xb5, glitch: true },
    { name: "Anim b6", ind: 0xb6, glitch: true },
    { name: "Anim b7", ind: 0xb7, glitch: true },
    { name: "Anim b8", ind: 0xb8, glitch: true },
    { name: "Anim b9", ind: 0xb9, glitch: true },
    { name: "Burn psn anim", ind: 0xba, glitch: true }, // plays when a monster is burned or poisoned
    { name: "Anim bb", ind: 0xbb, glitch: true },
    { name: "Anim bc", ind: 0xbc, glitch: true },
    { name: "Slp anim", ind: 0xbd, glitch: true }, // sleeping monster
    { name: "Anim be", ind: 0xbe, glitch: true },
    { name: "Conf anim", ind: 0xbf, glitch: true }, // confused monster
    { name: "Anim c0", ind: 0xc0, glitch: true },
    { name: "Toss anim", ind: 0xc1, glitch: true }, // toss poké ball
    { name: "Shake anim", ind: 0xc2, glitch: true }, // shaking poké ball when catching monster
    { name: "Poof anim", ind: 0xc3, glitch: true },
    { name: "Blockball anim", ind: 0xc4, glitch: true }, // trainer knocks away poké ball
    { name: "Greattoss anim", ind: 0xc5, glitch: true }, // toss great ball
    { name: "Ultratoss anim", ind: 0xc6, glitch: true }, // toss ultra ball or master ball
    { name: "Anim c7", ind: 0xc7, glitch: true },
    { name: "Hidepic anim", ind: 0xc8, glitch: true }, // monster disappears
    { name: "Rock anim", ind: 0xc9, glitch: true }, // throw rock
    { name: "Bait anim", ind: 0xca, glitch: true }, // throw bait
]

@Injectable({
    providedIn: 'root'
})
export class MoveService {

    constructor() {
        for (var i = 0; i < rawMoves.length; i++) {
            const rawMove = rawMoves[i];
            const ind = rawMove.ind;
            const name = rawMove.name;

            this.nameToInd[name] = rawMove;

            this.indToName = [];
            this.indToName[ind] = rawMove;
        };
    }

    // Generated list of Pokemon in same order as above but lookup index by name
    public nameToInd: {
        [key: string]: RawMove
    } = {};

    // Generated list of Pokemon in same order as above but lookup name by index
    // @ts-ignore - It's clearly defined above, I don't understand what your comaplining about
    public indToName: RawMove[];

    public rawMoves = rawMoves;
}
