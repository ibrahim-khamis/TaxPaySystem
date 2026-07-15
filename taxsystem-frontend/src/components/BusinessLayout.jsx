import BusinessHeader from "./BusinessHeader";
import BusinessSidebar from "./BusinessSidebar";
import "../css/businessLayout.css";

function BusinessLayout({children}){

    return(

        <div>

            <BusinessHeader/>

            <div className="business-layout">

                <BusinessSidebar/>

                <main className="business-content">

                    {children}

                </main>

            </div>

        </div>

    );

}

export default BusinessLayout;