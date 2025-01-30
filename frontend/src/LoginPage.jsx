import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Se till att denna import är korrekt
import styles from "./LoginRegisterPage.module.css"; // Importera din CSS-modul här

function LoginRegisterPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // För att spara meddelandet som ska visas
  const [showMessage, setShowMessage] = useState(false); // För att visa eller dölja meddelandet

  const navigate = useNavigate(); // Initiera 'navigate' här med useNavigate-hook

  const displayMessage = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000); // Meddelandet försvinner efter 3 sekunder
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      displayMessage("Passwords do not match!");
      return;
    }

    const url = isLogin
      ? "http://localhost:5001/login"
      : "http://localhost:5001/register";
    const payload = { email, password };

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
