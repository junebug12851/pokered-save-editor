export interface Text {

    // In-Game text code
    code: number;

    // Typeable english representative
    eng: string;

    // In-Game aprox length (Maximum length normally occuring)
    // Some codes expand out to many characters or variable characters
    // Some codes expand out to nothing (control codes)
    length: number;

    // Some codes require special syntax to type
    // (There's no gender symbols or "Poke" text on any keyboard I know)
    shorthand?: boolean;

    // A text option normally found in-game with the UI text editor
    normal?: boolean;

    // A control character
    control?: boolean;

    // An "insert tile from tilemap" character
    picture?: boolean;

    // 1 character whether it's a variable or not
    singleChar?: boolean;

    // Multi-character, (Variables that expand to more than 1 character)
    multiChar?: boolean;

    // A variable
    variable?: boolean;

    // Uses curent tilemap instead of font tilemap
    useTilemap?: boolean;
};
