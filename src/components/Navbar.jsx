
import { NavLink } from "react-router-dom";
export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink to="/" className={`navbar-brand`} style={({ isActive }) => {
                    return isActive ? { color: "plum" } : {};
                }} end>HomePage</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/posts" className="nav-link active" aria-current="page" style={({ isActive }) => {
                                return isActive ? { color: "plum" } : {};
                            }} end>Lista dei posts</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="about" className="nav-link" style={({ isActive }) => {
                                return isActive ? { color: "plum" } : {};
                            }} end>Chi siamo</NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}