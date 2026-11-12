// App.jsx — the map of URLs to pages.
//   GuestRoute     → only for logged-out visitors (login, register)
//   ProtectedRoute → only for logged-in members (the app pages)
import { Routes, Route } from 'react-router';
import PublicLayout from './layouts/PublicLayout.jsx';
import GuestRoute from './components/routing/GuestRoute.jsx';
import ProtectedRoute from './components/routing/ProtectedRoute.jsx';
import HomePage from './pages/HomePage.jsx';
import StyleGuidePage from './pages/StyleGuidePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ComingSoonPage from './pages/ComingSoonPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        {/* Everyone */}
        <Route path="/" element={<HomePage />} />
        <Route path="/styleguide" element={<StyleGuidePage />} />

        {/* Logged-out visitors only */}
        <Route element={<GuestRoute />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Logged-in members only (Part 7D moves these into the app layout) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/discover" element={<ComingSoonPage title="Discover is coming soon" />} />
          <Route path="/hellos" element={<ComingSoonPage title="Hellos are coming soon" />} />
          <Route path="/messages" element={<ComingSoonPage title="Messages are coming soon" />} />
          <Route path="/profile" element={<ComingSoonPage title="Your profile is coming soon" />} />
          <Route path="/settings" element={<ComingSoonPage title="Settings are coming soon" />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}