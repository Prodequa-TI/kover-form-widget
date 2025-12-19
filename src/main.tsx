import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { InsurancesType } from './mocks/summary.mock.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App storeToken='691c8caf6d186e46500cbc3e' insuranceType={InsurancesType.AUTO_INSURANCE} />
    </StrictMode>
);
