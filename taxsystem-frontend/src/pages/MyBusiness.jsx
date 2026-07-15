import { useEffect, useState } from "react";
import BusinessLayout from "../components/BusinessLayout";
import BASE_URL from "../services/api";
import "../css/myBusiness.css";

function MyBusiness() {

    const token = localStorage.getItem("token");

    const [business, setBusiness] = useState({

        businessName: "",

        businessNumber: "",

        location: "",

        municipality: "",

        businessType: "",

        monthlyTax: 0,

        status: ""

    });

    useEffect(() => {

        loadBusiness();

    }, []);

    const loadBusiness = async () => {

        try {

            const response = await fetch(

                `${BASE_URL}/businesses/my-business`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            if (response.ok) {

                const data = await response.json();

                setBusiness(data);

            }

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <BusinessLayout>

            <div className="my-business-container">

                <h2>My Business</h2>

                <div className="business-card">

                    <div className="business-row">

                        <span>Business Name</span>

                        <strong>{business.businessName}</strong>

                    </div>

                    <div className="business-row">

                        <span>Business Number</span>

                        <strong>{business.businessNumber}</strong>

                    </div>

                    <div className="business-row">

                        <span>Location</span>

                        <strong>{business.location}</strong>

                    </div>

                    <div className="business-row">

                        <span>Municipality</span>

                        <strong>{business.municipality}</strong>

                    </div>

                    <div className="business-row">

                        <span>Business Type</span>

                        <strong>{business.businessType}</strong>

                    </div>

                    <div className="business-row">

                        <span>Monthly Tax</span>

                        <strong>

                            TZS {business.monthlyTax.toLocaleString()}

                        </strong>

                    </div>

                    <div className="business-row">

                        <span>Status</span>

                        <strong>{business.status}</strong>

                    </div>

                </div>

            </div>

        </BusinessLayout>

    );

}

export default MyBusiness;