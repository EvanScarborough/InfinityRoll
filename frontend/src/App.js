import React from 'react';
import Navbar from './components/navigation/Navbar';
import styled, {ThemeProvider} from 'styled-components';


var theme = {
  main: "#16b897",
  highlight: "#b813d1",
  highlight_dark: "#7d078f",
  mainoverlay: "white"
};


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
    </ThemeProvider>
  );
}