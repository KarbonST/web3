import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle: React.FC = () => {
    const { theme, toggle } = useTheme();

    return (
        <button
            type="button"
            className={`theme-toggle theme-toggle_${theme}`}
            onClick={toggle}
            aria-label="Переключить тему"
        >
            <span className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden>
                ☀️
            </span>
            <span className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden>
                🌙
            </span>
            <span className="theme-toggle__thumb" />
        </button>
    );
};

export default ThemeToggle;
