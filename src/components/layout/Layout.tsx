import React from 'react';
import ThemeToggle from './ThemeToggle';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="app-root">
            <header className="app-header">
                <h1>Автомобильные бренды</h1>
                <ThemeToggle />
            </header>
            <main className="app-main">{children}</main>
        </div>
    );
};
