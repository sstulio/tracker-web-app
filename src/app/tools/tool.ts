import { Entity } from 'app/commons/model/Entity';
import { getStringProperty, isEmpty } from 'app/commons/util';
import { Location } from '../locations/location';

export class Tool extends Entity {

    name: string;
    code: string;
    location: { id: any; };

    constructor(data?: any) {
        super(data);
        this.name = getStringProperty('name', data);
        this.code = getStringProperty('code', data);
        this.location = (data && data.location) ? { id: data.location.id } : { id: undefined };
    }

    validate(): boolean {
        return !isEmpty(this.name) && !isEmpty(this.code);
    }
}
