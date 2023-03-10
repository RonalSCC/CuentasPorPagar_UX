import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from "@mui/material/styles";
import { SincoTheme } from "./Theme/SincoTheme";
import "./Estilos/index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/nunito/300.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import { Stack } from '@mui/material';
import { RoutesCuentasPorPagarElement } from './Aplicaciones/Route';
import { BrowserRouter, HashRouter, Outlet } from 'react-router-dom';
import './Theme/base.css';
import Loader from './Consumos/Loader';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={SincoTheme}>
      <Stack height="100%" width="100%">
        <HashRouter>
          <RoutesCuentasPorPagarElement />
        </HashRouter>
      </Stack>
      <Loader/>
    </ThemeProvider>
  </React.StrictMode>
);