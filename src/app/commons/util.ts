export function getStringProperty(property: string, obj: any): string {
    return obj ? (obj[property] || '') : '';
}

export function getDateProperty(property: string, obj: any): Date {
    let stringDate = String(obj[property]).replace("Z", "")
    let date = new Date(stringDate)
    return date
}

export function getListProperty(property: string, obj: any): any[] {
    return obj ? (obj[property] || []) : [];
}

export function isEmpty(property: any) {
    if (property === null || property === undefined) {
        return true;
    }
    if (typeof property === 'string' || property instanceof Array) {
        return property.length === 0;
    }

    return false;
}