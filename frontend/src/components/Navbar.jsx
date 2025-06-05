import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../hooks/useAuth";
import { getUserProfilePicture } from "../services/api";
import easyRecipesIcon from "../assets/easyRecipes-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";


const Navbar = () => {

    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state


    useEffect(() => {

        const fetchProfilePicture = async () => {
            const pic = await getUserProfilePicture();
            setProfilePicture(pic);
            setLoading(false); // Stop loading once image is fetched
        };

        fetchProfilePicture();
    }, []);

    const handleLogout = async () => {
        await logoutUser();
        toast.success("Logged out! See you soon", {position: "top-center"});
        navigate("/"); 
    };

    const [isLight, setIsLight] = useState(() => {
        return JSON.parse(localStorage.getItem("isLight")) ?? false;
    });
    
    useEffect(() => {
        localStorage.setItem("isLight", JSON.stringify(isLight));
    }, [isLight]);

    return (
        <nav className="navbar justify-between bg-base-300 p-4">
            {/* Logo */}
            <NavLink to="/profile" className="btn btn-ghost text-lg flex items-center gap-2">
                <img alt="Logo" src={easyRecipesIcon} className="w-8" />
                easyRecipes
            </NavLink>
            
            {/* Mobile Menu */}
            <div className="dropdown dropdown-end sm:hidden">

            <label className="swap swap-rotate">
                
                {/* this hidden checkbox controls the state */}
                <input 
                    type="checkbox" 
                    className="theme-controller" 
                    value="light" 
                    checked={isLight}
                    onChange={() => setIsLight(!isLight)}
                />

                {/* sun icon */}
                <svg
                  className="swap-off h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <path
                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-on h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <path
                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
            </label>

                <button className="btn btn-ghost">
                    <FontAwesomeIcon icon={faBars} className="text-lg" />
                </button>

                <ul tabIndex={0} className="dropdown-content menu z-[1] bg-base-200 p-4 rounded-box shadow w-64 gap-2">
                    <li><NavLink to="/my-recipes">My Recipes</NavLink></li>
                    <li><NavLink to="/feed">Feed</NavLink></li>
                    <li><NavLink to="/add-recipe">Add Recipe</NavLink></li>
                    <li>
                        <h2 className="menu-title"><NavLink to="/profile">Profile</NavLink></h2>
                        <ul>
                            <li><NavLink to="/profile">Shopping List</NavLink></li>
                            <li><NavLink to="/profile">Meal Plan</NavLink></li>
                            <li><NavLink to="/profile">Favourites</NavLink></li>
                        </ul>
                    </li>
                    <button onClick={handleLogout} className="btn btn-primary btn-sm">Logout</button>
                </ul>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex gap-2">
                <NavLink to="/my-recipes" className="btn btn-ghost btn-md">
                    My Recipes
                </NavLink>

                <NavLink to="/feed" className="btn btn-ghost btn-md">
                    Feed
                </NavLink>

                <NavLink to="/add-recipe" className="btn btn-ghost btn-md">
                    Add Recipe
                </NavLink>

            <label className="swap swap-rotate">
                
                {/* this hidden checkbox controls the state */}
                <input 
                    type="checkbox" 
                    className="theme-controller" 
                    value="light" 
                    checked={isLight}
                    onChange={() => setIsLight(!isLight)}
                />

                {/* sun icon */}
                <svg
                  className="swap-off h-10 w-10 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <path
                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-on h-10 w-10 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <path
                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
            </label>

                {/* Dropdown Profile Menu */}
                <div className="dropdown dropdown-end">
                    <button className="btn btn-ghost btn-md">
                        <div className="avatar">
                            <div className="w-8 rounded-full">
                                {loading ? ( 
                                    <FontAwesomeIcon icon={faCircleUser} size="2xl" />
                                ) : (
                                    <img src={profilePicture || <FontAwesomeIcon icon={faCircleUser} size="2xl" /> } alt="Profile picture"/>
                                )} 
                            </div>
                        </div>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>

                    <ul tabIndex={0} className="dropdown-content menu z-[1] bg-base-200 p-6 rounded-box shadow w-56 gap-2">
                        <li><NavLink to="/profile">Profile</NavLink></li>                        
                        <li><NavLink to="/profile">Shopping List</NavLink></li>
                        <li><NavLink to="/profile">Meal Plan</NavLink></li>
                        <li><NavLink to="/profile">Favourites</NavLink></li>               
                         <button onClick={handleLogout} className="btn btn-primary btn-sm">Logout</button>
                    </ul>
                </div>


            </div>
        </nav>
    );
};

export default Navbar;
