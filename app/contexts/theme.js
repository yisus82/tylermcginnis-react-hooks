import React from 'react';

const ThemeContext = React.createContext(undefined);

export default ThemeContext;
export const ThemeConsumer = ThemeContext.Consumer;
export const ThemeProvider = ThemeContext.Provider;
