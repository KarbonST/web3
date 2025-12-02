import React from 'react';
import type {Brand} from '../../types';
import BrandCard from './BrandCard';

const BrandsList: React.FC<{ brands: Brand[]; onRemove: (id: number) => void }> = ({ brands, onRemove }) => {
    return (
        <div className="brands-list">
            {brands.map(c => (
                <BrandCard key={c.id} brand={c} onRemove={() => onRemove(c.id)} />
            ))}
        </div>
    );
};

export default BrandsList;