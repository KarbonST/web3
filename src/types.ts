export type Model = {
    id: number;
    title: string;
    year: number;
    description?: string;
    reserved?: boolean;
}

export type Brand = {
    id: number;
    title: string;
    description?: string;
    models: Model[];
}