import { Entity } from 'app/commons/model/Entity';
import { getDateProperty, getListProperty, isEmpty } from 'app/commons/util'
import { Tool } from 'app/tools/tool';
import { Worker } from 'app/workers/worker';
import { Location } from 'app/locations/location';

export class Transition extends Entity {

    transitionDate: Date;
    beforeLocation: Location;
    afterLocation: Location;
    tool?: Tool;
    worker?: Worker;

    constructor(data?: any) {
        super(data);
        this.transitionDate = getDateProperty('transitionDate', data)
        this.beforeLocation = new Location(data['beforeLocation'])
        this.afterLocation = new Location(data['afterLocation'])
        this.tool = new Tool(data['tool'])
        this.worker = new Worker(data['worker'])
    
    }

    validate(): boolean {
        return !isEmpty(this.transitionDate);
    }
}
