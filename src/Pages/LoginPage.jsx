import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Alert,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, ArrowBack } from "@mui/icons-material";
import axios from "axios";
import Logo from '../assets/Logo.jpeg'



function LoginPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setPassword("");
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (!acceptedTerms) {
      setError("You must agree to the Terms and Conditions.");
      return;
    }

    try {
      const res = await axios.get("http://localhost:3000/users");
      const users = res.data;

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        const token = user.token || "dummy-token";
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("Login failed. Try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #a1c4fd, #c2e9fb, #fbc2eb, #a6c1ee)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
          position: "relative",
        }}
      >
      <Box sx={{  mb: 1 }}>
        <img
         src={Logo}   // use the imported variable
         alt="Logo"
         style={{ width: "77px", height: "80px", borderRadius: "50%", position: "relative",  top: "-80px"}}          
        />
      </Box>

      <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
          Cloud System
      </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}

        {step === 1 && (
          <form
            onSubmit={handleNext}
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            {/* Subtitle above input */}
            <Typography
              variant="body2"
              sx={{ alignSelf: "center", mb: 1, color: "rgba(0,0,0,0.7)", fontWeight :"bold" }}
            >
              Please enter your registered Email to Log in
            </Typography>

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              sx={{ backgroundColor: "white", borderRadius: "8px" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />

          <Button
  fullWidth
  type="submit"
  variant="contained"
  size="small"   // 👈 makes it smaller
  sx={{
    mt: 2,
    borderRadius: "50px",
    textTransform: "none",
    fontWeight: "bold",
    maxWidth: "120px",  // 👈 limit width
    alignSelf: "center", // 👈 center the button
    fontSize: "0.8rem", // 👈 reduce text size
    py: 0.7             // 👈 reduce vertical padding
  }}
>
  Next →
</Button>

          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={handleLogin}
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            {/* Floating back arrow */}
            <IconButton
              onClick={handleBack}
              sx={{
                display : "flex",
                position: "absolute",
                left: -60,
                top: "60%",
                transform: "translateY(-50%)",
                backgroundColor: "white",
                boxShadow: 2,
              }}
            >
              <ArrowBack />
            </IconButton>

            {/* Subtitle above input */}
            <Typography
              variant="body2"
              sx={{ alignSelf: "center", mb: 1, color: "rgba(0,0,0,0.7)", fontWeight :"bold" }}
            >
              Please enter your password
            </Typography>

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              sx={{ backgroundColor: "white", borderRadius: "8px" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box display="flex" justifyContent="space-between" mt={1}>
              <Link href="#" underline="hover" fontSize="small">
                Forgot Password?
              </Link>
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
              }
              label={
                <Typography variant="body2">
                  I agree to{" "}
                  <Link href="#" underline="hover">
                    Terms and Conditions
                  </Link>
                </Typography>
              }
              sx={{ mt: 1 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                borderRadius: "50px",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Log in
            </Button>
          </form>
        )}
      </Box>
    </Box>
  );
}

export default LoginPage;


