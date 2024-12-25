import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>About Us</h5>
            <p>
              We are dedicated to providing high-quality services to meet all
              your needs. Contact us for more information.
            </p>
          </div>
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#home" className="text-light text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-light text-decoration-none">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="text-light text-decoration-none">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-light text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <p>
              Facebook: facebook.com/vuong.minion.3
              <br />
              Phone: +84 866014623
            </p>
          </div>
        </div>
        <div className="text-center mt-3">
          <p className="mb-0">&copy; 2024 MyWebsite. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
