import React, {Component} from "react";
import "../App.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import TextView from "../components/TextView";
import PredictionsView from "../components/PredictionView";

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            imgFile: null,
            spinner: false,
            disabled: true,
            names: [],
            probs: []
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        event.preventDefault();
        if (event.target.files.length === 0) {
            return;
        }
        let text;
        const reader = new FileReader();
        reader.onload = (event) => {
            text = event.target.result;

            this.setState({
                imgFile: text,
                disabled: false,
                spinner: false
            });
        }
        reader.readAsText(event.target.files[0])
        this.uploadInput = event.target.files[0];
    }

    render() {

        return (
            <>
                <div className="d-flex flex-column min-vh-100">
                    <Navbar/>
                    <main style={{alignSelf: "center", minHeight: "85vh"}}>
                        <div className="h-100">
                            <div style={{marginTop: "10vh"}}>
                                <div>
                                    <TextView imgFile={this.state.imgFile} onChange={this.onChange}/>
                                    <br/>
                                    <br/>
                                    <PredictionsView
                                        names={this.state.names}
                                        probs={this.state.probs}
                                        disabled={this.state.disabled}
                                        onSubmit={this.onSubmit}
                                        spinner={this.state.spinner}
                                    />
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer/>
                </div>
            </>
        );
    }
}

export default App;