import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Link,
  GlobalStyles,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, ArrowBack } from "@mui/icons-material";
import axios from "axios";
import Logo from "../assets/Logo.jpeg";
import background from "../assets/background.jpeg";

function LoginPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (value) => {
   
    return /^\S+@\S+\.\S+$/.test(value);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setError("Please enter a valid Email.");
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

      const user = users.find((u) => u.email === email && u.password === password);

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
    <>
      
      <GlobalStyles
  styles={`    
    html, body, #root {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
      max-width: 100vw;
      overflow-x: hidden;
    }
  `}
/>


      <Box
        sx={{
          minHeight: "100vh",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          p: 2,
          boxSizing: "border-box",          
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            width: "100%",
            maxWidth: 420,
            textAlign: "center",
            position: "relative",            
            px: { xs: 2, sm: 0 },
          }}
        >
          
          <Box sx={{ mb: 1, mt: { xs: -2, sm: -3, md: -4 } }}>
  <img
    src={Logo}
    alt="Logo"
    style={{
      width: 77,
      height: 80,
      borderRadius: "50%",
      display: "block",
      margin: "0 auto",
      top : "-65px",
      position :"relative"
    }}
  />
</Box>

          
          <Typography
            sx={{
              color: "#0A1E06",
              textAlign: "center",
              fontFamily: '"Overused Grotesk", sans-serif',
              fontSize: { xs: "22px", sm: "31px" },
              fontWeight: 500,
              letterSpacing: "0.62px",
              mb: 1.5,
            }}
          >
            Cloud System
          </Typography>

          
          {step === 1 && (
            <form
              onSubmit={handleNext}
              noValidate 
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#0A1E06",
                  textAlign: "center",
                  fontFamily: '"Overused Grotesk", sans-serif',
                  fontSize: { xs: "13px", sm: "15px" },
                  fontWeight: 400,
                  mb: 1,
                }}
              >
                Please enter your registered Email to Log in
              </Typography>

              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                sx={{                  
                  width: { xs: "100%", sm: "350px" },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "6px",
                    background: "#FFF",
                  },
                }}
              />

              {error && (
                <Typography
                  sx={{
                    color: "#EA3134",
                    fontSize: { xs: "12px", sm: "14px" },
                    textAlign: "center",
                    mt: 1,
                  }}
                >
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                size="small"
                sx={{
                  mt: 2,
                  borderRadius: "50px",
                  background: "#4C33DB",
                  textTransform: "none",
                  fontWeight: "bold",
                  width: { xs: "100%", sm: "120px" },
                  fontSize: { xs: "0.75rem", sm: "0.8rem" },
                }}
              >
                Next →
              </Button>
            </form>
          )}

          
          {step === 2 && (
            <form
              onSubmit={handleLogin}
              noValidate
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#0A1E06",
                  textAlign: "center",
                  fontFamily: '"Overused Grotesk", sans-serif',
                  fontSize: { xs: "13px", sm: "15px" },
                  fontWeight: 400,
                  mb: 1,
                }}
              >
                Please enter your password
              </Typography>

              
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  width: { xs: "100%", sm: "350px" },
                }}
              >
                
                <IconButton
                  onClick={handleBack}
                  aria-label="go back"
                  sx={{
                    minWidth: { xs: 36, sm: 44 },
                    width: { xs: 36, sm: 44 },
                    height: { xs: 36, sm: 44 },
                    backgroundColor: "white",
                    boxShadow: 2,                   
                    borderRadius: "50%",                    
                    flexShrink: 0,
                  }}
                >
                  <ArrowBack sx={{ fontSize: { xs: 18, sm: 22 } }} />
                </IconButton>

               
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          aria-label={showPassword ? "hide password" : "show password"}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "6px",
                      background: "#FFF",
                    },                   
                    ".MuiInputBase-root": {
                      height: { xs: 48, sm: 56 },
                    },
                  }}
                />
              </Box>

             
              <Box display="flex" justifyContent="center" width={{ xs: "100%", sm: "350px" }} mt={1}>
                <Link
                  href="#"
                  underline="hover"
                  sx={{
                    color: "#0A1E06",
                    fontSize: { xs: "12px", sm: "13px" },
                    textDecorationLine: "underline",
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>

              
              <FormControlLabel
                control={
                  <Checkbox checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />
                }
                label={
                  <Typography sx={{ fontSize: { xs: "12px", sm: "13px" } }}>
                    I agree to{" "}
                    <Link href="#" sx={{ textDecorationLine: "underline", color: "#0A1E06" }}>
                      Terms and Conditions
                    </Link>
                  </Typography>
                }
                sx={{ mt: 1 }}
              />

              {error && (
                <Typography
                  sx={{
                    color: "#EA3134",
                    fontSize: { xs: "12px", sm: "14px" },
                    textAlign: "center",
                    mt: 1,
                  }}
                >
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  borderRadius: "50px",
                  background: "#4C33DB",
                  textTransform: "none",
                  fontWeight: "bold",
                  width: { xs: "100%", sm: "120px" },
                  fontSize: { xs: "0.75rem", sm: "0.8rem" },
                }}
              >
                Log in
              </Button>
            </form>
          )}
        </Box>
      </Box>
    </>
  );
}

export default LoginPage;
