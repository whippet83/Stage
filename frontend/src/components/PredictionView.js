import React from 'react';
import './PredictionView.css'

function PredictionsView(props) {
    // props: { disable, names, probs, onSubmit, spinner }
    let predict = Array(0);
    return (
        <div className="container-fluid">
            <div style={{textAlign:"center"}}>
                <button
                    className="button-Info"
                    type="button"
                    onClick={() => props.onSubmit()}
                >Retrait d'informations</button>

                <div style={{marginTop: "20px"}}>
                    {predict}
                </div>
            </div>
        </div>
    );
}

export default PredictionsView;