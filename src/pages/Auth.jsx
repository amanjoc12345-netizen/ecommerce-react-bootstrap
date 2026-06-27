import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import AuthContext from "../store/AuthContext";
import { firebaseConfig } from "../firebase";

// Helper function to map Firebase REST API errors to Firebase SDK style strings
const getFriendlyErrorMessage = (serverError) => {
  if (!serverError) return null;
  const message = typeof serverError === "string" ? serverError : (serverError.message || "");
  
  if (message.includes("EMAIL_EXISTS")) {
    return "Firebase: Error (auth/email-already-in-use).";
  }
  if (message.includes("INVALID_LOGIN_CREDENTIALS") || message.includes("INVALID_PASSWORD") || message.includes("EMAIL_NOT_FOUND")) {
    return "Firebase: Error (auth/invalid-credential).";
  }
  if (message.includes("WEAK_PASSWORD")) {
    return "Firebase: Error (auth/weak-password).";
  }
  if (message.includes("INVALID_EMAIL")) {
    return "Firebase: Error (auth/invalid-email).";
  }
  if (message.includes("USER_DISABLED")) {
    return "Firebase: Error (auth/user-disabled).";
  }
  if (message.includes("API KEY NOT VALID") || message.includes("API_KEY_INVALID")) {
    return "Firebase: Error (auth/invalid-api-key).";
  }
  
  // Dynamic replacement for other codes to match SDK-like format
  const formattedCode = message.toLowerCase().replace(/_/g, "-");
  return `Firebase: Error (auth/${formattedCode}).`;
};

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setError(null); // Clear errors when toggling modes
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (!enteredEmail || !enteredPassword) {
      setError("Please enter a valid email and password.");
      return;
    }

    setIsLoading(true);
    setError(null); // Clear previous errors

    const apiKey = firebaseConfig.apiKey || import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBZhsabDexE9BhcJbGxnZ4DiRlrCN9xe24";
    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        authCtx.login(data.idToken, data.email);
        navigate("/store");
      } else {
        let errorMessage = "Authentication failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        const friendlyError = getFriendlyErrorMessage(errorMessage);
        setError(friendlyError);
        alert(friendlyError);
      }
    } catch (err) {
      const errorMsg = err.message || "Something went wrong! Please try again.";
      setError(errorMsg);
      alert(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center my-5 py-5">
      <Card 
        className="auth-card p-4 text-white shadow" 
        style={{ width: "100%", maxWidth: "450px", backgroundColor: "#38015c", borderRadius: "10px" }}
      >
        <Card.Body>
          <h2 className="text-center mb-4 fw-bold">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          
          {error && (
            <Alert 
              variant="danger" 
              className="text-start py-2 px-3 mb-3 border-danger-subtle text-danger bg-danger-subtle" 
              style={{ borderRadius: "5px", fontSize: "0.9rem" }}
            >
              {error}
            </Alert>
          )}

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3 text-start" controlId="email">
              <Form.Label className="fw-semibold">Your Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailInputRef}
                required
                placeholder="Enter email"
                className="auth-input"
              />
            </Form.Group>

            <Form.Group className="mb-4 text-start" controlId="password">
              <Form.Label className="fw-semibold">Your Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordInputRef}
                required
                placeholder="Enter password"
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
                  isLogin ? "Login" : "Sign Up"
                )}
              </Button>
            </div>
            
            <div className="text-center mt-3">
              <button
                type="button"
                className="auth-toggle-btn bg-transparent border-0 text-info fw-semibold"
                onClick={switchAuthModeHandler}
                style={{ fontSize: "0.95rem" }}
              >
                {isLogin ? "Create new account" : "Login with existing account"}
              </button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Auth;

