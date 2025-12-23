import React, { createContext, useState, useEffect, useContext } from 'react';

const QuotesContext = createContext();

export const useQuotes = () => {
    return useContext(QuotesContext);
};

export const QuotesProvider = ({ children }) => {
    const [quotes, setQuotes] = useState(() => {
        const stored = localStorage.getItem('cotizaciones');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem('cotizaciones', JSON.stringify(quotes));
    }, [quotes]);

    const addQuote = (quote) => {
        setQuotes((prev) => [...prev, quote]);
    };

    const removeQuote = (index) => {
        setQuotes((prev) => prev.filter((_, i) => i !== index));
    };

    const clearQuotes = () => {
        setQuotes([]);
        localStorage.removeItem('cotizaciones');
    };

    return (
        <QuotesContext.Provider value={{ quotes, addQuote, removeQuote, clearQuotes }}>
            {children}
        </QuotesContext.Provider>
    );
};
