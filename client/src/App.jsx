// App.jsx — the map of URLs to pages.
import { Routes, Route } from 'react-router';
import PublicLayout from './layouts/PublicLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import StyleGuidePage from './pages/StyleGuidePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/styleguide" element={<StyleGuidePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}