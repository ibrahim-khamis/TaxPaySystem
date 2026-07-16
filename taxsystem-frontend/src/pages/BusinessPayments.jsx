import { useEffect, useState } from "react";
import BusinessLayout from "../components/BusinessLayout";
import BASE_URL from "../services/api";
import "../css/businessPayments.css";
import "../css/table.css";

function BusinessPayments() {

    const token = localStorage.getItem("token");

    const [payments, setPayments] = useState([]);

    useEffect(() => {

        loadPayments();

    }, []);

    // ===========================
    // LOAD MY PAYMENTS
    // ===========================

    const loadPayments = async () => {

        try {

            const response = await fetch(

                `${BASE_URL}/payments/my-payments`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            if (response.ok) {

                const data = await response.json();

                setPayments(data);

            }

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <BusinessLayout>

            <div className="business-payments-container">

                <h2>My Payments</h2>

                {

                    payments.length === 0 ?

                        (

                            <div className="empty-box">

                                No Payments Found

                            </div>

                        )

                        :

                        (

                        <div className="table-container">
                            <table>

                                <thead>

                                    <tr>

                                        <th>#</th>
                                        <th>Reference</th>
                                        <th>Control Number</th>
                                        <th>Amount</th>
                                        <th>Method</th>
                                        <th>Status</th>
                                        <th>Date</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        payments.map((payment, index) => (

                                            <tr key={payment.id}>

                                                <td>{index + 1}</td>

                                                <td>{payment.paymentReference}</td>

                                                <td>{payment.monthlyTax.controlNumber}</td>

                                                <td>

                                                    TZS {payment.amountPaid.toLocaleString()}

                                                </td>

                                                <td>{payment.paymentMethod}</td>

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

                                    }

                                </tbody>

                            </table>

                        </div>

                        )

                }

            </div>

        </BusinessLayout>

    );

}

export default BusinessPayments;