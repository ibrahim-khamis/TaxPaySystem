import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import BASE_URL from "../services/api";
import "../css/reports.css";

function Reports() {

    const token = localStorage.getItem("token");

    const [dashboard, setDashboard] = useState({});

    const [payments, setPayments] = useState([]);

    useEffect(() => {

        loadDashboard();

        loadPayments();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await fetch(
                `${BASE_URL}/dashboard`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            setDashboard(data);

        } catch (error) {

            console.log(error);

        }

    };

    const loadPayments = async () => {

        try {

            const response = await fetch(
                `${BASE_URL}/payments`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            setPayments(data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <Layout>

            <div className="reports-container">

                <h2>Reports</h2>

                <div className="report-cards">

                    <div className="report-card">
                        <h4>Total Revenue</h4>
                        <h3>TZS {dashboard.totalRevenue?.toLocaleString()}</h3>
                    </div>

                    <div className="report-card">
                        <h4>Total Users</h4>
                        <h3>{dashboard.totalUsers}</h3>
                    </div>

                    <div className="report-card">
                        <h4>Total Businesses</h4>
                        <h3>{dashboard.totalBusinesses}</h3>
                    </div>

                    <div className="report-card">
                        <h4>Active Businesses</h4>
                        <h3>{dashboard.activeBusinesses}</h3>
                    </div>

                    <div className="report-card">
                        <h4>Pending Businesses</h4>
                        <h3>{dashboard.pendingBusinesses}</h3>
                    </div>

                    <div className="report-card">
                        <h4>Rejected Businesses</h4>
                        <h3>{dashboard.rejectedBusinesses}</h3>
                    </div>

                </div>

                <h3 className="payment-title">

                    Payment Report

                </h3>

                <table>

                    <thead>

                        <tr>

                            <th>#</th>
                            <th>Reference</th>
                            <th>Business</th>
                            <th>Amount</th>
                            <th>Method</th>
                            <th>Status</th>
                            <th>Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            payments.map((payment,index)=>(

                                <tr key={payment.id}>

                                    <td>{index+1}</td>

                                    <td>{payment.paymentReference}</td>

                                    <td>{payment.monthlyTax.business.businessName}</td>

                                    <td>

                                        TZS {payment.amountPaid.toLocaleString()}

                                    </td>

                                    <td>{payment.paymentMethod}</td>

                                    <td>{payment.status}</td>

                                    <td>

                                        {new Date(payment.paymentDate).toLocaleDateString()}

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

export default Reports;