import React from 'react';
import { Link } from 'react-router-dom';
import behanceIcon from './../images/icon/behance-brands.svg'
import LinkInIcon from './../images/icon/linkedin.svg'
import logo from './../images/logo.png'

const Nav = () => {
  return (
    <div className='nav-container'>
        <header>
            <a href="index.html" class="logo"><img src={logo} alt="logo" /></a>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/pixelimageAPI">PixelImageAPI</Link></li>
                    {/* <li><Link to="/about">About</Link></li>
                    <li><Link to="/parking">Parking</Link></li>
                    <li><Link to="/guessnum">GuessNumberGame</Link></li>
                    <li><Link to="/threeD">threeD</Link></li> */}
                    <li><Link to="/JapaneseCard">JapaneseCard</Link></li>
                </ul>
            </nav>
        </header>
        <div class="social-header">
            <ul>
            <li><a href="https://www.behance.net/yiiyeawang" target="_black"><img src={behanceIcon} alt="behance" /></a></li>
            <li><a href="http://www.linkedin.com/in/yiiyeawang" target="_black"><img src={LinkInIcon}alt="linkin" /></a></li>
            </ul>
        </div>
    </div>
  )
}

export default Nav;