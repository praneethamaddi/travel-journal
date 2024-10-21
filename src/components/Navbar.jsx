import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/6.jpg'; // Adjust the path to your logo image
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear local storage to delete all stored data
        localStorage.clear();
        // Redirect to the logout or goodbye page
        navigate('/logout'); // Change this to a dedicated logout page if you have one
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <img src={logo} alt="Logo" className="logo" /> {/* Display the logo */}
            </div>
            <ul>
                <li><Link to="/dashboard">Home</Link></li>
                <li><Link to="/stories">Stories</Link></li>
                <li><Link to="/community">Community</Link></li>
                <li><Link to="/wallets">Wallets</Link></li>
                <li><Link to="/messages">Messages</Link></li>
                <li>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
