import React, {Component, useEffect, useState} from "react";
import "../App.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import TextView from "../components/TextView";
import PredictionsView from "../components/PredictionView";
import {Document, Packer, Paragraph, TextRun,} from 'docx';
import Docxtemplater from "docxtemplater";
import PizzZip from "pizzip"
import {saveAs} from 'file-saver';

function App() {

    const [text, setText] = useState("");
    const [newText, setNewText] = useState("");
    const [analyse, setAnalyse] = useState([]);
    const [ano, setAno] = useState("");
    const [filename, setFilename] = useState("");
    let newFileName = "";

    async function Analyze(requestOptions) {
        const res = await fetch("https://presidio-analyzer-prod.azurewebsites.net/analyze", requestOptions)
        const data = await res.json();
        console.log(data)

        return data
    }

    async function Anonymize(requestOptionsAno){
        const res = await fetch("https://presidio-anonymizer-prod.azurewebsites.net/anonymize", requestOptionsAno)
        const data = await res.json();
        console.log(data)

        return data
    }

    const onChange = async (e) => {
        let name = `${e.target.files[0].name}`;
        let test = name.split('.')
        newFileName = `${test[0]}_Anonymize.docx`
        setFilename(newFileName)
        console.log(filename)

        e.preventDefault()
        if (e.target.files.length === 0) {
            return;
        }
        const reader = new FileReader();

        if (`${e.target.files[0].name}`.includes(".txt")) {
            let file
            reader.onload = (e) => {
                file = e.target.result;
                setText(file);
                setNewText(file);
            }
            reader.readAsText(e.target.files[0])

        } else {
            reader.onload = async (e) => {
                const content = e.target.result;
                let doc = new Docxtemplater(new PizzZip(content), {
                    delimiters: {
                        start: '12op1j2po1j2poj1po',
                        end: 'op21j4po21jp4oj1op24j'
                    },
                    linebreaks: true
                })
                let file = doc.getFullText();
                setText(file)
                setNewText(file);
            }
            reader.readAsBinaryString(e.target.files[0])
        }
    }

    const onSubmit = async () => {

        let raw = JSON.stringify({
            'text': text,
            'language': 'en',
            "score_threshold": 0.6
        });
        console.log(text)
        let requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: raw,
            redirect: 'follow'
        };

        await setAnalyse(await Analyze(requestOptions))

        console.log(analyse)
        console.log(filename)
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
            "analyzer_results": await Analyze(requestOptions)
        });

        var requestOptionsAno = {
            method: 'POST',
            headers: myHeaders,
            body: rawAno,
            redirect: 'follow'
        };

        await setAno(await Anonymize(requestOptionsAno))
        console.log(ano)
    }

    const onClick = () => {

        console.log(newFileName)
        let word = JSON.stringify(ano.text);
        let newWord = word.substring(1, word.length - 1)
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun(newWord)
                            ],
                        }),
                    ],
                },
            ],
        });

        Packer.toBlob(doc).then(blob => {
            console.log(blob);
            saveAs(blob, filename)
            console.log("Document created successfully");
        });
    }

    return (
        <>
            <div className="d-flex flex-column min-vh-100">
                <Navbar/>
                <main style={{alignSelf: "center", minHeight: "85vh"}}>
                    <div className="h-100">
                        <div className="mx-auto container-fluid" style={{marginTop: "10vh", width: "90%"}}>
                            <div>
                                <TextView imgFile={text} onChange={onChange}/>
                                <br/>
                                {ano === "" ? <div/> :
                                    <div className="mx-auto container-fluid card bg-light" style={{padding: "1%"}}>
                                        <p><strong>Informations de l'anonymisation</strong></p>
                                        {JSON.stringify(ano)}
                                    </div>}

                                <br/>
                                {ano === "" ? <div/> :
                                    <div className="mx-auto container-fluid card bg-light" style={{padding: "1%"}}>
                                        <p><strong>Voici les modifications au fichier</strong></p>
                                        {JSON.stringify(ano.text)}
                                        <p></p>
                                        <div>
                                            <button className="button-download" onClick={onClick}>T??l??charger fichier
                                                word
                                            </button>
                                        </div>
                                    </div>}

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