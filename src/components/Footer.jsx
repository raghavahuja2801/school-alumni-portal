import React from 'react';
import './footer.css'



const Footer = () => {

  return (
    <footer className="footer">
      <div className="top-section">
        <div className="contact">
          <p>Get in Touch:</p>
          <p>P +91 (011) 2574506</p>
          </div>
          <div className='MailUs'>
          <p>Mail us:</p>
          <p>ces@balbharati.org</p>
          <p>For admission inquiry please write email directly to school.</p>
        </div>
        <div className="address">
          <p>Address:</p>
          <p>Child Education Society (Regd)</p>
          <p>C/O Bal Bharati Public School,</p>
          <p>Ganga Ram Hospital Marg,</p>
          <p>New Delhi-110060</p>
        </div>
        <div className="social-media">
          <p>Follow us on:</p>
          <a href="#">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
      <div className="middle-section">
        <div className="explore">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About CES</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Testimonials</a></li>
            <li><a href="#">Gallery</a></li>
          </ul>
        </div>
        <div className="quick-links">
          <ul>
            <li><a href="#">Teacher Training Information</a></li>
            <li><a href="#">Curriculum in Schools</a></li>
            <li><a href="#">Scholarships & Awards</a></li>
            <li><a href="#">Community Initiatives</a></li>
          </ul>
        </div>
        <div className="our-schools">
          <ul>
            <li><a href="#">Our knowledge partners</a></li>
            <li><a href="#">Health & Safety</a></li>
            <li><a href="#">School Policies</a></li>
          </ul>
        </div>
        <div className="media-room">
          <ul>
            <li><a href="#">Coverage</a></li>
            <li><a href="#">Press Releases</a></li>
            <li><a href="#">Resources</a></li>
          </ul>
        </div>
        <div className="other-information">
          <ul>
            <li><a href="#">Code of conduct</a></li>
            <li><a href="#">Cyber safety policy</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="bottom-section">
        <p>&copy; 2024 Bal Bharati Public School</p>
      </div>
    </footer>
  );
};

export default Footer;
