export function getStringProperty(property: string, obj: any): string {
    return obj ? (obj[property] || '') : '';
}

export function getListProperty(property: string, obj: any): any[] {
    return obj ? (obj[property] || []) : [];
}
