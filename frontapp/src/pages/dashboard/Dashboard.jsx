import { useState, useEffect } from 'react';
import StatsCard from '../../components/dashboard/StatsCard';
import RecentActivity from '../../components/dashboard/RecentActivity';


const Dashboard = () => {
  const [stats, setStats] = useState({
    posts: 0,
    pages: 0,
    users: 0,
    comments: 0
  });

  useEffect(() => {
    // Fetch dashboard stats from Django API
    const fetchStats = async () => {
      try {
        // This would be replaced with actual API calls
        const mockStats = {
          posts: 24,
          pages: 8,
          users: 156,
          comments: 42
        };
        setStats(mockStats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <StatsCard 
          title="Total Posts" 
          value={stats.posts} 
          icon="file-text" 
          color="blue" 
        />
        <StatsCard 
          title="Total Pages" 
          value={stats.pages} 
          icon="file" 
          color="green" 
        />
        <StatsCard 
          title="Users" 
          value={stats.users} 
          icon="users" 
          color="purple" 
        />
        <StatsCard 
          title="Comments" 
          value={stats.comments} 
          icon="message-circle" 
          color="orange" 
        />
      </div>
      
      <div className="dashboard-content">
        <RecentActivity />
        <div className="dashboard-widget">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <button className="action-btn">Add New Post</button>
            <button className="action-btn">Add New Page</button>
            <button className="action-btn">Manage Media</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;