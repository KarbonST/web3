import React from 'react';
import { BrandsContext } from '../context/BrandsContext';

export const useCollections = () => {
    const ctx = React.useContext(BrandsContext);
    if (!ctx) {
        throw new Error('useCollections must be used inside provider');
    }
    return ctx;
};
