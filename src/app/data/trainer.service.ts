import { Injectable } from '@angular/core';

export interface RawTrainers {
    name: string,
    ind: number
}

export const rawTrainers: RawTrainers[] = [
    { name: "Youngster", ind: 0x01 },
    { name: "Bug Catcher", ind: 0x02 },
    { name: "Lass", ind: 0x03 },
    { name: "Sailor", ind: 0x04 },
    { name: "Jr. Trainer M", ind: 0x05 },
    { name: "Jr Trainer F", ind: 0x06 },
    { name: "Pokemaniac", ind: 0x07 },
    { name: "Super Nerd", ind: 0x08 },
    { name: "Hiker", ind: 0x09 },
    { name: "Biker", ind: 0x0a },
    { name: "Burglar", ind: 0x0b },
    { name: "Engineer", ind: 0x0c },
    { name: "Juggler X", ind: 0x0d },
    { name: "Fisher", ind: 0x0e },
    { name: "Swimmer", ind: 0x0f },
    { name: "Cue_ball", ind: 0x10 },
    { name: "Gambler", ind: 0x11 },
    { name: "Beauty", ind: 0x12 },
    { name: "Psychic Trainer", ind: 0x13 },
    { name: "Rocker", ind: 0x14 },
    { name: "Juggler", ind: 0x15 },
    { name: "Tamer", ind: 0x16 },
    { name: "Bird Keeper", ind: 0x17 },
    { name: "Blackbelt", ind: 0x18 },
    { name: "Rival 1", ind: 0x19 },
    { name: "Prof Oak", ind: 0x1a },
    { name: "Chief", ind: 0x1b },
    { name: "Scientist", ind: 0x1c },
    { name: "Giovanni", ind: 0x1d },
    { name: "Rocket", ind: 0x1e },
    { name: "Cooltrainer M", ind: 0x1f },
    { name: "Cooltrainer F", ind: 0x20 },
    { name: "Bruno", ind: 0x21 },
    { name: "Brock", ind: 0x22 },
    { name: "Misty", ind: 0x23 },
    { name: "Lt Surge", ind: 0x24 },
    { name: "Erika", ind: 0x25 },
    { name: "Koga", ind: 0x26 },
    { name: "Blaine", ind: 0x27 },
    { name: "Sabrina", ind: 0x28 },
    { name: "Gentleman", ind: 0x29 },
    { name: "Rival 2", ind: 0x2a },
    { name: "Rival 3", ind: 0x2b },
    { name: "Lorelei", ind: 0x2c },
    { name: "Channeler", ind: 0x2d },
    { name: "Agatha", ind: 0x2e },
    { name: "Lance", ind: 0x2f },
]

@Injectable({
    providedIn: 'root'
})
export class TrainerService {

    constructor() {
        for (var i = 0; i < rawTrainers.length; i++) {
            const rawTrainer = rawTrainers[i];

            const ind = rawTrainer.ind;
            const name = rawTrainer.name;

            const opp = {
                name,
                ind: ind + 200,
            }

            this.nameToInd[name] = rawTrainer;
            this.indToName[ind] = rawTrainer;

            this.oppNameToInd[name] = opp;
            this.oppIndToName[ind] = opp;

            this.rawOppTrainers.push(opp);
        };
    }

    public nameToInd: {
        [key: string]: RawTrainers
    } = {};

    public indToName: RawTrainers[] = [];

    public oppNameToInd: {
        [key: string]: RawTrainers
    } = {};

    public oppIndToName: RawTrainers[] = [];

    public rawTrainers = rawTrainers;
    public rawOppTrainers: RawTrainers[] = [];
}
