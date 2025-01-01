import React from 'react';
import electronicImage from '../../../assets/electronic.avif';
import fashionImage from '../../../assets/fashion.avif';
import homeImage from '../../../assets/home.avif';
import { Link } from "react-router-dom"; // Import Link

const HomePage = () => {
  return (
    <div
      className="home-container"
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <header
        className="home-header"
        style={{
          background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
          color: '#fff',
          padding: '40px 20px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h1 style={{ fontSize: '3rem', margin: '0' }}>
          Welcome to NamHehe Ecommercial Web
        </h1>
        <p style={{ fontSize: '1.2rem', margin: '10px 0 0' }}>
          Your one-stop shop for all your needs!
        </p>
      </header>

      <section
        className="home-intro"
        style={{
          background: '#fff',
          padding: '30px',
          margin: '20px 0',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>About Us</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', margin: '0' }}>
          At NamHehe Ecommercial Web, we provide a wide range of products at
          unbeatable prices. Explore our categories, enjoy exclusive deals, and
          experience seamless shopping.
        </p>
      </section>

      <section
        className="home-features"
        style={{
          background: '#f0f4f7',
          padding: '30px',
          margin: '20px 0',
          borderRadius: '8px',
        }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>
          Why Shop With Us?
        </h2>
        <ul
          style={{
            listStyle: 'none',
            padding: '0',
            margin: '0',
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          {[
            'Wide variety of products',
            'Fast and secure checkout',
            'Exclusive deals and discounts',
            '24/7 customer support',
          ].map((feature, index) => (
            <li
              key={index}
              style={{
                background: '#fff',
                padding: '15px',
                margin: '10px',
                borderRadius: '8px',
                flex: '1 1 calc(25% - 20px)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                fontSize: '1rem',
                minWidth: '200px',
              }}
            >
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <section
        className="home-categories"
        style={{
          margin: '20px 0',
        }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>
          Popular Categories
        </h2>
        <div
          className="categories"
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          {[
            { title: 'Electronics', img: electronicImage },
            { title: 'Fashion', img: fashionImage },
            { title: 'Home & Living', img: homeImage },
          ].map((category, index) => (
            <div
              key={index}
              className="category-item"
              style={{
                background: '#fff',
                padding: '20px',
                margin: '10px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                flex: '1 1 calc(30% - 20px)',
                maxWidth: '300px',
              }}
            >
              <img
                src={category.img}
                alt={category.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '4px',
                }}
              />
              <h3 style={{ margin: '10px 0 0', fontSize: '1.2rem' }}>
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </section>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Link
          to="/products"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "5px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Explore all our products 👉
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
