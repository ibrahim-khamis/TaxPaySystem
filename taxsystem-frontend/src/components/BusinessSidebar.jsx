import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/businessSidebar.css";

function BusinessSidebar(){

    const navigate = useNavigate();

    const location = useLocation();

    const logout = () =>{

        localStorage.clear();

        navigate("/");

    }

    return(

        <aside className="business-sidebar">

            <ul>

                <li className={location.pathname==="/business" ? "active" : ""}>

                    <Link to="/business">

                        Dashboard

                    </Link>

                </li>

                <li className={location.pathname==="/my-business" ? "active" : ""}>

                    <Link to="/my-business">

                        My Business

                    </Link>

                </li>

                <li className={location.pathname==="/business-monthly-taxes" ? "active" : ""}>

                    <Link to="/business-monthly-taxes">

                        Monthly Taxes

                    </Link>

                </li>

                <li className={location.pathname==="/business-payments" ? "active" : ""}>

                    <Link to="/business-payments">

                        Payments

                    </Link>

                </li>

                <li onClick={logout}>

                    Logout

                </li>

            </ul>

        </aside>

    );

}

export default BusinessSidebar;