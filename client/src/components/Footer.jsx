import React from 'react';
import Logo from "../assets/img/572.png";

// komponenta za naš footer
const Footer = () => {
  return (
    <footer>
        <img src={Logo} alt="logo" />
        <span>Web programming © 2023 </span>
    </footer>
  )
}

export default Footer