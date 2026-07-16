import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import BASE_URL from "../services/api";
import "../css/pendingBusinesses.css";
import "../css/table.css";

function PendingBusinesses() {

    const [businesses, setBusinesses] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {

        loadPendingBusinesses();

    }, []);

    const loadPendingBusinesses = async () => {

        try {

            const response = await fetch(
                `${BASE_URL}/businesses/pending`,
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

    const approveBusiness = async (id) => {

        try {

            const response = await fetch(
                `${BASE_URL}/businesses/${id}/approve`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.ok) {

                alert("Business Approved Successfully");

                loadPendingBusinesses();

            }

        } catch (error) {

            console.log(error);

        }

    };

    const rejectBusiness = async (id) => {

        try {

            const response = await fetch(
                `${BASE_URL}/businesses/${id}/reject`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.ok) {

                alert("Business Rejected Successfully");

                loadPendingBusinesses();

            }

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <Layout>

            <div className="pending-container">

                <div className="pending-header">

                    <h2>Pending Business Registrations</h2>

                </div>

                {

                    businesses.length === 0 ?

                        (

                            <div className="empty-box">

                                No Pending Business Registration.

                            </div>

                        )

                        :

                        (
                    
                    <div className="table-container">
                            <table>

                                <thead>

                                    <tr>

                                        <th>#</th>
                                        <th>Owner</th>
                                        <th>Business</th>
                                        <th>Municipality</th>
                                        <th>Business Type</th>
                                        <th>Monthly Tax</th>
                                        <th>Status</th>
                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        businesses.map((business, index) => (

                                            <tr key={business.id}>

                                                <td>{index + 1}</td>

                                                <td>

                                                    {business.user.firstName} {business.user.lastName}

                                                </td>

                                                <td>

                                                    {business.businessName}

                                                </td>

                                                <td>

                                                    {business.municipality.municipalityName}

                                                </td>

                                                <td>

                                                    {business.businessType.businessTypeName}

                                                </td>

                                                <td>

                                                    TZS {business.businessType.monthlyTax.toLocaleString()}

                                                </td>

                                                <td>

                                                    <span className="status">

                                                        {business.status}

                                                    </span>

                                                </td>

                                                <td>

                                                    <div className="actions">

                                                        <button
                                                            className="approve-btn"
                                                            onClick={() => approveBusiness(business.id)}
                                                        >

                                                            Approve

                                                        </button>

                                                        <button
                                                            className="reject-btn"
                                                            onClick={() => rejectBusiness(business.id)}
                                                        >

                                                            Reject

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>

                        </div>

                        )

                }

            </div>

        </Layout>

    );

}

export default PendingBusinesses;