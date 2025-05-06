import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Sidebar from './components/sidebar/Sidebar';
import Admins from './pages/administration/Admins';
import Dai from './pages/dai/Dai';
import {Layout} from 'antd';
import ScrollToTop from './components/scroll/ScrollToTop';

const App = () => (
  <Router>
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout style={{ padding: '0 24px 24px', marginLeft: '200px' }}>
      <ScrollToTop />
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/administrators" element={<Admins />} />
          <Route path="/uzkomnazorats" element={<Dai />} />
          <Route path="/migrations" element={<Admins />} />
          <Route path="/regions" element={<Admins />} />
          <Route path="/roles" element={<Admins />} />
          <Route path="/sources" element={<Admins />} />
          <Route path="/subjects" element={<Admins />} />
          <Route path="/organizations" element={<Admins />} />
          <Route path="/resolutions" element={<Admins />} />
          <Route path="/response-letters" element={<Admins />} />
          <Route path="/ticket-types" element={<Admins />} />
          <Route path="/shapes" element={<Admins />} />
          <Route path="/results" element={<Admins />} />
          <Route path="/reprisals" element={<Admins />} />
          <Route path="/references" element={<Admins />} />
          <Route path="/references_mobile" element={<Admins />} />
          <Route path="/operators" element={<Admins />} />
          <Route path="/operator-groups" element={<Admins />} />
          <Route path="/executors" element={<Admins />} />
          <Route path="/executor-groups" element={<Admins />} />
          <Route path="/addresses" element={<Admins />} />
          <Route path="/users" element={<Admins />} />
          <Route path="/languages" element={<Admins />} />
        </Routes>
      </Layout>
    </Layout>
  </Router>
);

export default App;