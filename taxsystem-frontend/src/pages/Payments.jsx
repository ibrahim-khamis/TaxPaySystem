import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import BASE_URL from "../services/api";
import "../css/payments.css";
import "../css/table.css";

function Payments() {

    const token = localStorage.getItem("token");

    const [payments, setPayments] = useState([]);

    useEffect(() => {

        loadPayments();

    }, []);

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

            <div className="payments-container">

                <div className="payments-header">

                    <h2>Payments</h2>

                </div>
            <div className="table-container">
                <table>

                    <thead>

                        <tr>

                            <th>#</th>
                            <th>Reference</th>
                            <th>Control Number</th>
                            <th>Business</th>
                            <th>Amount</th>
                            <th>Method</th>
                            <th>Status</th>
                            <th>Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            payments.length === 0 ?

                                (

                                    <tr>

                                        <td colSpan="8">

                                            No Payments Found

                                        </td>

                                    </tr>

                                )

                                :

                                (

                                    payments.map((payment, index) => (

                                        <tr key={payment.id}>

                                            <td>{index + 1}</td>

                                            <td>{payment.paymentReference}</td>

                                            <td>

                                                {payment.monthlyTax.controlNumber}

                                            </td>

                                            <td>

                                                {payment.monthlyTax.business.businessName}

                                            </td>

                                            <td>

                                                TZS {payment.amountPaid.toLocaleString()}

                                            </td>

                                            <td>

                                                {payment.paymentMethod}

                                            </td>

                                            <td>

                                                <span className="success">

                                                    {payment.status}

                                                </span>

                                            </td>

                                            <td>

                                                {payment.paymentDate.substring(0,10)}

                                            </td>

                                        </tr>

                                    ))

                                )

                        }

                    </tbody>

                </table>
            </div>    

            </div>

        </Layout>

    );

}

export default Payments;