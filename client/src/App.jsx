// App.jsx — the map of URLs to pages.
//   PublicLayout → navbar + footer (landing, style guide, login, register)
//   AppLayout    → sidebar / rail / tab bar (logged-in app pages)
import { Routes, Route } from 'react-router';
import PublicLayout from './layouts/PublicLayout.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import GuestRoute from './components/routing/GuestRoute.jsx';
import ProtectedRoute from './components/routing/ProtectedRoute.jsx';
import LogoutButton from './components/auth/LogoutButton.jsx';
import HomePage from './pages/HomePage.jsx';
import StyleGuidePage from './pages/StyleGuidePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ComingSoonPage from './pages/ComingSoonPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      {/* ---- Public website ---- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/styleguide" element={<StyleGuidePage />} />

        <Route element={<GuestRoute />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* ---- Logged-in app: guard first, then the app frame ---- */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/discover" element={<ComingSoonPage title="Discover is coming soon" />} />
          <Route path="/hellos" element={<ComingSoonPage title="Hellos are coming soon" />} />
          <Route path="/messages" element={<ComingSoonPage title="Messages are coming soon" />} />
          <Route path="/profile" element={<ComingSoonPage title="Your profile is coming soon" />} />
          <Route
            path="/settings"
            element={
              <ComingSoonPage title="Settings are coming soon">
                <LogoutButton />
              </ComingSoonPage>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}