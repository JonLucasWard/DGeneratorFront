import * as React from 'react';
import { Link } from 'react-router-dom';

const NavComponent = () => {
    return (
        <div>
            <nav>
                <div>
                    <ul>
                        <li>
                            <Link to="/Quick_Tools">QuickTools</Link>
                        </li>
                        <li>
                            <Link to="/Details">Details</Link>
                        </li>
                        <li>
                            <Link to="/Upload">Upload</Link>
                        </li>
                        <li>
                            <Link to="/Maps">Maps</Link>
                        </li>
                        <li>
                            <Link to="/Encounters">Encounters</Link>
                        </li>
                        <li>
                            <Link to="/About">About</Link>
                        </li>
                        <li>
                            <Link to="/World_Building">World Building</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavComponent;