// App.jsx — the map of URLs to pages.
import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import StyleGuidePage from './pages/StyleGuidePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/styleguide" element={<StyleGuidePage />} />
      {/* "*" matches anything not matched above, so it must stay LAST */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}