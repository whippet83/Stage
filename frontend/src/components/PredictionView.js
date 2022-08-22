import React from 'react';


const colors = ["bg-success", "", "bg-warning", "bg-danger", "bg-info"];

function ProgressBar(props) {
    // props: name, prob, colorId
    let progressBarClass = "progress-bar progress-bar-striped progress-bar-animated " + colors[props.colorId];
    let style = {
        width: `${props.prob}%`
    }
    return (
        <div>
            {props.name + " (" + props.prob + "%)"}
            <div className="progress">
                <div
                    className={progressBarClass}
                    role="progressbar"
                    style={style}
                    aria-valuenow={props.prob}
                    aria-valuemin="0"
                    aria-valuemax="100"
                ></div>
            </div>
        </div>
    );
}

function PredictionsView(props) {
    // props: { disable, names, probs, onSubmit, spinner }
    let predict = Array(0);
    for (let i = 0; i < props.names.length; ++i) {
        predict.push(<ProgressBar name={props.names[i]} prob={props.probs[i]} colorId={i} key={i}/>)
    }
    return (
        <div className="container-fluid">
            <div style={{textAlign:"center"}}>
                <button
                    className="button-Info"
                    type="button"
                    onClick={() => props.onSubmit()}
                >Retrait d'informations</button>
                <div className={props.spinner ? "spinner" : ""} role="status"/>

                <div style={{marginTop: "20px"}}>
                    {predict}
                </div>
            </div>
        </div>
    );
}

export default PredictionsView;