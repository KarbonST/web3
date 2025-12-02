import React from 'react';
import type { Model } from '../../types';
import ModelCard from './ModelCard';

const ModelList: React.FC<{ models: Model[]; onToggle: (id: number) => void; onRemove: (id: number) => void }> = ({ models, onToggle, onRemove }) => {
    return (
        <div className="models-list">
            {models.map(model => (
                <ModelCard key={model.id} model={model} onToggle={() => onToggle(model.id)} onRemove={() => onRemove(model.id)} />
            ))}
        </div>
    );
};

export default ModelList;
