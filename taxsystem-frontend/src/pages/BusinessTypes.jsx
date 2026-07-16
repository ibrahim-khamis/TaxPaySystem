import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import BASE_URL from "../services/api";
import "../css/businessTypes.css";
import "../css/table.css";

function BusinessTypes() {

    const token = localStorage.getItem("token");

    const [businessTypes, setBusinessTypes] = useState([]);

    const [businessTypeName, setBusinessTypeName] = useState("");

    const [monthlyTax, setMonthlyTax] = useState("");

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        loadBusinessTypes();

    }, []);

    // Load Business Types
    const loadBusinessTypes = async () => {

        try {

            const response = await fetch(
                `${BASE_URL}/business-types`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            setBusinessTypes(data);

        } catch (error) {

            console.log(error);

        }

    };

    // Save Business Type
    const saveBusinessType = async () => {

        if (
            businessTypeName.trim() === "" ||
            monthlyTax === ""
        ) {

            alert("All fields are required.");

            return;

        }

        try {

            let url = `${BASE_URL}/business-types`;

            let method = "POST";

            if (editingId !== null) {

                url = `${BASE_URL}/business-types/${editingId}`;

                method = "PUT";

            }

            const response = await fetch(url, {

                method,

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify({

                    businessTypeName,

                    monthlyTax: Number(monthlyTax)

                })

            });

            if (response.ok) {

                alert(
                    editingId !== null
                        ? "Business Type Updated Successfully"
                        : "Business Type Added Successfully"
                );

                clearForm();

                loadBusinessTypes();

            } else {

                const message = await response.text();

                alert(message);

            }

        } catch (error) {

            console.log(error);

        }

    };

    // Edit
    const editBusinessType = (businessType) => {

        setEditingId(businessType.id);

        setBusinessTypeName(
            businessType.businessTypeName
        );

        setMonthlyTax(
            businessType.monthlyTax
        );

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    // Delete
    const deleteBusinessType = async (id) => {

        if (!window.confirm("Delete this Business Type?")) {

            return;

        }

        try {

            const response = await fetch(

                `${BASE_URL}/business-types/${id}`,

                {

                    method: "DELETE",

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            if (response.ok) {

                alert("Deleted Successfully");

                loadBusinessTypes();

            }

        } catch (error) {

            console.log(error);

        }

    };

    const clearForm = () => {

        setEditingId(null);

        setBusinessTypeName("");

        setMonthlyTax("");

    };

    return (

        <Layout>

            <div className="business-type-container">

                <h2>

                    Business Types Management

                </h2>

                <div className="top-form">

                    <input

                        type="text"

                        placeholder="Business Type"

                        value={businessTypeName}

                        onChange={(e) =>
                            setBusinessTypeName(
                                e.target.value
                            )
                        }

                    />

                    <input

                        type="number"

                        placeholder="Monthly Tax"

                        value={monthlyTax}

                        onChange={(e) =>
                            setMonthlyTax(
                                e.target.value
                            )
                        }

                    />

                    <button

                        className="save-btn"

                        onClick={saveBusinessType}

                    >

                        {

                            editingId === null

                                ? "Add Business Type"

                                : "Update"

                        }

                    </button>

                    {

                        editingId !== null &&

                        <button

                            className="cancel-btn"

                            onClick={clearForm}

                        >

                            Cancel

                        </button>

                    }

                </div>

                {

                    businessTypes.length === 0 ?

                        (

                            <div className="empty-box">

                                No Business Types Found.

                            </div>

                        )

                        :

                        (
                    <div className="table-container">
                            <table>

                                <thead>

                                    <tr>

                                        <th>#</th>

                                        <th>Business Type</th>

                                        <th>Monthly Tax</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        businessTypes.map((type, index) => (

                                            <tr key={type.id}>

                                                <td>

                                                    {index + 1}

                                                </td>

                                                <td>

                                                    {type.businessTypeName}

                                                </td>

                                                <td>

                                                    TZS {type.monthlyTax.toLocaleString()}

                                                </td>

                                                <td>

                                                    <div className="action-buttons">

                                                        <button

                                                            className="edit-btn"

                                                            onClick={() =>
                                                                editBusinessType(type)
                                                            }

                                                        >

                                                            Edit

                                                        </button>

                                                        <button

                                                            className="delete-btn"

                                                            onClick={() =>
                                                                deleteBusinessType(type.id)
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

                        )

                }

            </div>

        </Layout>

    );

}

export default BusinessTypes;