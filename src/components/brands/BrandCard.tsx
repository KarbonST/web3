import React from 'react';
import type { Brand } from '../../types';
import { useNavigate } from 'react-router-dom';
import { EditIcon, TrashIcon } from '../ui/Icons';

const BrandCard: React.FC<{ brand: Brand; onRemove: () => void }> = ({ brand, onRemove }) => {
    const navigate = useNavigate();

    const openBrand = () => {
        navigate(`/brands/${brand.id}`);
    };

    return (
        <div className="brand-card" onClick={openBrand}>
            <div className="brand-card__body">
                <h3>{brand.title}</h3>
                <p>{brand.description}</p>
            </div>

            <div className="brand-card__actions">
                <button
                    className="icon-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/brands/${brand.id}/edit`);
                    }}
                >
                    <EditIcon />
                </button>

                <button
                    className="icon-button"
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

export default BrandCard;
