import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./public-pages/HomePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import AdminDashboardPage from "./admin/pages/AdminDashboardPage";
import AdminProjectsPage from "./admin/pages/AdminProjectsPage";
import AdminProfilePage from "./admin/pages/AdminProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/projects" element={<AdminProjectsPage />} />
        <Route path="/admin/profile" element={<AdminProfilePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;