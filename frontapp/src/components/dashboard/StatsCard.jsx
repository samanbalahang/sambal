import React from 'react';

// Import Lucide React icons for different stat types
import { 
  FileText, 
  File, 
  Users, 
  MessageCircle,
  TrendingUp,
  TrendingDown,
  Eye,
  Calendar
} from 'lucide-react';

const StatsCard = ({ title, value, icon, color, change, changeType, subtitle, onClick }) => {
  // Map icon names to actual components
  const iconMap = {
    'file-text': FileText,
    'file': File,
    'users': Users,
    'message-circle': MessageCircle,
    'eye': Eye,
    'calendar': Calendar
  };
  
  // Map color names to CSS classes
  const colorMap = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
    indigo: 'bg-indigo-100 text-indigo-600'
  };
  
  const IconComponent = iconMap[icon] || FileText;
  const colorClass = colorMap[color] || 'bg-gray-100 text-gray-600';

  return (
    <div 
      className={`stats-card ${onClick ? 'cursor-pointer hover:shadow-md' : ''}`}
      onClick={onClick}
    >
      <div className="stats-card-content">
        <div className="stats-card-header">
          <div className={`stats-icon ${colorClass}`}>
            <IconComponent size={20} />
          </div>
          <div className="stats-trend">
            {change && (
              <div className={`trend ${changeType === 'positive' ? 'positive' : 'negative'}`}>
                {changeType === 'positive' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{change}%</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="stats-card-body">
          <h3 className="stats-value">{value}</h3>
          <p className="stats-title">{title}</p>
          {subtitle && <p className="stats-subtitle">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;