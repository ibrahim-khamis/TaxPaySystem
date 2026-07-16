import { useEffect, useState } from "react";
import BusinessLayout from "../components/BusinessLayout";
import BASE_URL from "../services/api";
import "../css/businessMonthlyTaxes.css";
import "../css/table.css";

function BusinessMonthlyTaxes() {

    const token = localStorage.getItem("token");

    const [monthlyTaxes, setMonthlyTaxes] = useState([]);

    useEffect(() => {

        loadMonthlyTaxes();

    }, []);

    // ===========================
    // LOAD MONTHLY TAXES
    // ===========================

    const loadMonthlyTaxes = async () => {

        try {

            const response = await fetch(

                `${BASE_URL}/monthly-taxes/my-taxes`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            if (response.ok) {

                const data = await response.json();

                setMonthlyTaxes(data);

            }

        } catch (error) {

            console.log(error);

        }

    };

    // ===========================
    // GENERATE CONTROL NUMBER
    // ===========================

    const generateControlNumber = async (taxId) => {

        try {

            const response = await fetch(

                `${BASE_URL}/monthly-taxes/generate-control-number/${taxId}`,

                {

                    method: "POST",

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            if (response.ok) {

                alert("Control Number Generated Successfully");

                loadMonthlyTaxes();

            } else {

                const message = await response.text();

                alert(message);

            }

        } catch (error) {

            console.log(error);

        }

    };


    // ===========================
// MAKE PAYMENT
// ===========================

const makePayment = async (controlNumber) => {

    const paymentMethod = prompt(
        "Enter Payment Method (MOBILE_MONEY or BANK)"
    );

    if (!paymentMethod) return;

    try {

        const response = await fetch(

            `${BASE_URL}/payments`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify({

                    controlNumber,

                    paymentMethod

                })

            }

        );

        if (response.ok) {

            alert("Payment Successful");

            loadMonthlyTaxes();

        } else {

            const message = await response.text();

            alert(message);

        }

    } catch (error) {

        console.log(error);

    }

};





    return (

        <BusinessLayout>

            <div className="business-monthly-container">

                <h2>My Monthly Taxes</h2>

                {

                    monthlyTaxes.length === 0 ?

                        (

                            <div className="empty-box">

                                No Monthly Taxes Found.

                            </div>

                        )

                        :

                        (

                    <div className="table-container">
                            <table>

                                <thead>

                                    <tr>

                                        <th>Month</th>

                                        <th>Year</th>

                                        <th>Amount</th>

                                        <th>Penalty</th>

                                        <th>Total</th>

                                        <th>Due Date</th>

                                        <th>Status</th>

                                        <th>Control Number</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        monthlyTaxes.map((tax) => (

                                            <tr key={tax.id}>

                                                <td>

                                                    {tax.billingMonth}

                                                </td>

                                                <td>

                                                    {tax.billingYear}

                                                </td>

                                                <td>

                                                    TZS {tax.amount.toLocaleString()}

                                                </td>

                                                <td>

                                                    TZS {tax.penalty.toLocaleString()}

                                                </td>

                                                <td>

                                                    TZS {tax.totalAmount.toLocaleString()}

                                                </td>

                                                <td>

                                                    {tax.dueDate}

                                                </td>

                                                <td>

                                                    <span

                                                        className={`status ${tax.status.toLowerCase()}`}

                                                    >

                                                        {tax.status}

                                                    </span>

                                                </td>

                                                <td>

    {

        tax.controlNumber == null ?

        (

            <button
                className="generate-btn"
                onClick={() => generateControlNumber(tax.id)}
            >
                Generate
            </button>

        )

        :

        (

            <div>

                <div>{tax.controlNumber}</div>

                {

                    tax.status !== "PAID" &&

                    <button
                        className="pay-btn"
                        onClick={() => makePayment(tax.controlNumber)}
                    >
                        Pay Now
                    </button>

                }

            </div>

        )

    }

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

export default BusinessMonthlyTaxes;