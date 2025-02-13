import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../hooks/useAuth";
import easyRecipesIcon from "../assets/easyRecipes-icon.png";

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        navigate("/"); 
    };
    

    return (
        <nav className="navbar justify-between bg-base-300 p-4">
            {/* Logo */}
            <NavLink to="/" className="btn btn-ghost text-lg flex items-center gap-2">
                <img alt="Logo" src={easyRecipesIcon} className="w-10" />
                easyRecipes
            </NavLink>

            {/* Mobile Menu */}
            <div className="dropdown dropdown-end sm:hidden">
                <button className="btn btn-ghost">
                    <i className="fa-solid fa-bars text-lg"></i>
                </button>

                <ul tabIndex={0} className="dropdown-content menu z-[1] bg-base-200 p-4 rounded-box shadow w-64 gap-2">
                    <li><NavLink to="/profile">Profile</NavLink></li>
                    <li><NavLink to="/profile">Profile2</NavLink></li>
                    <li>
                        <h2 className="menu-title">Features</h2>
                        <ul>
                            <li><NavLink to="/profile">Profile3</NavLink></li>
                            <li><NavLink to="/profile">Profile3</NavLink></li>
                            <li><NavLink to="/profile">Profile3</NavLink></li>
                        </ul>
                    </li>
                    <NavLink to="/profile" className="btn btn-primary btn-sm">
                        <i className="fa-solid fa-rocket"></i>
                        Profile4
                    </NavLink>
                </ul>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex gap-2">
                <NavLink to="/profile" className="btn btn-ghost btn-sm">
                    <i className="fa-solid fa-circle-info text-secondary"></i>
                    Profile
                </NavLink>

                <NavLink to="/profile" className="btn btn-ghost btn-sm">
                    <i className="fa-solid fa-users text-secondary"></i>
                    Profile
                </NavLink>

                {/* Dropdown Menu */}
                <div className="dropdown dropdown-end">
                    <button className="btn btn-ghost btn-sm">
                        <i className="fa-solid fa-fire text-secondary"></i>
                        Features
                        <i className="fa-solid fa-chevron-down"></i>
                    </button>

                    <ul tabIndex={0} className="dropdown-content menu z-[1] bg-base-200 p-6 rounded-box shadow w-56 gap-2">
                        <li><NavLink to="/profile">Profile</NavLink></li>
                        <li><NavLink to="/profile">Profile</NavLink></li>
                        <li><NavLink to="/profile">Profile</NavLink></li>
                    </ul>
                </div>

                <button onClick={handleLogout} className="btn btn-primary btn-sm">Logout</button>

                {/* <NavLink to="/profile" className="btn btn-primary btn-sm">
                    <i className="fa-solid fa-rocket"></i>
                    Profile
                </NavLink> */}
            </div>
        </nav>
    );
};

export default Navbar;
