import { PokemonMove } from './pokemonMove';

export class PokemonBox {
    constructor() { }

    public species: number;
    public hp: number;
    public boxLevel: number;
    public status: number;
    public type1: number;
    public type2: number;
    public catchRate: number;
    public moves: PokemonMove[];
    public otID: number;
    public exp: number;
    public hpExp: number;
    public attackExp: number;
    public defenseExp: number;
    public speedExp: number;
    public specialExp: number;
    public dv: number;
    public otName: string;
    public nickname: string;
}
