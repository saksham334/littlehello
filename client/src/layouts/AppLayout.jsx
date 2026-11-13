// AppLayout.jsx — the frame for logged-in app pages.
//   Phones:  top bar + page + bottom tab bar
//   Tablets: icon rail | page
//   Laptops: sidebar   | page
import { Outlet } from 'react-router';
import AppSidebar from '../components/app/AppSidebar.jsx';
import AppTopBar from '../components/app/AppTopBar.jsx';
import BottomTabBar from '../components/app/BottomTabBar.jsx';
import { useScrollOnNavigate } from '../hooks/useScrollOnNavigate.js';
import '../styles/app.css';

export default function AppLayout() {
  useScrollOnNavigate();

  return (
    <div className="lh-app">
      <a href="#main" className="lh-skip-link">
        Skip to main content
      </a>

      <AppSidebar />

      <div className="lh-app__body">
        <AppTopBar />
        <div id="main" className="lh-app__main" tabIndex={-1}>
          <Outlet />
        </div>
      </div>

      <BottomTabBar />
    </div>
  );
}