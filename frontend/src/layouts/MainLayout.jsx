import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import "./MainLayout.css"


function MainLayout(){
    const [sidebarOpen, setrSidebarOpen] = useState(true);

    const toggleSidebar = ()=>{
        setrSidebarOpen((prev) => !prev);
    }

    const closeSidebar = ()=>{
        setrSidebarOpen(false)
    }

    return (
        <div className="app-layout">
            <Navbar onMenuClick={toggleSidebar} />
            
            <Sidebar
            isOpen={sidebarOpen}
            OnClose={closeSidebar}
            />

            <main 
            className= {`main-content ${sidebarOpen? "sidebar-open" : "sidebar-closed"}`} >
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;