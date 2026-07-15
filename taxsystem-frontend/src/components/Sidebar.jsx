import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/sidebar.css";

function Sidebar() {

    const navigate = useNavigate();

    const location = useLocation();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <aside className="sidebar">

            <ul>

                <li className={location.pathname === "/admin" ? "active" : ""}>
                    <Link to="/admin">Dashboard</Link>
                </li>

                <li className={location.pathname === "/users" ? "active" : ""}>
                    <Link to="/users">Users</Link>
                </li>

                <li className={location.pathname === "/municipalities" ? "active" : ""}>
                    <Link to="/municipalities">Municipalities</Link>
                </li>

                <li className={location.pathname === "/business-types" ? "active" : ""}>
                    <Link to="/business-types">Business Types</Link>
                </li>

                <li className={location.pathname === "/businesses" ? "active" : ""}>
                    <Link to="/businesses">Businesses</Link>
                </li>

                <li className={location.pathname === "/monthly-taxes" ? "active" : ""}>
                    <Link to="/monthly-taxes">Monthly Taxes</Link>
                </li>

                <li className={location.pathname === "/pending-businesses" ? "active" : ""}>
                    <Link to="/pending-businesses">Pending Businesses</Link>
                </li>

                <li className={location.pathname === "/payments" ? "active" : ""}>
                    <Link to="/payments">Payments</Link>
                </li>

                <li className={location.pathname === "/reports" ? "active" : ""}>
                    <Link to="/reports">Reports</Link>
                </li>

                <li className="logout" onClick={logout}>

                    Logout

                </li>

            </ul>

        </aside>

    );

}

export default Sidebar;