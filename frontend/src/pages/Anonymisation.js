import React from "react";
import "../App.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import TextView from "../components/TextView";
import PredictionView from "../components/PredictionView";

function Anonymisation() {

    return (
        <>
            <div className="d-flex flex-column min-vh-100">
                <Navbar />
                <main style={{alignSelf: "center", minHeight: "85vh" }}>
                    <div className="h-100">
                        <div style={{marginTop: "10vh"}}>
                            <div>
                                <TextView/>
                                <br/>
                                <br/>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        </>
    );
}

export default Anonymisation