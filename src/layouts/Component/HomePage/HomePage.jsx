import React from 'react';
import electronicImage from '../../../assets/electronic.avif';
import fashionImage from '../../../assets/fashion.avif';
import homeImage from '../../../assets/home.avif';
import { Link } from "react-router-dom";
import "../../../style/HomePage/HomePage.css"; // Import CSS file

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to NamHehe Ecommercial Web</h1>
        <p>Your one-stop shop for all your needs!</p>
      </header>

      <section className="home-intro">
        <h2>About Us</h2>
        <p>
          At NamHehe Ecommercial Web, we provide a wide range of products at
          unbeatable prices. Explore our categories, enjoy exclusive deals, and
          experience seamless shopping.
        </p>
      </section>

      <section className="home-features">
        <h2>Why Shop With Us?</h2>
        <ul>
          {[
            'Wide variety of products',
            'Fast and secure checkout',
            'Exclusive deals and discounts',
            '24/7 customer support',
          ].map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>

      <section className="home-categories">
        <h2>Popular Categories</h2>
        <div className="categories">
          {[
            { title: 'Electronics', img: electronicImage },
            { title: 'Fashion', img: fashionImage },
            { title: 'Home & Living', img: homeImage },
          ].map((category, index) => (
            <div key={index} className="category-item">
              <img src={category.img} alt={category.title} />
              <h3>{category.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <div className="explore-products-link">
        <Link to="/products">
          Explore all our products 👉
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
