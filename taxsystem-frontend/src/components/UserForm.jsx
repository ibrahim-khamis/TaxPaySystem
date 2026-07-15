import { useState } from "react";
import "../css/userform.css";
import BASE_URL from "../services/api";

function UserForm() {

    const token = localStorage.getItem("token");

    const [user, setUser] = useState({

        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        role: "ADMIN"

    });

    const handleChange = (e) => {

        setUser({

            ...user,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(

                `${BASE_URL}/users`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`

                    },

                    body: JSON.stringify(user)

                }

            );

            const data = await response.json();

            if (response.ok) {

                alert("User Added Successfully.");

                window.location.reload();

            } else {

                alert(data.message || "Failed.");

            }

        } catch (error) {

            console.log(error);

            alert("Unable to connect.");

        }

    };

    return (

        <div className="user-form">

            <h2>Add User</h2>

            <form onSubmit={handleSubmit}>

                <label>First Name</label>

                <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    required
                />

                <label>Last Name</label>

                <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    required
                />

                <label>Email</label>

                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />

                <label>Phone Number</label>

                <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    required
                />

                <label>Username</label>

                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    required
                />

                <label>Password</label>

                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />

                <label>Role</label>

                <select
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                >

                    <option value="ADMIN">

                        ADMIN

                    </option>

                    <option value="BUSINESS_OWNER">

                        BUSINESS OWNER

                    </option>

                </select>

                <button type="submit">

                    Save User

                </button>

            </form>

        </div>

    );

}

export default UserForm;