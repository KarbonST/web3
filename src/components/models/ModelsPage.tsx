import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBrands } from '../../hooks/useBrands';
import ModelCard from './ModelCard';
import ModelForm from './ModelForm';
import { Button } from '../ui/Button.tsx';
import Pagination from '../ui/Pagination.tsx';

const BOOKS_PAGE_SIZE = 10;

const ModelsPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { brands, addModel, removeModel, toggleModelReserve } =
        useBrands();

    const brandId = Number(id);
    const brand = brands.find((c) => c.id === brandId);

    const [currentPage, setCurrentPage] = React.useState(1);
    const [filter, setFilter] = React.useState<'all' | 'reserved' | 'unreserved'>('all');

    const filteredModels = React.useMemo(() => {
        const source = brand?.models ?? [];
        return source.filter((model) => {
            if (filter === 'reserved') return model.reserved;
            if (filter === 'unreserved') return !model.reserved;
            return true;
        });
    }, [brand?.models, filter]);

    const totalItems = filteredModels.length;

    const startIndex = (currentPage - 1) * BOOKS_PAGE_SIZE;
    const currentModels = filteredModels.slice(startIndex, startIndex + BOOKS_PAGE_SIZE);

    React.useEffect(() => {
        const totalPages = Math.max(1, Math.ceil(totalItems / BOOKS_PAGE_SIZE));
        setCurrentPage((prev) => {
            if (prev > totalPages) {
                return totalPages;
            }
            if (prev < 1) {
                return 1;
            }
            return prev;
        });
    }, [totalItems]);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [filter]);

    if (!brand) {
        return <div>Бренд не найден</div>;
    }

    return (
        <div className="models-page">
            <div className="models-header">
                <h2>Бренд: {brand.title}</h2>
                {(brand.description?.length ?? 0) > 0 && (
                    <p>Описание: {brand.description}</p>
                )}
            </div>

            <Button
                type="button"
                className="button_link"
                onClick={() => navigate('/')}
            >
                ← Вернуться к списку брендов
            </Button>

            <div className="model-filters">
                <button
                    type="button"
                    className={`chip ${filter === 'all' ? 'chip_active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    Все
                </button>
                <button
                    type="button"
                    className={`chip ${filter === 'unreserved' ? 'chip_active' : ''}`}
                    onClick={() => setFilter('unreserved')}
                >
                    Не зарезервированные
                </button>
                <button
                    type="button"
                    className={`chip ${filter === 'reserved' ? 'chip_active' : ''}`}
                    onClick={() => setFilter('reserved')}
                >
                    Зарезервированные
                </button>
            </div>

            <ModelForm
                onSubmit={(title, vin, description) =>
                    addModel(brandId, title, vin, description)
                }
            />

            <div className="models-list">
                {currentModels.map((model) => (
                    <ModelCard
                        key={model.id}
                        model={model}
                        onToggle={() => toggleModelReserve(brandId, model.id)}
                        onRemove={() => removeModel(brandId, model.id)}
                    />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalItems={totalItems}
                pageSize={BOOKS_PAGE_SIZE}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default ModelsPage;
