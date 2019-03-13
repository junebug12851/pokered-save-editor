export interface EventPokemon {

    ///////////
    // EVENT
    ///////////

    // Event Title
    title: string,

    // Event Description
    desc: string,

    // Event Region
    region: string,

    ///////////
    // EVENT POKEMON
    ///////////

    // Pokemon Species
    pokemon: string,

    // Pokemon OT
    // If Array of Strings, one is randomly chosen
    otName: string | string[],
    
    // Pokemon Moves
    // If Empty use calculated natural moveset
    moves?: string[],

    // Pokemon Custom OT ID
    // If not one is randomly chosen
    otID?: string,

    // Pokemon Level
    // Defaults to 5
    level?: number = 5,

    // DV Setup
    // right now it's either left out (random) or 
    // "max" for all 15 DV's
    dv?: string
};
