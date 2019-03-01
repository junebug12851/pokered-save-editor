export interface Pokemon {

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

    // For Invalid Pokemon
    glitch?: boolean, // Is this a glitch Pokemon?
};
