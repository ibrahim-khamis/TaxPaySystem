import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/register.css";
import BASE_URL from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [municipalities, setMunicipalities] = useState([]);
    const [businessTypes, setBusinessTypes] = useState([]);

    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({

        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        confirmPassword: "",

        businessName: "",
        businessNumber: "",
        location: "",

        municipalityId: "",
        businessTypeId: ""

    });

    useEffect(() => {

        loadMunicipalities();
        loadBusinessTypes();

    }, []);

    // ===========================
    // LOAD MUNICIPALITIES
    // ===========================

    const loadMunicipalities = async () => {

        try {

            const response = await fetch(
                `${BASE_URL}/municipalities`
            );

            const data = await response.json();

            setMunicipalities(data);

        } catch (error) {

            console.log(error);

        }

    };

    // ===========================
    // LOAD BUSINESS TYPES
    // ===========================

    const loadBusinessTypes = async () => {

        try {

            const response = await fetch(
                `${BASE_URL}/business-types`
            );

            const data = await response.json();

            setBusinessTypes(data);

        } catch (error) {

            console.log(error);

        }

    };

    // ===========================
    // HANDLE INPUT
    // ===========================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    // ===========================
    // REGISTER
    // ===========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {

            setMessage("Passwords do not match.");

            return;

        }

        try {

            const response = await fetch(

                `${BASE_URL}/auth/register`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        phone: formData.phone,
                        username: formData.username,
                        password: formData.password,

                        businessName: formData.businessName,
                        businessNumber: formData.businessNumber,
                        location: formData.location,

                        municipalityId: Number(formData.municipalityId),
                        businessTypeId: Number(formData.businessTypeId)

                    })

                }

            );

            const data = await response.text();

            setMessage(data);

            if (response.ok) {

                setTimeout(() => {

                    navigate("/");

                }, 2000);

            }

        } catch (error) {

            console.log(error);

            setMessage("Registration Failed.");

        }

    };

    return (

        <div className="register-container">

            <div className="register-card">

                <h1>Business Registration</h1>

                <p>Create Business Owner Account</p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="businessName"
                        placeholder="Business Name"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="businessNumber"
                        placeholder="Business Number"
                        value={formData.businessNumber}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Business Location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="municipalityId"
                        value={formData.municipalityId}
                        onChange={handleChange}
                        required
                    >

                        <option value="">

                            Select Municipality

                        </option>

                        {

                            municipalities.map((municipality) => (

                                <option

                                    key={municipality.id}

                                    value={municipality.id}

                                >

                                    {municipality.municipalityName}

                                </option>

                            ))

                        }

                    </select>

                    <select
                        name="businessTypeId"
                        value={formData.businessTypeId}
                        onChange={handleChange}
                        required
                    >

                        <option value="">

                            Select Business Type

                        </option>

                        {

                            businessTypes.map((businessType) => (

                                <option

                                    key={businessType.id}

                                    value={businessType.id}

                                >

                                    {businessType.businessTypeName}

                                </option>

                            ))

                        }

                    </select>

                    <button type="submit">

                        Register

                    </button>

                </form>

                {

                    message &&

                    <p className="message">

                        {message}

                    </p>

                }

                <p className="login-link">

                    Already have an account?

                    <span

                        onClick={() => navigate("/")}

                    >

                        Login

                    </span>

                </p>

            </div>

        </div>

    );

}

export default Register;