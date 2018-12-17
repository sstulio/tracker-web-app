import { Entity } from 'app/commons/model/Entity';
import { getStringProperty, getListProperty, isEmpty } from 'app/commons/util'
import { Tool } from 'app/tools/tool';

export class Location extends Entity {

    name: string;
    tools: Tool[];

    constructor(data?: any) {
        super(data);
        this.name = getStringProperty('name', data);
        this.tools = getListProperty('tools', data).map(toolData => new Tool(toolData));
    }

    validate(): boolean {
        return !isEmpty(this.name);
    }
}
