import React, {useState} from 'react';
import upload from "../images/upload.svg"
import image from "../images/nopaper.JPG";

function TextView(props) {
    // props: {imgFile, onChange, disabled}
    // <p style={{fontSize:"20px", marginTop:"50px" , padding:"20px"}}>{}</p>
    // let split = []
    // if (props.imgFile !== null){
    //     split = props.imgFile.toString().split('&')
    // }
    return (
        <div className="card bg-light" style={props.imgFile === null ? {height: "500px"} : {paddingTop:"100px"}}>
            {props.imgFile != null ?
                props.imgFile.toString().split('&').map(line =>
                    <p style={{fontSize:"20px",paddingLeft:"20px", paddingRight:"20px"}}>{line}</p>)
                :
                <div className="mx-auto container-fluid">
                    <div>
                        <div>
                            <img className="img-fluid" src={image} alt="" style={{height: "450px",
                                width: "1105px", minWidth: "500px"}}/>
                            {/*1105px*/}
                        </div>
                        <div style={{textAlign:"center"}}>
                            <span style={{textAlign: "center"}}>
                                <strong>Cliquez sur le bouton dans le coin supérieur gauche pour télécharger un fichier texte</strong>
                            </span>
                        </div>
                    </div>
                </div>
            }
            <div className="card-img-overlay">
                {props.disabled ? <div/> :
                    <div>
                        <input
                            className="inputfile"
                            type="file"
                            id="file"
                            accept=".txt, .doc, .docx"
                            onChange={(event) => props.onChange(event)}
                        />
                        <label htmlFor="file">
                            <img className="upload" src={upload} alt="Upload"/>
                        </label>
                    </div>
                }
            </div>
        </div>
    );
}

export default TextView;
