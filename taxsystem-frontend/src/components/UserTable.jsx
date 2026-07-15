import { useEffect, useState } from "react";
import "../css/usertable.css";
import BASE_URL from "../services/api";

function UserTable() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(`${BASE_URL}/users`, {

                method: "GET",

                headers: {

                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`

                }

            });

            if (!response.ok) {

                throw new Error("Failed to load users");

            }

            const data = await response.json();

            setUsers(data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="user-table">

            <h2>System Users</h2>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {users.length > 0 ? (

                        users.map((user) => (

                            <tr key={user.id}>

                                <td>{user.id}</td>

                                <td>{user.firstName}</td>

                                <td>{user.lastName}</td>

                                <td>{user.email}</td>

                                <td>{user.role}</td>

                                <td>

                                    <button className="edit-btn">

                                        Edit

                                    </button>

                                    <button className="delete-btn">

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="6">

                                No users found

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default UserTable;