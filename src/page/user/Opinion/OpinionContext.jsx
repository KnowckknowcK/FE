import React, { createContext, useContext, useState } from 'react';

const OpinionContext = createContext(
    {
        opinion: null,
        setOpinion:() => {}
    }

);

export const useOpinion = () => useContext(OpinionContext);

export const OpinionProvider = ({ children }) => {
    const [opinion, setOpinion] = useState(null);
    return (
        <OpinionContext.Provider value={{ opinion, setOpinion }}>
            {children}
        </OpinionContext.Provider>
    );
};