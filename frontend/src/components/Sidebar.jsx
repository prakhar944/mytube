import { NavLink } from "react-router-dom";
import {
    Home,
    Video,
    ThumbsUp,
    MessageSquare,
    History,
    FileText,
    ListVideo,
    Bell,
    BarChart3,
    Upload,
    Heart,
    Stethoscope,
    HomeIcon,
} from "lucide-react"
import "./Sidebar.css"

function Sidebar({isOpen,OnClose}){
    const mainItems = [
        {
            name: "Home",
            path: "/",
            icon: Home,
        },
        {
            name: "Videos",
            path: "/videos",
            icon: Video,
        },
    ];

    const activityItems = [
        {
            name: "Liked Videos",
            path: "/liked-videos",
            icon: ThumbsUp,
        },
        {
            name: "Comments",
            path: "/comments",
            icon: MessageSquare,
        },
        {
            name: "History",
            path: "/history",
            icon: History,
        },
        {
            name: "Tweets",
            path: "/tweets",
            icon: FileText,
        },
        {
            name: "Subscriptions",
            path: "/subscriptions",
            icon: Bell,
        },
    ];

    const creatorItems = [
        {
            name:"Dashboard",
            path:"/dasboard",
            icon: BarChart3,
        },
        {
            name:"My Videos",
            path:"/my-videos",
            icon: Upload,
        },
    ];

    const backendItems = [
        {
            name:"Likes",
            path:"/dev/likes",
            icon: Heart,
        },
        {
            name:"Comments",
            path:"/dev/comments",
            icon: MessageSquare,
        },
        {
            name:"Tweets",
            path:"/dev/tweets",
            icon: FileText,
        },
        {
            name:"Subscriptions",
            path:"/dev/subscriptions",
            icon: Bell,
        },
        {
            name:"Health Check",
            path:"/health",
            icon: Stethoscope,
        },
    ];

    const renderItems = (items) => {
        return items.map((item) => {
            const Iccon = item.icon;

            return (
                <NavLink 
                key={item.name}
                to={item.path}
                className={ ({isActive}) => `sidebar-item ${isActive ? " active": ""}`
            }
            onClick={ () => {
                if(window.innerWidth <= 768){
                    onClose();
                }
            }}
            >
                <Icon 
                size = {24}
                strokeWidth= {1.9} />

                <span className=" sidebar-item-text">
                    {item.name}
                </span>
            </NavLink>
            );
        });
    };


    return(
        <>
        {/* Mobile Overlay */}
        <div 
        className={`sidebar-overlay ${isOpen ? "show" : ""}` } 
        onClick = {onClose}
        />

        <aside 
        className={`sidebar ${ isOpen ? "open" : "collapsed"}`} >

            <div 
            className="sidebar-mobile-header">
                <span>Menu</span>

                <button 
                className="sidebar-close-btn"
                onClick={onClose}
                aria-label="Close Sidebar"
                >
                    < X size={23} />
                </button>
            </div>

            <section
            className="sidebar-section">
                <nav>
                    {renderItems(mainItems)}
                </nav>
            </section>

            <div
            className="sidebar-divider" />

            <section
            className="sidebar-section">
                <h3
                className="sidebar-heading">You</h3>

                <nav>{renderItems(activityItems)}</nav>
            </section>

            <div
            className="sidebar-divider"></div>

           <section
            className="sidebar-section">
                <h3
                className="sidebar-heading">Creator</h3>

                <nav>{renderItems(creatorItems)}</nav>
            </section>

            <div
            className="sidebar-divider"></div>

           <section
            className="sidebar-section">
                <h3
                className="sidebar-heading">Backend</h3>

                <nav>{renderItems(backendItems)}</nav>
            </section>

        </aside>
        </>
    )

}

export default Sidebar;