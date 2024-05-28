// StompContext.js
import { createContext, useContext } from 'react';

const StompContext = createContext(null);

export const useStomp = () => useContext(StompContext);

export default StompContext;
