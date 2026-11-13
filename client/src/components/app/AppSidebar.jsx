// AppSidebar.jsx — left navigation for tablets (icon rail) and laptops (full sidebar).
// Hidden on phones (d-none d-md-flex): phones use the top bar + bottom tab bar instead.
import { Link, NavLink } from 'react-router';
import Logo from '../brand/Logo.jsx';
import Doodle from '../brand/Doodle.jsx';
import LogoutButton from '../auth/LogoutButton.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { APP_NAV_ITEMS, SETTINGS_ITEM } from './navItems.js';

// NavLink adds class="active" and aria-current="page" when its address is the current page.
function SidebarLink({ item }) {
  return (
    <NavLink to={item.to} className="lh-sidebar__link">
      <i className={`bi ${item.icon}`} aria-hidden="true"></i>
      <span className="lh-sidebar__label">{item.label}</span>
    </NavLink>
  );
}

export default function AppSidebar() {
  const { user } = useAuth();

  return (
    <div className="lh-sidebar d-none d-md-flex">
      <div className="lh-sidebar__brand">
        {/* Laptops: the full logo.  Tablets: just the flower, to fit the slim rail. */}
        <Logo to="/discover" size="sm" className="d-none d-xl-inline-flex" />
        <Link to="/discover" className="lh-sidebar__mark d-xl-none">
          <Doodle name="flower" size={34} />
          <span className="visually-hidden">LittleHello: go to Discover</span>
        </Link>
      </div>

      <nav className="lh-sidebar__nav" aria-label="Main">
        <ul>
          {APP_NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <SidebarLink item={item} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="lh-sidebar__footer">
        <SidebarLink item={SETTINGS_ITEM} />
        <p className="lh-sidebar__user d-none d-xl-block">
          Logged in as <strong>{user.username}</strong>
        </p>
        <LogoutButton className="lh-sidebar__link">
          <i className="bi bi-box-arrow-right" aria-hidden="true"></i>
          <span className="lh-sidebar__label">Log out</span>
        </LogoutButton>
      </div>
    </div>
  );
}