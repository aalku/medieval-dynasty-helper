export interface Recipe {
    "name": string;
    "ingredients": {
        [key: string]: number;
    };
    "result": string;
}

export interface RecipeGroup {
    name: string;
    recipes: {
        [key: string]: Recipe;
    }
}

export interface RecipeGroupDataFile {
    author: string;
    data: {
        [key: string]: RecipeGroup;
    }
}