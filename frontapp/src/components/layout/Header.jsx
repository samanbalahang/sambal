import { Menu, User, Bell, Search } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <Menu size={20} />
        </button>
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="header-right">
        <button className="icon-btn">
          <Bell size={18} />
        </button>
        <div className="user-profile">
          <User size={18} />
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;