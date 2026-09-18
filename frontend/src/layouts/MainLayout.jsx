import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "./MainLayout.css";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      <Navbar onMenuClick={toggleSidebar} />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      <main
        className={`main-content ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;