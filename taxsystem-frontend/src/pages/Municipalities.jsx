import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import BASE_URL from "../services/api";
import "../css/municipalities.css";
import "../css/table.css";


function Municipalities() {

    const token = localStorage.getItem("token");

    const [municipalities, setMunicipalities] = useState([]);

    const [municipalityName, setMunicipalityName] = useState("");

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        loadMunicipalities();

    }, []);

    // Load Municipalities
    const loadMunicipalities = async () => {

        try {

            const response = await fetch(
                `${BASE_URL}/municipalities`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            setMunicipalities(data);

        } catch (error) {

            console.log(error);

        }

    };

    // Save Municipality
    const saveMunicipality = async () => {

        if (municipalityName.trim() === "") {

            alert("Municipality Name is required");

            return;

        }

        try {

            let url = `${BASE_URL}/municipalities`;

            let method = "POST";

            if (editingId !== null) {

                url = `${BASE_URL}/municipalities/${editingId}`;

                method = "PUT";

            }

            const response = await fetch(url, {

                method,

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify({

                    municipalityName

                })

            });

            if (response.ok) {

                alert(
                    editingId !== null
                        ? "Municipality Updated Successfully"
                        : "Municipality Added Successfully"
                );

                setMunicipalityName("");

                setEditingId(null);

                loadMunicipalities();

            } else {

                const message = await response.text();

                alert(message);

            }

        } catch (error) {

            console.log(error);

        }

    };

    // Edit Municipality
    const editMunicipality = (municipality) => {

        setEditingId(municipality.id);

        setMunicipalityName(
            municipality.municipalityName
        );

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    // Delete Municipality
    const deleteMunicipality = async (id) => {

        if (!window.confirm("Delete this Municipality?")) {

            return;

        }

        try {

            const response = await fetch(

                `${BASE_URL}/municipalities/${id}`,

                {

                    method: "DELETE",

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            if (response.ok) {

                alert("Municipality Deleted Successfully");

                loadMunicipalities();

            }

        } catch (error) {

            console.log(error);

        }

    };

    // Cancel Update
    const cancelUpdate = () => {

        setMunicipalityName("");

        setEditingId(null);

    };

    return (

        <Layout>

            <div className="municipality-container">

                <h2>

                    Municipalities Management

                </h2>

                <div className="top-form">

                    <input

                        type="text"

                        placeholder="Enter Municipality Name"

                        value={municipalityName}

                        onChange={(e) =>
                            setMunicipalityName(e.target.value)
                        }

                    />

                    <button

                        className="save-btn"

                        onClick={saveMunicipality}

                    >

                        {

                            editingId === null

                                ? "Add Municipality"

                                : "Update"

                        }

                    </button>

                    {

                        editingId !== null &&

                        <button

                            className="cancel-btn"

                            onClick={cancelUpdate}

                        >

                            Cancel

                        </button>

                    }

                </div>

                {

                    municipalities.length === 0 ?

                        (

                            <div className="empty-box">

                                No Municipality Found.

                            </div>

                        )

                        :

                        (
                    <div className="table-container">
                            <table>

                                <thead>

                                    <tr>

                                        <th>#</th>

                                        <th>Municipality Name</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        municipalities.map((m, index) => (

                                            <tr key={m.id}>

                                                <td>

                                                    {index + 1}

                                                </td>

                                                <td>

                                                    {m.municipalityName}

                                                </td>

                                                <td>

                                                    <div className="action-buttons">

                                                        <button

                                                            className="edit-btn"

                                                            onClick={() =>
                                                                editMunicipality(m)
                                                            }

                                                        >

                                                            Edit

                                                        </button>

                                                        <button

                                                            className="delete-btn"

                                                            onClick={() =>
                                                                deleteMunicipality(m.id)
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

export default Municipalities;