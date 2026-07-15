import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import BASE_URL from "../services/api";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        if (username.trim() === "" || password.trim() === "") {

            setError("Please enter username and password.");

            return;

        }

        setError("");

        try {

            const response = await fetch(`${BASE_URL}/auth/login`, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    username: username,
                    password: password

                })

            });

            const data = await response.json();

            if (response.ok) {

                // Save JWT Token
                localStorage.setItem("token", data.token);

                // Save Logged User
                localStorage.setItem("user", JSON.stringify(data.user));

                // Redirect according to role
                if (data.user.role === "ADMIN") {

                    navigate("/admin");

                } else if (data.user.role === "BUSINESS_OWNER") {

                    navigate("/business");

                }

            } else {

                setError(data.message);

            }

        } catch (error) {

            setError("Unable to connect to server.");

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <div className="login-logo">

                    <div className="logo-circle">

                        MT

                    </div>

                </div>

                <h1>Municipal Tax Management System</h1>

                <p>Please login to continue</p>

                <div className="error-message">

                    {error}

                </div>

                <form onSubmit={handleLogin}>

                    <div className="input-group">

                        <label>Username</label>

                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                    </div>

                    <div className="input-group">

                        <label>Password</label>

                        <div className="password-container">

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <span
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >

                                {showPassword ? "Hide" : "Show"}

                            </span>

                        </div>

                    </div>

                    <button type="submit">

                        Login

                    </button>

                </form>


                <div className="register-link">

                <p>Don't have an account?

                <span onClick={() => navigate("/register")}>

                Register

                </span>

                </p>

            </div>

            </div>

        </div>

    );

}

export default Login;