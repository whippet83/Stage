import React, {Component, useState} from "react";
import "../App.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import TextView from "../components/TextView";
import PredictionsView from "../components/PredictionView";

function App() {

    const [text, setText] = useState("");
    const [analyse, setAnalyse] = useState([]);
    const [ano, setAno] = useState("");

    const onChange= async(e) =>{
        e.preventDefault()
        if (e.target.files.length === 0){
            return;
        }
        let file
        const reader = new FileReader();
        reader.onload = (e) =>{
            file = e.target.result;
            setText(file)
        }
        reader.readAsText(e.target.files[0])
    }

    const onSubmit= async() =>{

        let raw = JSON.stringify({
            'text': text,
            'language': 'en',
            "score_threshold": 0.6
        });
        console.log(text)
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw,
            redirect: 'follow'
        };

        fetch("https://presidio-analyzer-prod.azurewebsites.net/analyze", requestOptions)
            .then(response => response.json())
            .then(result => setAnalyse(result))
            .catch(error => console.log('error', error));


        console.log(analyse)
        analyse.forEach(obj => {
            delete obj['analysis_explanation'];
            delete obj['recognition_metadata'];
        })

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let rawAno = JSON.stringify({
            "text": text,
            "anonymizers": {
                "DEFAULT": {
                    "type": "replace",
                    "new_value": "ANONYMIZED"
                },
                "PHONE_NUMBER": {
                    "type": "mask",
                    "masking_char": "*",
                    "chars_to_mask": 4,
                    "from_end": true
                }
            },
            "analyzer_results": analyse
        });

        var requestOptionsAno = {
            method: 'POST',
            headers: myHeaders,
            body: rawAno,
            redirect: 'follow'
        };

        fetch("https://presidio-anonymizer-prod.azurewebsites.net/anonymize", requestOptionsAno)
            .then(response => response.text())
            .then(result => setAno(result))
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <div className="d-flex flex-column min-vh-100">
                <Navbar/>
                <main style={{alignSelf: "center", minHeight: "85vh"}}>
                    <div className="h-100">
                        <div style={{marginTop: "10vh"}}>
                            <div>
                                <TextView imgFile={text} onChange={onChange}/>
                                <br/>
                                <br/>

                                <PredictionsView onSubmit={onSubmit}/>
                                {ano}
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