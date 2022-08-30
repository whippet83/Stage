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
        <div className="card bg-light" style={props.imgFile === "" ? {height: "500px"} : {paddingTop:"100px"}}>
            {props.imgFile !== "" ?
                props.imgFile.toString().split('&').map(line =>
                    <p style={{fontSize:"20px",paddingLeft:"20px", paddingRight:"20px"}}>{line}</p>)
                :
                <div className="mx-auto container-fluid">
                    <div>
                        <div>
                            <img className="img-fluid" src={image} alt="" style={{height: "470px",
                                width: "1105px", minWidth: "500px"}}/>
                            {/*1105px*/}
                        </div>
                        <div style={{textAlign:"center"}}>
                            <span style={{textAlign: "center"}}>
                                <strong>Aucun fichier sélectionner</strong>
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
                            accept=".txt, .doc, .docx, .pdf, .pptx"
                            onChange={(event) => props.onChange(event)}
                        />
                    </div>
                }
            </div>
        </div>
    );
}

export default TextView;
