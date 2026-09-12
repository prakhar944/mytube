import { Link } from "react-router-dom";
import { Search, UserCircle, Menu } from "lucide-react"
import"./Navbar.css"


function Navbar({onMenuClick}){
    return(
        <header className="navbar">
            <div className="navbar-left">
                <button className="menu-btn" onClick={onMenuClick}>
                    <Menu size={25} />
                </button>
                <Link to="/" className="logo">
                    <span className="logo-icon">ℳ</span>
                    <span className="logo-text">MyTube</span>
                </Link>
            </div>

            <div className="search-container">
                <input 
                    type="text"
                    placeholder="search"
                    className="search-input"
                    />
                    <button className="search-btn">
                        <Search size={22} />
                    </button>
            </div>

            <div className="navbar-right">
                <Link to="/login" className="login-btn">
                    <UserCircle size={23} />
                    <span>Login</span>
                </Link>
            </div>
        </header>
    )
}

export default Navbar;