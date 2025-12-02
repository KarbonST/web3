import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import type { Brand, Model } from '../types';
import { BrandsContext } from './BrandsContext';
import type { BrandsContextType } from './BrandsContext';

type BrandsState = {
    order: number[];
    entities: Record<number, Brand>;
};

const STORAGE_KEY = 'brands';
const initialState: BrandsState = { order: [], entities: {} };

type BrandsAction =
    | { type: 'brand/created'; payload: Brand }
    | { type: 'brand/removed'; payload: { id: number } }
    | { type: 'brand/updated'; payload: { id: number; data: Partial<Brand> } }
    | { type: 'model/added'; payload: { brandId: number; model: Model } }
    | { type: 'model/updated'; payload: { brandId: number; modelId: number; data: Partial<Model> } }
    | { type: 'model/removed'; payload: { brandId: number; modelId: number } }
    | { type: 'model/toggled'; payload: { brandId: number; modelId: number } };

const reviveBrands = (raw: unknown): BrandsState => {
    if (!raw) return initialState;

    if (Array.isArray(raw)) {
        const order = raw.map(item => item.id).filter(Boolean);
        const entities = raw.reduce<Record<number, Brand>>((acc, item) => {
            if (typeof item.id !== 'number') return acc;
            acc[item.id] = {
                ...item,
                models: (item.models ?? []).map((model: Model) => ({
                    ...model,
                    vin: model.vin ?? '',
                    reserved: Boolean(model.reserved),
                })),
            };
            return acc;
        }, {});
        return { order, entities };
    }

    if (
        typeof raw === 'object' && Array.isArray((raw as BrandsState).order) &&
        typeof (raw as BrandsState).entities === 'object'
    ) {
        const parsed = raw as BrandsState;
        const entities: Record<number, Brand> = {};
        for (const key of Object.keys(parsed.entities)) {
            const numericKey = Number(key);
            const value = parsed.entities[Number(key)];
            if (!value) continue;
            entities[numericKey] = {
                ...value,
                models: (value.models ?? []).map((model) => ({
                    ...model,
                    vin: model.vin ?? '',
                    reserved: Boolean(model.reserved),
                })),
            };
        }

        const order = parsed.order.filter(id => entities[id]);
        return { order, entities };
    }

    return initialState;
};

const brandsReducer = (state: BrandsState, action: BrandsAction): BrandsState => {
    switch (action.type) {
        case 'brand/created': {
            const entry = action.payload;
            return {
                order: [...state.order, entry.id],
                entities: { ...state.entities, [entry.id]: entry },
            };
        }
        case 'brand/removed': {
            const { id } = action.payload;
            if (!state.entities[id]) return state;
            const entities = { ...state.entities };
            delete entities[id];
            return {
                order: state.order.filter(item => item !== id),
                entities,
            };
        }
        case 'brand/updated': {
            const { id, data } = action.payload;
            const current = state.entities[id];
            if (!current) return state;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [id]: { ...current, ...data, models: data.models ?? current.models },
                },
            };
        }
        case 'model/added': {
            const { brandId, model } = action.payload;
            const brand = state.entities[brandId];
            if (!brand) return state;
            const updated: Brand = {
                ...brand,
                models: [...brand.models, model],
            };
            return {
                ...state,
                entities: { ...state.entities, [brandId]: updated },
            };
        }
        case 'model/updated': {
            const { brandId, modelId, data } = action.payload;
            const brand = state.entities[brandId];
            if (!brand) return state;
            const updatedModels = brand.models.map(model =>
                model.id === modelId ? { ...model, ...data } : model
            );
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [brandId]: { ...brand, models: updatedModels },
                },
            };
        }
        case 'model/removed': {
            const { brandId, modelId } = action.payload;
            const brand = state.entities[brandId];
            if (!brand) return state;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [brandId]: {
                        ...brand,
                        models: brand.models.filter(model => model.id !== modelId),
                    },
                },
            };
        }
        case 'model/toggled': {
            const { brandId, modelId } = action.payload;
            const brand = state.entities[brandId];
            if (!brand) return state;
            const toggled = brand.models.map(model =>
                model.id === modelId ? { ...model, reserved: !model.reserved } : model
            );
            return {
                ...state,
                entities: { ...state.entities, [brandId]: { ...brand, models: toggled } },
            };
        }
        default:
            return state;
    }
};

const useBrandsState = (): BrandsContextType => {
    const [state, dispatch] = useReducer(brandsReducer, initialState, () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return reviveBrands(stored ? JSON.parse(stored) : initialState);
        } catch (error) {
            console.error('Failed to load brands from storage', error);
            return initialState;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.error('Failed to persist brands', error);
        }
    }, [state]);

    const brands = useMemo(
        () => state.order.map(id => state.entities[id]).filter(Boolean),
        [state]
    );

    const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

    const addBrand = useCallback((title: string, description?: string) => {
        const payload: Brand = {
            id: generateId(),
            title,
            description,
            models: [],
        };
        dispatch({ type: 'brand/created', payload });
    }, []);

    const removeBrand = useCallback((id: number) => {
        dispatch({ type: 'brand/removed', payload: { id } });
    }, []);

    const updateBrand = useCallback((id: number, data: Partial<Brand>) => {
        dispatch({ type: 'brand/updated', payload: { id, data } });
    }, []);

    const addModel = useCallback((brandId: number, title: string, vin: string, description?: string) => {
        const model: Model = {
            id: generateId(),
            title,
            vin,
            description,
            reserved: false,
        };
        dispatch({ type: 'model/added', payload: { brandId, model } });
    }, []);

    const updateModel = useCallback((brandId: number, modelId: number, data: Partial<Model>) => {
        dispatch({ type: 'model/updated', payload: { brandId, modelId, data } });
    }, []);

    const removeModel = useCallback((brandId: number, modelId: number) => {
        dispatch({ type: 'model/removed', payload: { brandId, modelId } });
    }, []);

    const toggleModelReserve = useCallback((brandId: number, modelId: number) => {
        dispatch({ type: 'model/toggled', payload: { brandId, modelId } });
    }, []);

    return {
        brands,
        addBrand,
        removeBrand,
        updateBrand,
        addModel,
        updateModel,
        removeModel,
        toggleModelReserve,
    };
};

export const BrandsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const value = useBrandsState();

    return (
        <BrandsContext.Provider value={value}>
            {children}
        </BrandsContext.Provider>
    );
};
