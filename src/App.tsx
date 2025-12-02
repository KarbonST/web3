import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrandsProvider } from './context/BrandsProvider';
import { ThemeProvider } from './context/ThemeProvider';
import { Layout } from './components/layout/Layout';
import BrandsPage from './components/brands/BrandsPage';
import ModelsPage from './components/models/ModelsPage';
import EditBrandPage from './components/brands/EditBrandPage';
import EditModelPage from './components/models/EditModelPage.tsx';

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <BrandsProvider>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<BrandsPage />} />
                            <Route path="/brands/:id" element={<ModelsPage />} />
                            <Route path="/brands/:id/edit" element={<EditBrandPage />} />
                            <Route path="/brands/:brandId/models/:modelId/edit" element={<EditModelPage />} />
                            <Route path="*" element={<div>Страница не найдена</div>} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </BrandsProvider>
        </ThemeProvider>
    );
};

export default App;
