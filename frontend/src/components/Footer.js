import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'

function Footer() {
    return (
        <>
            <div style={{
                position: "relative", height: "200px", width: "100%",
                backgroundColor: "#0b2e4a", color: "white", textAlign: "center",
            }}>
                <div style={{paddingTop:"40px"}}>
                    <p>&copy;{new Date().getFullYear()} MpTech.Inc All right reserved.</p>
                </div>
            </div>
        </>
    );
}
export default Footer;