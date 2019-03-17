export interface PokemonEvolution {
    // The Pokemon evolves by reaching this level
    level?: number;

    // The Pokemon evolves by using this item
    item?: string;

    // The Pokemon evolves by trading it
    trade?: true;

    // The Pokemon evolves into this Pokemon
    toName: string;
}

export interface Pokemon {

    [key: string]: any, // Generic Lookup

    // For all Pokemon
    name: string, // Pokemon Name with code (ex Nidoran will use ex: Nidroan<m>)
    ind: number, // Pokemon Index Order

    // For valid Pokemon
    pokedex?: number, // Pokedex Order
    growthRate?: number, // Expirience Growth Rate Category

    // Base Stats
    baseHp?: number,
    baseAttack?: number,
    baseDefense?: number,
    baseSpeed?: number,
    baseSpecial?: number,

    // Base EXP
    baseExpYield?: number,

    // Naturally Learned Moves
    moves?: {
        level: number, // Level learned at
        move: string // Move name
    }[],

    // Initial Moves immidiately available
    initial?: string[];

    // TM's and HM's Learnable
    // Internally HM's are actually just part of the TM list
    tmHm?: number[];

    // Pokemon Types
    type1?: string;
    type2?: string;

    // How easily catchable in wild
    // Lower is more diffcult, higher is more easy
    // Values 0-255
    catchRate?: number;

    // This Pokemon can evolve and this is how
    evolution?: PokemonEvolution | PokemonEvolution[];

    // For Invalid Pokemon
    glitch?: boolean, // Is this a glitch Pokemon?
};
