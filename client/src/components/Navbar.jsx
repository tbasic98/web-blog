import React, { useContext } from 'react'; //https://www.w3schools.com/react/default.asp
import Logo from "../assets/img/572.png";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
    const { currentUser , logout } = useContext(AuthContext);
    
    return (
        <div className='navbar'>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="logo" />
                    </Link>
                </div>
                <div className="links">
                    <Link className='link' to="/?cat=art">
                        <h6>ART</h6>
                    </Link>
                    <Link className='link' to="/?cat=science">
                        <h6>SCIENCE</h6>
                    </Link>
                    <Link className='link' to="/?cat=tehnology">
                        <h6>TEHNOLOGY</h6>
                    </Link>
                    <Link className='link' to="/?cat=design">
                        <h6>DESIGN</h6>
                    </Link>
                    <Link className='link' to="/?cat=food">
                        <h6>FOOD</h6>
                    </Link>
                    <span>{currentUser?.username}</span>
                    {currentUser ? <span onClick={logout}>Logout</span> : <Link className='link' to="/login">Login</Link>}
                    
                    <span className='write'> 
                        <Link className='link' to="/write-post">Write</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Navbar