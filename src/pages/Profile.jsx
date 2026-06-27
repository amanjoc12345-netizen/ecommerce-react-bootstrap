import React, { useRef, useContext, useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import AuthContext from "../store/AuthContext";
import { firebaseConfig } from "../firebase";

function Profile() {
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;

    if (!enteredPassword || enteredPassword.trim().length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    // Get Firebase API key
    const apiKey = firebaseConfig.apiKey || import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBZhsabDexE9BhcJbGxnZ4DiRlrCN9xe24";
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredPassword,
          newPassword: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Refresh token in context
        authCtx.login(data.idToken, authCtx.email);
        passwordInputRef.current.value = "";
        alert("Password changed successfully!");
      } else {
        let errorMessage = "Password update failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        setError(errorMessage);
        alert(errorMessage);
      }
    } catch (err) {
      setError(err.message || "Something went wrong!");
      alert(err.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center my-5 py-5">
      <Card 
        className="profile-card p-4 text-white shadow" 
        style={{ width: "100%", maxWidth: "450px", backgroundColor: "#38015c", borderRadius: "10px" }}
      >
        <Card.Body>
          <h2 className="text-center mb-4 fw-bold">Your User Profile</h2>
          
          {error && (
            <Alert 
              variant="danger" 
              className="text-start py-2 px-3 mb-3 border-danger-subtle text-danger bg-danger-subtle" 
              style={{ borderRadius: "5px", fontSize: "0.9rem" }}
            >
              {error}
            </Alert>
          )}

          {success && (
            <Alert 
              variant="success" 
              className="text-start py-2 px-3 mb-3 border-success-subtle text-success bg-success-subtle" 
              style={{ borderRadius: "5px", fontSize: "0.9rem" }}
            >
              Password changed successfully!
            </Alert>
          )}

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-4 text-start" controlId="new-password">
              <Form.Label className="fw-semibold">New Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordInputRef}
                required
                placeholder="Enter new password"
                className="auth-input"
              />
            </Form.Group>

            <div className="text-center mb-3">
              <Button
                type="submit"
                className="auth-btn w-100 py-2 fw-bold text-white d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "#1a1a1a",
                  borderColor: "#1a1a1a",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                  minHeight: "42px"
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span 
                    className="spinner-border spinner-border-sm text-light" 
                    role="status" 
                    aria-hidden="true"
                    style={{ width: "1.2rem", height: "1.2rem" }}
                  ></span>
                ) : (
                  "Change Password"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;
