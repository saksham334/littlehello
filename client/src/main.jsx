// main.jsx — the frontend entry point. Runs once when the page loads.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

// Self-hosted fonts (Fontsource): bundled with the site, no request to Google.
import '@fontsource-variable/caveat';
import '@fontsource-variable/nunito';
import '@fontsource-variable/quicksand';

// CSS ORDER MATTERS: Bootstrap first, then ours, so ours win ties.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/layout.css'; // NEW in Milestone 4

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);