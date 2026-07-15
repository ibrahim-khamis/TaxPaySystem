import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import BASE_URL from "../services/api";
import "../css/businesses.css";

function Businesses() {

    const token = localStorage.getItem("token");

    const [businesses, setBusinesses] = useState([]);
    const [statistics, setStatistics] = useState({
        total: 0,
        active: 0,
        pending: 0,
        rejected: 0
    });

    const [search, setSearch] = useState("");

    const [selectedBusiness, setSelectedBusiness] = useState(null);

    useEffect(() => {

        loadBusinesses();

        loadStatistics();

    }, []);

    // Load Businesses

    const loadBusinesses = async () => {

        try {

            const response = await fetch(

                `${BASE_URL}/businesses`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            const data = await response.json();

            setBusinesses(data);

        } catch (error) {

            console.log(error);

        }

    };

    // Load Statistics

    const loadStatistics = async () => {

        try {

            const response = await fetch(

                `${BASE_URL}/businesses/statistics`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            const data = await response.json();

            setStatistics(data);

        } catch (error) {

            console.log(error);

        }

    };

    // Delete Business

    const deleteBusiness = async (id) => {

        if (!window.confirm("Delete this business?")) {

            return;

        }

        try {

            const response = await fetch(

                `${BASE_URL}/businesses/${id}`,

                {

                    method: "DELETE",

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            if (response.ok) {

                alert("Business deleted successfully.");

                loadBusinesses();

                loadStatistics();

            }

        } catch (error) {

            console.log(error);

        }

    };

    // Search Filter

    const filteredBusinesses = businesses.filter((business) =>

        business.businessName.toLowerCase().includes(search.toLowerCase()) ||

        business.user.firstName.toLowerCase().includes(search.toLowerCase()) ||

        business.user.lastName.toLowerCase().includes(search.toLowerCase()) ||

        business.businessNumber.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <Layout>

            <div className="business-container">

                <h2>Businesses Management</h2>

                {/* Statistics */}

                <div className="stats-grid">

                    <div className="stat-card total">

                        <h3>Total</h3>

                        <h1>{statistics.total}</h1>

                    </div>

                    <div className="stat-card active">

                        <h3>Active</h3>

                        <h1>{statistics.active}</h1>

                    </div>

                    <div className="stat-card pending">

                        <h3>Pending</h3>

                        <h1>{statistics.pending}</h1>

                    </div>

                    <div className="stat-card rejected">

                        <h3>Rejected</h3>

                        <h1>{statistics.rejected}</h1>

                    </div>

                </div>

                {/* Search */}

                <input

                    className="search-input"

                    type="text"

                    placeholder="Search business..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                />

                <table>

                    <thead>

                        <tr>

                            <th>#</th>

                            <th>Business</th>

                            <th>Owner</th>

                            <th>Municipality</th>

                            <th>Business Type</th>

                            <th>Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredBusinesses.map((business, index) => (

                                <tr key={business.id}>

                                    <td>{index + 1}</td>

                                    <td>{business.businessName}</td>

                                    <td>

                                        {business.user.firstName} {business.user.lastName}

                                    </td>

                                    <td>

                                        {business.municipality.municipalityName}

                                    </td>

                                    <td>

                                        {business.businessType.businessTypeName}

                                    </td>

                                    <td>

                                        <span

                                            className={`status ${business.status.toLowerCase()}`}

                                        >

                                            {business.status}

                                        </span>

                                    </td>

                                    <td>

                                        <div className="action-buttons">

                                            <button

                                                className="view-btn"

                                                onClick={() =>

                                                    setSelectedBusiness(business)

                                                }

                                            >

                                                View

                                            </button>

                                            <button

                                                className="delete-btn"

                                                onClick={() =>

                                                    deleteBusiness(business.id)

                                                }

                                            >

                                                Delete

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </Layout>

    );

}

export default Businesses;