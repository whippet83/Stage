import React from "react";
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/'
import {Nav, Navbar, NavDropdown} from "react-bootstrap";

// import {UserAuth} from "../context/AuthContext";
// import {useNavigate} from "react-router-dom";

function Header() {
    // const{user,logout} = UserAuth();
    // const navigate = useNavigate();
    //
    // const handleLogout = async () =>{
    //     try{
    //         await logout()
    //         navigate('/')
    //         console.log('You are logged out')
    //     }catch (e) {
    //         console.log(e.message)
    //     }
    // }


    return (
        <>
            <Navbar style={{marginBottom: "30px", backgroundColor: "#0b2e4a"}} fixed="top" expand="lg" variant="dark" collapseOnSelect>
                <Navbar.Brand>
                    <h5 className="text-white" style={{paddingLeft:"50px"}}>Anonymisation de données</h5>
                </Navbar.Brand>
                <Navbar.Toggle className="navbar-light"/>
                <Navbar.Collapse>
                    <Nav className="ms-auto" style={{paddingRight:"50px"}}>
                        <Nav.Link className="pl-4 text-white">À propos de nous</Nav.Link>
                        <Nav.Link className="pl-4 text-white"> Nous contacter</Nav.Link>
                        <NavDropdown title={<span className="pl-4 text-white">Compte</span>} className="pl-4 pr-4" align="end">
                            <NavDropdown.Item href="/account">Paramètres</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/">Déconnecter</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default Header;