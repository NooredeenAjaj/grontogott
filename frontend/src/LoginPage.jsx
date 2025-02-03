import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginRegisterPage.module.css";

function LoginRegisterPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState(""); // Nytt fält för namn
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressPostalCode, setAddressPostalCode] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate();

  const displayMessage = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      displayMessage("Passwords do not match!");
      return;
    }

    if (!isLogin && name.trim() === "") {
      displayMessage("Name is required!");
      return;
    }

    const url = isLogin
      ? "http://localhost:5001/login"
      : "http://localhost:5001/register";
    const payload = isLogin
      ? { email, password }
      : {
          name, // Skickar namnet vid registrering
          email,
          password,
          address_street: addressStreet,
          address_city: addressCity,
          address_postal_code: addressPostalCode,
        };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userToken", data.token);
        navigate("/compose-salad");
        displayMessage(data.message);
      } else {
        displayMessage(data.message || "Error without message from server");
      }
    } catch (error) {
      console.error("Network error:", error);
      displayMessage("Failed to connect to the server.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {showMessage && <div className={styles.message}>{message}</div>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={styles.input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="addressStreet" className={styles.label}>
                Street Address:
              </label>
              <input
                type="text"
                id="addressStreet"
                className={styles.input}
                value={addressStreet}
                onChange={(e) => setAddressStreet(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="addressCity" className={styles.label}>
                City:
              </label>
              <input
                type="text"
                id="addressCity"
                className={styles.input}
                value={addressCity}
                onChange={(e) => setAddressCity(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="addressPostalCode" className={styles.label}>
                Postal Code:
              </label>
              <input
                type="text"
                id="addressPostalCode"
                className={styles.input}
                value={addressPostalCode}
                onChange={(e) => setAddressPostalCode(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <button type="submit" className={styles.submitButton}>
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className={styles.toggleButton}
      >
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default LoginRegisterPage;
