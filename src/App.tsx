import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Disandro from './pages/Disandro';
import Academics from './pages/Academics';
import Library from './pages/Library';
import Activities from './pages/Activities';
import Publications from './pages/Publications';
import News from './pages/News';
import AdminDashboard from './pages/admin/Dashboard';
import AdminAcademics from './pages/admin/Academics';
import AdminBooks from './pages/admin/Books';
import AdminActivities from './pages/admin/Activities';
import AdminPublications from './pages/admin/Publications';
import AdminNews from './pages/admin/News';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="disandro/*" element={<Disandro />} />
          <Route path="academics" element={<Academics />} />
          <Route path="library" element={<Library />} />
          <Route path="activities" element={<Activities />} />
          <Route path="publications" element={<Publications />} />
          <Route path="news" element={<News />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="academics" element={<AdminAcademics />} />
          <Route path="books" element={<AdminBooks />} />
          <Route path="activities" element={<AdminActivities />} />
          <Route path="publications" element={<AdminPublications />} />
          <Route path="news" element={<AdminNews />} />
        </Route>
      </Routes>
    </Router>
  );
}