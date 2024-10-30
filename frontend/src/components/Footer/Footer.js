import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRegistered} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <footer className="footer" style={{
            background: '#003d59',
            color:'#ccc',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <b>&copy; {new Date().getFullYear()} Silviu Brailovschi <FontAwesomeIcon icon={faRegistered} /></b>
        </footer>
    );
};

export default Footer;
