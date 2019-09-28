import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const Navbar = ({ user }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
            <Link className="navbar-brand font-weigh-bold" to="/movies">
                <FontAwesome name="film" size="2x" spin />
            </Link>
            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button> */}
            <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                <div >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/movies">Movies</NavLink>
                        </li>
                        {(user && user.isAdmin) ?
                            (<li className="nav-item"><NavLink className="nav-link" to="/customers">Customer</NavLink></li>)
                            : null
                        }
                        {(user && user.isAdmin) ?
                            (<li className="nav-item"><NavLink className="nav-link" to="/rentals">Rentals</NavLink></li>)
                            : null
                        }
                    </ul>

                </div>
                <div>
                    <ul className="navbar-nav">
                        {!user &&
                            (<React.Fragment>
                                <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link" to="/register">Register</NavLink></li>
                            </React.Fragment>)
                        }
                        {user &&
                            (<React.Fragment>
                                <li className="nav-item"><Link className="nav-link" to="/movies">{user.name}</Link></li>
                                <li className="nav-item"><NavLink className="nav-link" to="/logout">Logout</NavLink></li>
                            </React.Fragment>)
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;