import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';  // Fixed path
import Dashboard from './pages/Dashboard/Dashboard';
import PostsList from './pages/posts/PostsList';
import PostCreate from './pages/posts/PostCreate';
import PostEdit from './pages/posts/PostEdit';
import PagesList from './pages/pages/PagesList';
import PageCreate from './pages/pages/PageCreate';
import PageEdit from './pages/pages/PageEdit';
import MediaList from './pages/media/MediaList';
import MediaUpload from './pages/media/MediaUpload';
import MediaEdit from './pages/media/MediaEdit';
import Settings from './pages/settings/Settings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          {/* Posts Routes */}
            <Route path="/posts" element={<PostsList />} />
            <Route path="/posts/create" element={<PostCreate />} />
            <Route path="/posts/edit/:id" element={<PostEdit />} />

          {/* Posts Routes */}
            <Route path="/pages" element={<PagesList />} />
            <Route path="/pages/create" element={<PageCreate />} />
            <Route path="/pages/edit/:id" element={<PageEdit />} />


          {/* Media Routes */}
          <Route path="/media" element={<MediaList />} />
          <Route path="/media/upload" element={<MediaUpload />} />
          <Route path="/media/edit/:id" element={<MediaEdit />} />

          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;