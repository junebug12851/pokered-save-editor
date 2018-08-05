import { PokemonBox } from './PokemonBox';

export class PokemonParty extends PokemonBox {
    constructor() {
        super();
    }

    public level: number;
    public maxHP: number;
    public attack: number;
    public defense: number;
    public speed: number;
    public special: number;
}