import Header from "./Header";
import Sidebar from "./Sidebar";
import "../css/layout.css";

function Layout({ children }) {

    return (

        <div>

            <Header />

            <div className="layout">

                <Sidebar />

                <main className="content">

                    {children}

                </main>

            </div>

        </div>

    );

}

export default Layout;