import React from 'react';
import type { Brand, Model } from "../types.ts";

export interface BrandsContextType {
    brands: Brand[];
    addBrand: (title: string, description?: string) => void;
    removeBrand: (id:number) => void;
    updateBrand: (id:number, data: Partial<Brand>) => void;

    addModel: (brandId: number, title: string, year: number, description?: string) => void;
    removeModel: (brandId:number, modelId: number) => void;
    updateModel: (brandId: number, modelId: number, data: Partial<Model>) => void;
    toggleModelReserve: (brandId: number, modelId: number) => void;
}

export const CollectionsContext = React.createContext<BrandsContextType | null>(null);
