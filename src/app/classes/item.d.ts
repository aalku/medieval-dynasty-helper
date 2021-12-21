export interface Item {
    name: string;
    type: string;
    price: number;
    weight: number;
    "manufacturing-time": number;
}

export interface ItemDataFile {
    author: string;
    data: {
        [key: string]: Item;
    }
}