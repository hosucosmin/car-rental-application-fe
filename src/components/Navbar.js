import React from "react";
import {Link} from 'react-router-dom'


function Navbar() {
    return (
    <div className="navbar">
        <div className='navbar-logo' >
            Rent A Car
        </div>
        <ul className='navbar-menu'>
            <li><Link to="/rents">Rents</Link></li>
            <li><Link to="/car">Cars</Link></li>
            <li><Link to="/driver">Drivers</Link></li>
        </ul>
    </div>)
    
}
export default Navbar