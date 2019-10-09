import React from 'react';

const { Consumer, Provider } = React.createContext({
  theme: undefined,
  toggleTheme: undefined,
});

export const ThemeConsumer = Consumer;
export const ThemeProvider = Provider;
