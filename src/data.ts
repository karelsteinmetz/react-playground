export interface IItem {
    name: string;
}

export interface ICategory {
    name: string;
    description: string;
    items: { [id: string]: IItem };
}

export const data: { [category: string]: ICategory } =
    {
        'DataGrid': {
            name: 'react-data-grid',
            description: "Example for react data grid",
            items: {
                'Common': { name: 'Common example' }
            }
        }
    };

export function lookupCategory(name: string) {
    return data[name];
}

export function lookupItem(category: string, item: string): IItem {
    return data[category].items[item];
}