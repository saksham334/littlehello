// main.jsx — the frontend entry point. Runs once when the page loads.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

// CSS ORDER MATTERS: Bootstrap first, then our styles, so ours win ties.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './styles/tokens.css';
import './styles/base.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  // StrictMode adds extra development-only checks (e.g. double-running effects)
  // to surface bugs early. It has no effect in production.
  <StrictMode>
    {/* BrowserRouter enables real URLs like /discover and /messages/123 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);