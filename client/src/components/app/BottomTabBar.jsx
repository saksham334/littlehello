// BottomTabBar.jsx — the PHONE navigation, fixed to the bottom like the reference.
// No unread numbers or badges: nothing here should create pressure.
import { NavLink } from 'react-router';
import { APP_NAV_ITEMS } from './navItems.js';

export default function BottomTabBar() {
  return (
    <nav className="lh-tabbar d-md-none" aria-label="Main">
      <ul className="lh-tabbar__list">
        {APP_NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink to={item.to} className="lh-tabbar__link">
              <span className="lh-tabbar__icon">
                <i className={`bi ${item.icon}`} aria-hidden="true"></i>
              </span>
              <span className="lh-tabbar__label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}