import React, {Component, useState} from "react";
import "../App.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import TextView from "../components/TextView";
import PredictionsView from "../components/PredictionView";

function App() {

    const [imgFile, setImgFile] = useState({text:"", language:"en"})

    const onChange = (event) => {
        event.preventDefault();
        if (event.target.files.length === 0) {
            return;
        }
        let text;
        const reader = new FileReader();
        reader.onload = (event) => {
            text = event.target.result;
            setImgFile({text:text, language: "en"})
        }
        reader.readAsText(event.target.files[0])
    }

    const onSubmit = () => {
        console.log(imgFile)
        //
        // this.setState({
        //     spinner: true,
        //     disabled: true
        // });
        fetch('http://localhost:5001/analyze', {
            mode: 'no-cors',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(imgFile)
        }).then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error))
    }

    return (
        <>
            <div className="d-flex flex-column min-vh-100">
                <Navbar/>
                <main style={{alignSelf: "center", minHeight: "85vh"}}>
                    <div className="h-100">
                        <div style={{marginTop: "10vh"}}>
                            <div>
                                <TextView imgFile={imgFile.text} onChange={onChange}/>
                                <br/>
                                <br/>

                                <PredictionsView onSubmit={onSubmit}/>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        </>
    );

}

export default App;