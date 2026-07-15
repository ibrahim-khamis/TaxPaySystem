import "../css/businessHeader.css";

function BusinessHeader() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <header className="business-header">

            <h2>Municipal Tax Management System</h2>

            <span>

                Welcome {user?.firstName}

            </span>

        </header>

    );

}

export default BusinessHeader;