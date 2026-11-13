// AppTopBar.jsx — the slim top bar on PHONES ONLY: logo + settings gear,
// like the reference's top corner. Hidden from 768px (the sidebar takes over).
import { NavLink } from 'react-router';
import Logo from '../brand/Logo.jsx';
import { SETTINGS_ITEM } from './navItems.js';

export default function AppTopBar() {
  return (
    <header className="lh-topbar d-md-none">
      <Logo to="/discover" size="sm" />
      <NavLink to={SETTINGS_ITEM.to} className="lh-topbar__icon">
        <i className={`bi ${SETTINGS_ITEM.icon}`} aria-hidden="true"></i>
        <span className="visually-hidden">{SETTINGS_ITEM.label}</span>
      </NavLink>
    </header>
  );
}