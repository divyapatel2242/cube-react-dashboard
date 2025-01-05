import React from 'react';
import styled from "styled-components";
import "./style.css";
import AppRoutes from "./Routes";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";


const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [theme, colorMode] = useMode();
    return (
    <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppContainer>
                <AppRoutes />
                </AppContainer>
            </ThemeProvider>
        </ColorModeContext.Provider>
    
    );
  }
export default App;
