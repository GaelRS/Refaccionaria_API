export class PiezaInvalida extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PiezaInvalida";
    }
}
