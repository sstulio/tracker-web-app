export class Entity {
    id?: number;

    constructor(data?: any) {
        this.id = data ? data.id : undefined;
    }

    equalsTo(e: Entity) {
        return this.id === e.id;
    }
}
