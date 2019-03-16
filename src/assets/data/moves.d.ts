export interface Move {
    name: string,
    ind: number,
    power?: number,
    type?: string,
    accuracy?: number,
    pp?: number,
    glitch?: boolean

    // If also as a TM, the internal TM number
    // Internally HM's are also TM's just treated differently
    // so this is also the internal HM number
    tm?: number,

    // Whether an HM or not
    // This is the external HM number, to get the
    // internal HM number look at the TM number
    hm?: number
}
