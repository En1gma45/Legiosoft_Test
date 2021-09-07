import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import "../AuthPage/AuthPage.scss"

const AuthPage: React.FC = () => {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            redirectHandler()
        }
        setValidated(true);
    };

    const history = useHistory()
    const redirectHandler = () => {
        history.push("/main")
    }

    return (

        <div className="auth__container">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control required type="text" placeholder="Enter your username" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Enter your password" />
                    <Form.Text>
                        We'll never share your password with anyone else.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default AuthPage;
