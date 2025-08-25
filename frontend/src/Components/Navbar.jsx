import React from 'react';
import imgUrl from '../assets/Urvann.jpeg';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

export default function Navbar() {
    const navLinkStyles = {
        color: 'white',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    };
    return (
        <div className='flex justify-between items-center p-4 bg-amber-400'>
            <div className='logo bg-amber-400'>
                <img src={imgUrl} className="logo bg-black" alt="Vite logo" />
            </div>
            <div className='nav-links flex gap-6'>
                <Link
                    component={RouterLink}
                    to="/"
                    sx={navLinkStyles}
                >
                    Home
                </Link>
                <Link
                    component={RouterLink}
                    to="/add-plant"
                    sx={navLinkStyles}
                >
                    Add Plant
                </Link>
            </div>
        </div>
    );
}
