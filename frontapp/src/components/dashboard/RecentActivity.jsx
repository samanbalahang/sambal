import React, { useState, useEffect } from 'react';
import { 
  Edit, 
  FileText, 
  UserPlus, 
  Calendar,
  Clock,
  ArrowRight,
  MoreVertical
} from 'lucide-react';

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchActivities = async () => {
      try {
        // In a real app, this would be an API call to your Django backend
        setTimeout(() => {
          const mockActivities = [
            {
              id: 1,
              type: 'post_created',
              title: 'New blog post created',
              description: '"Getting Started with React" was created',
              user: 'Admin User',
              time: '2 hours ago',
              icon: FileText,
              color: 'text-blue-600',
              bgColor: 'bg-blue-100'
            },
            {
              id: 2,
              type: 'post_updated',
              title: 'Post updated',
              description: '"Django REST Framework Guide" was updated',
              user: 'Content Editor',
              time: '5 hours ago',
              icon: Edit,
              color: 'text-green-600',
              bgColor: 'bg-green-100'
            },
            {
              id: 3,
              type: 'user_registered',
              title: 'New user registered',
              description: 'John Doe joined the platform',
              user: 'System',
              time: 'Yesterday',
              icon: UserPlus,
              color: 'text-purple-600',
              bgColor: 'bg-purple-100'
            },
            {
              id: 4,
              type: 'post_published',
              title: 'Post published',
              description: '"Introduction to Python" was published',
              user: 'Admin User',
              time: '2 days ago',
              icon: FileText,
              color: 'text-orange-600',
              bgColor: 'bg-orange-100'
            }
          ];
          setActivities(mockActivities);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getActivityIcon = (activity) => {
    const Icon = activity.icon || FileText;
    return <Icon size={16} />;
  };

  if (loading) {
    return (
      <div className="recent-activity">
        <div className="activity-header">
          <h2>Recent Activity</h2>
        </div>
        <div className="loading-activities">
          {[1, 2, 3, 4].map(item => (
            <div key={item} className="activity-item loading">
              <div className="activity-icon shimmer"></div>
              <div className="activity-content">
                <div className="shimmer title"></div>
                <div className="shimmer description"></div>
                <div className="activity-meta">
                  <div className="shimmer meta"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="recent-activity">
      <div className="activity-header">
        <h2>Recent Activity</h2>
        <button className="view-all-btn">
          View All <ArrowRight size={14} />
        </button>
      </div>
      
      <div className="activity-list">
        {activities.map(activity => (
          <div key={activity.id} className="activity-item">
            <div className={`activity-icon ${activity.bgColor} ${activity.color}`}>
              {getActivityIcon(activity)}
            </div>
            
            <div className="activity-content">
              <h3 className="activity-title">{activity.title}</h3>
              <p className="activity-description">{activity.description}</p>
              
              <div className="activity-meta">
                <span className="activity-user">
                  <UserPlus size={12} /> {activity.user}
                </span>
                <span className="activity-time">
                  <Clock size={12} /> {activity.time}
                </span>
              </div>
            </div>
            
            <button className="activity-more">
              <MoreVertical size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;