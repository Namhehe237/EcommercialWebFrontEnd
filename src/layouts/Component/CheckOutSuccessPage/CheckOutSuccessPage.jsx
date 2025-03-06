import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Typography, Box, Paper, Grid, Card, CardContent, Divider } from "@mui/material";

const CheckoutSuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (state?.responseData) {
      setResponseData(state.responseData); // Get the response data (e.g., order ID)
    }
    if (state?.cart) {
      setCart(state.cart); // Get the cart (purchased products)
    }
  }, [state]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        height: "100vh",
        backgroundColor: "#f4f4f9",
      }}
    >
      <Paper
        sx={{
          padding: 4,
          maxWidth: 900,
          textAlign: "center",
          boxShadow: 3,
          borderRadius: 2,
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Checkout Successful
        </Typography>
        <Typography variant="body1" paragraph>
          Your order has been successfully placed! Thank you for shopping with us.
        </Typography>
        {responseData && (
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6" color="primary">
              {responseData.split("\n").map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Your order is being processed, and you will receive an email with the details soon.
            </Typography>
          </Box>
        )}

        {/* Display purchased products */}
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" gutterBottom>
            Products You Purchased
          </Typography>
          <Grid container spacing={3}>
            {cart.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="textPrimary">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      ${item.price.toFixed(2)} each
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Quantity: {item.quantity}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1" color="primary">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ marginTop: 4 }}>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            color="primary"
            sx={{
              padding: "12px 24px",
              fontSize: "16px",
              textTransform: "none",
              borderRadius: "8px",
            }}
          >
            Return to Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CheckoutSuccessPage;
