import React, { useRef, useState } from "react";
import { Container, Form, Button, Card, Spinner, Alert } from "react-bootstrap";

function ContactUs() {
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitFormHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const contactData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
    };

    try {
      const response = await fetch("https://react-project-14d85-default-rtdb.firebaseio.com/contacts.json", {
        method: "POST",
        body: JSON.stringify(contactData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while submitting your request.");
      }

      setSuccess(true);
      
      // Reset inputs
      nameRef.current.value = "";
      emailRef.current.value = "";
      phoneRef.current.value = "";
    } catch (err) {
      setError(err.message || "Failed to submit request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact-us" className="my-5">
      <Container className="d-flex flex-column align-items-center">
        <h2 className="mb-4 text-center fw-bold text-uppercase" style={{ letterSpacing: "1px" }}>Contact Us</h2>
        <Card 
          className="p-4 border-0 shadow-sm w-100" 
          style={{ maxWidth: "500px", borderRadius: "12px", background: "white" }}
        >
          <Card.Body>
            <p className="text-muted text-center mb-4">
              Have questions or feedback? Fill out the form below and we will get back to you as soon as possible.
            </p>

            {success && (
              <Alert variant="success" className="text-center">
                Thank you! Your information has been stored successfully.
              </Alert>
            )}

            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}

            <Form onSubmit={submitFormHandler}>
              <Form.Group className="mb-3 text-start" controlId="name">
                <Form.Label className="fw-semibold text-secondary small text-uppercase">Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={nameRef}
                  required
                  placeholder="Enter your name"
                />
              </Form.Group>

              <Form.Group className="mb-3 text-start" controlId="email">
                <Form.Label className="fw-semibold text-secondary small text-uppercase">Email ID</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  placeholder="Enter your email"
                />
              </Form.Group>

              <Form.Group className="mb-4 text-start" controlId="phone">
                <Form.Label className="fw-semibold text-secondary small text-uppercase">Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  ref={phoneRef}
                  required
                  placeholder="Enter your phone number"
                />
              </Form.Group>

              <div className="text-center">
                <Button
                  type="submit"
                  variant="info"
                  disabled={isLoading}
                  className="px-5 py-2 fw-bold text-white shadow-sm text-uppercase"
                  style={{ borderRadius: "30px", letterSpacing: "0.5px" }}
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

export default ContactUs;
