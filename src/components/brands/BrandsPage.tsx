import React from 'react';
import BrandsList from './BrandsList';
import BrandForm from './BrandForm';
import { useBrands } from '../../hooks/useBrands';
import Pagination from '../ui/Pagination.tsx';

const COLLECTIONS_PAGE_SIZE = 10;

const BrandsPage: React.FC = () => {
    const { brands, addBrand, removeBrand } = useBrands();

    const [currentPage, setCurrentPage] = React.useState(1);

    const totalItems = brands.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / COLLECTIONS_PAGE_SIZE));

    React.useEffect(() => {
        setCurrentPage((prev) => {
            if (prev > totalPages) {
                return totalPages;
            }
            if (prev < 1) {
                return 1;
            }
            return prev;
        });
    }, [totalPages]);

    const startIndex = (currentPage - 1) * COLLECTIONS_PAGE_SIZE;
    const currentBrands = brands.slice(
        startIndex,
        startIndex + COLLECTIONS_PAGE_SIZE
    );

    return (
        <div className="brands-page">
            <div className="brands-header">
                <h2>Автомобильные бренды</h2>
            </div>

            <BrandForm
                onSubmit={(title, description) => addBrand(title, description)}
            />

            <BrandsList
                brands={currentBrands}
                onRemove={removeBrand}
            />

            <Pagination
                currentPage={currentPage}
                totalItems={totalItems}
                pageSize={COLLECTIONS_PAGE_SIZE}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default BrandsPage;
