import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import {useRouter} from "next/router";
import {useState} from "react";

const MainNav = () => {
    const router = useRouter();
    const [searchField, setField] = useState();

    const handleSubmit = (e) =>{
        e.preventDefault()
        router.push(`/artwork?title=true&q=${searchField}`)
    }

    return (
        <>
            <Navbar className="fixed-top navbar-dark" bg="primary" expand="lg">
                <Container>
                    <Navbar.Brand>Mayara Rodrigues</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navBarColor01" />
                    <Navbar.Collapse id="navbarColor01">
                        <Nav className="me-auto"
                            style={{ maxHeight: '100px' }}
                            navbarScroll >

                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/search">Advanced Search</Nav.Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={handleSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e) => {setField(e.target.value)}}
                            />
                            <Button type="submit" variant="btn btn-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}

export default MainNav

