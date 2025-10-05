import { 
  LayoutDashboard, 
  FileText, 
  File, 
  Image, 
  Settings,
  X 
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Posts', path: '/posts' },
    { icon: File, label: 'Pages', path: '/pages' },
    { icon: Image, label: 'Media', path: '/media' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className='sidebar-parent w-90/100 fixed bottom-3 rounded-full shadow-xl shadow-Byzantium/30 text-Lavender z-3 bg-Eggplant left-[50%] translate-x-[-50%]'>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header absolute -top-10 flex justify-center items-center -right-0 w-fit bg-Lavender rounded-full p-2">
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <nav className="sidebar-nav flex justify-between p-0!">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a 
                key={index} 
                href={item.path}
                className="nav-item flex flex-col justify-center items-center"
                onClick={() => setIsOpen(false)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}
    </div>
  );
};

export default Sidebar;