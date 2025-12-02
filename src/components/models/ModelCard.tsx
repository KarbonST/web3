import React from 'react';
import type { Model } from '../../types';
import { useNavigate, useParams } from 'react-router-dom';
import { EditIcon, TrashIcon } from '../ui/Icons';

interface Props {
    model: Model;
    onToggle: () => void;
    onRemove: () => void;
}

const modelCard: React.FC<Props> = ({ model, onToggle, onRemove }) => {
    const navigate = useNavigate();
    const { id: brandId } = useParams(); // берем коллекцию из URL

    return (
        <div className={`model-card ${model.reserved ? 'read' : ''}`}>
            <div className="model-card__body" onClick={onToggle}>
                <h4>{model.title}</h4>
                <p>VIN номер: {model.vin || 'Неизвестен'}</p>
                {model.description && <p>Описание: {model.description}</p>}
            </div>

            <div className="model-card__actions">
                <button
                    aria-label="Редактировать"
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/brands/${brandId}/models/${model.id}/edit`);
                    }}
                >
                    <EditIcon />
                </button>

                <button
                    aria-label="Удалить"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                >
                    <TrashIcon />
                </button>
            </div>
        </div>
    );
};

export default modelCard;
