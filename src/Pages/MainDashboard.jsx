// import React from "react";
// import { Button, Container, Typography, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// function MainDashboard() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//  const handleLogout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
  

//   window.dispatchEvent(new Event("storage"));

//   navigate("/login");
// };


//   return (
//      <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "linear-gradient(to right, #a1c4fd, #c2e9fb, #fbc2eb, #fdd3e0)",
//       }}
//     >
//     <Container sx={{ mt: 10 }}>
//       <Typography variant="h4" gutterBottom>
//         Welcome, {user?.name || "User"}!
//       </Typography>
//       <Button variant="contained" color="secondary" onClick={handleLogout}>
//         Logout
//       </Button>
//     </Container>
//     </Box>
//   );
// }

// export default MainDashboard;


//Testing

import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MainDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column", // Stack vertically
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right, #a1c4fd, #c2e9fb, #fbc2eb, #fdd3e0)",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name || "User"}!
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{ mt: 2 }}
      >
        Logout
      </Button>
    </Box>
  );
}

export default MainDashboard;
