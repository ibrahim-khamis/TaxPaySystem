import Layout from "../components/Layout";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

import "../css/users.css";

function Users(){

    return(

        <Layout>

            <div className="users-page">

                <h1>Users Management</h1>

                <p>Manage system users</p>

                <div className="users-container">

                    <UserForm/>

                    <UserTable/>

                </div>

            </div>

        </Layout>

    );

}

export default Users;