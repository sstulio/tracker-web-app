import { Entity } from 'app/commons/model/Entity';
import { getStringProperty, getListProperty, isEmpty } from 'app/commons/util'
import { Tool } from 'app/tools/tool';
import { Worker } from 'app/workers/worker';

export class Location extends Entity {

    name: string;
    costCenter: string;
    tools: Tool[];
    workers: Worker[];

    constructor(data?: any) {
        super(data);
        this.name = getStringProperty('name', data);
        this.costCenter = getStringProperty('costCenter', data);
        this.tools = getListProperty('tools', data).map(toolData => new Tool(toolData));
        this.workers = getListProperty('workers', data).map(workerData => new Worker(workerData));
    }

    validate(): boolean {
        return !isEmpty(this.name);
    }
}
