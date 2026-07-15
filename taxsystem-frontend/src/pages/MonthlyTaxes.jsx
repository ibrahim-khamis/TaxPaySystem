import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import BASE_URL from "../services/api";
import "../css/monthlyTaxes.css";

function MonthlyTaxes() {

    const token = localStorage.getItem("token");

    const [businesses, setBusinesses] = useState([]);
    const [monthlyTaxes, setMonthlyTaxes] = useState([]);
    const [businessId, setBusinessId] = useState("");

    useEffect(() => {

        loadBusinesses();
        loadMonthlyTaxes();

    }, []);

    // ==========================
    // Load Active Businesses
    // ==========================
    const loadBusinesses = async () => {

        try {

            const response = await fetch(
                `${BASE_URL}/businesses/active`,
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

    // ==========================
    // Load Monthly Taxes
    // ==========================
    const loadMonthlyTaxes = async () => {

        try {

            const response = await fetch(
                `${BASE_URL}/monthly-taxes`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            setMonthlyTaxes(data);

        } catch (error) {

            console.log(error);

        }

    };

    // ==========================
    // Generate Monthly Tax
    // ==========================
    const generateMonthlyTax = async () => {

        if (businessId === "") {

            alert("Please select a business.");

            return;

        }

        try {

            const response = await fetch(
                `${BASE_URL}/monthly-taxes/generate/${businessId}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.ok) {

                alert("Monthly Tax Generated Successfully.");

                loadMonthlyTaxes();

            } else {

                const message = await response.text();

                alert(message);

            }

        } catch (error) {

            console.log(error);

        }

    };

    // ==========================
    // Generate Control Number
    // ==========================
    const generateControlNumber = async (id) => {

        try {

            const response = await fetch(
                `${BASE_URL}/monthly-taxes/generate-control-number/${id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.ok) {

                alert("Control Number Generated Successfully.");

                loadMonthlyTaxes();

            }

        } catch (error) {

            console.log(error);

        }

    };

    // ==========================
    // Apply Penalty
    // ==========================
    const applyPenalty = async () => {

        try {

            const response = await fetch(
                `${BASE_URL}/monthly-taxes/apply-penalty`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.ok) {

                alert("Penalty Applied Successfully.");

                loadMonthlyTaxes();

            }

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <Layout>

            <div className="monthly-container">

                <div className="monthly-header">

                    <h2>Monthly Taxes Management</h2>

                </div>

                <div className="top-actions">

                    <select
                        value={businessId}
                        onChange={(e) => setBusinessId(e.target.value)}
                    >

                        <option value="">

                            Select Business

                        </option>

                        {

                            businesses.map((business) => (

                                <option
                                    key={business.id}
                                    value={business.id}
                                >

                                    {business.businessName}

                                </option>

                            ))

                        }

                    </select>

                    <button
                        className="generate-btn"
                        onClick={generateMonthlyTax}
                    >

                        Generate Monthly Tax

                    </button>

                    <button
                        className="penalty-btn"
                        onClick={applyPenalty}
                    >

                        Apply Penalty

                    </button>

                </div>

                <table>

                    <thead>

                        <tr>

                            <th>#</th>
                            <th>Business</th>
                            <th>Month</th>
                            <th>Billing Date</th>
                            <th>Due Date</th>
                            <th>Amount</th>
                            <th>Penalty</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Control Number</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            monthlyTaxes.length === 0 ?

                                (

                                    <tr>

                                        <td colSpan="11">

                                            No Monthly Taxes Found

                                        </td>

                                    </tr>

                                )

                                :

                                (

                                    monthlyTaxes.map((tax, index) => (

                                        <tr key={tax.id}>

                                            <td>{index + 1}</td>

                                            <td>

                                                {tax.business.businessName}

                                            </td>

                                            <td>

                                                {tax.billingMonth}/{tax.billingYear}

                                            </td>

                                            <td>

                                                {tax.billingDate}

                                            </td>

                                            <td>

                                                {tax.dueDate}

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

                                                <span
                                                    className={`status ${tax.status.toLowerCase()}`}
                                                >

                                                    {tax.status}

                                                </span>

                                            </td>

                                            <td>

                                                {

                                                    tax.controlNumber ?

                                                        tax.controlNumber

                                                        :

                                                        "Not Generated"

                                                }

                                            </td>

                                            <td>

                                                {

                                                    !tax.controlNumberGenerated &&

                                                    <button
                                                        className="control-btn"
                                                        onClick={() =>
                                                            generateControlNumber(tax.id)
                                                        }
                                                    >

                                                        Generate

                                                    </button>

                                                }

                                            </td>

                                        </tr>

                                    ))

                                )

                        }

                    </tbody>

                </table>

            </div>

        </Layout>

    );

}

export default MonthlyTaxes;