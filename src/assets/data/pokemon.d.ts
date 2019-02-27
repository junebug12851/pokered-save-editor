export interface Pokemon {
    name: string, // Pokemon Name (Nidoran will use codes ex: Nidroan<m>)
    ind: number, // Pokemon Index Order
    glitch?: boolean, // Is this a glitch Pokemon?
    pokedex?: number, // Pokedex Order if not glitch
    growthRate?: number // Expirience Growth Rate Category
};
