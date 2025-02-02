import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Container, Typography, Card, CardContent, CardMedia, Grid, Rating, CircularProgress, Box, Divider 
} from "@mui/material";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const productData = await response.json();
        setProduct(productData);

        const reviewsResponse = await fetch(`http://localhost:8080/api/reviews/product/${productId}`);
        if (!reviewsResponse.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Calculate average rating from reviews
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Typography variant="h6" color="error" align="center" sx={{ mt: 5 }}>
          Product not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Product Information Section */}
      <Card sx={{ display: "flex", boxShadow: 4, borderRadius: 3 }}>
        <CardMedia
          component="img"
          sx={{ width: 300, objectFit: "cover" }}
          image={product.image}
          alt={product.name}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4" color="primary" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Category: {product.category}
          </Typography>
          <Typography variant="h5" sx={{ color: "#e91e63", mt: 1 }}>
            ${product.price}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Rating value={averageRating} readOnly precision={0.5} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({averageRating.toFixed(1)} / 5)
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {product.description}
          </Typography>
        </CardContent>
      </Card>

      {/* Reviews Section */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Customer Reviews
      </Typography>
      <Divider />

      {reviews.length > 0 ? (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {reviews.map((review) => (
            <Grid item xs={12} key={review.id}>
              <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Rating value={review.rating} readOnly precision={0.5} />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {review.rating} / 5
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {review.comment}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" sx={{ mt: 2, color: "textSecondary" }}>
          No reviews available for this product.
        </Typography>
      )}
    </Container>
  );
};

export default ProductDetailsPage;
