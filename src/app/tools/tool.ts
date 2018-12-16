import { Entity } from 'app/commons/model/Entity';
import { getStringProperty } from 'app/commons/util';
import { Location } from '../locations/location';

export class Tool extends Entity {

    name: string;
    code: string;
    location: Location;

    constructor(data?: any) {
        super(data);
        this.name = getStringProperty('name', data);
        this.code = getStringProperty('code', data);
        this.location = new Location(getStringProperty('location', data));
    }
}
