import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import Login from './pages/admin/Login';
import Home from './pages/Home';
import About from './pages/About';
import Disandro from './pages/Disandro/Disandro';
import Academics from './pages/Academics/Academics';
import Library from './pages/Library';
import Activities from './pages/Activities';
import Publications from './pages/Publications';
import News from './pages/News/News';
import AdminDashboard from './pages/admin/Dashboard';
import AdminAcademics from './pages/admin/Academics';
import AdminBooks from './pages/admin/Books';
import AdminActivities from './pages/admin/Activities';
import AdminPublications from './pages/admin/Publications';
import AdminNews from './pages/admin/News';
import PrivateRoute from './routes/privateRoute';
import Morra from './pages/Morra/Morra';
import NewsDetail from './pages/News/NewDetail';
import AcademicDetail from './pages/Academics/AcademicsDetail';
import NotFoundPage from './pages/NotFoundPage';
import BooksPage from './pages/Publications/BooksPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="disandro/*" element={<Disandro />} />
          <Route path="morra/*" element={<Morra />} />
          <Route path="academics" element={<Academics />} />
          <Route path="academics/:id" element={<AcademicDetail />} />
          <Route path="library" element={<Library />} />
          <Route path="activities" element={<Activities />} />
          <Route path="publications" element={<BooksPage />} />
          <Route path="news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Rutas privadas */}
        <Route
          path="/admin/" // Asegúrate de que todo bajo /admin esté protegido
          element={<PrivateRoute element={<AdminLayout />} />} // Protege el AdminLayout completo
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/academics" element={<AdminAcademics />} />
          <Route path="/admin/books" element={<AdminBooks />} />
          <Route path="/admin/activities" element={<AdminActivities />} />
          <Route path="/admin/publications" element={<AdminPublications />} />
          <Route path="/admin/news" element={<AdminNews />} />
        </Route>
        
      </Routes>
    </Router>
  );
}
