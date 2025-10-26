import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faClock,
  faPaperPlane,
  faHeadset,
  faStore,
  faUser,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import Headercomponent from "../../components/headercomponent/Headercomponent";
import Footercomponent from "../../components/footercomponent/Footercomponent";
import "./ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: faPhone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm"
    },
    {
      icon: faEnvelope,
      title: "Email",
      details: "hello@clothesstore.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: faMapMarkerAlt,
      title: "Store Location",
      details: "123 Fashion Street, Style City",
      description: "Visit our flagship store"
    },
    {
      icon: faClock,
      title: "Store Hours",
      details: "Mon-Sat: 9AM - 9PM",
      description: "Sunday: 10AM - 6PM"
    }
  ];

  const faqItems = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all items in original condition with tags attached."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email to monitor your delivery."
    },
    {
      question: "Do you have a physical store?",
      answer: "Yes! Visit our flagship store at 123 Fashion Street, Style City. We'd love to see you!"
    }
  ];

  return (
    <div className="contact-page">
        <Headercomponent />
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-4 fw-bold text-white mb-4">Get In Touch</h1>
              <p className="lead text-white mb-0">
                We're here to help you look and feel your best. Reach out to us with any questions!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info py-5">
        <div className="container">
          <div className="row">
            {contactInfo.map((item, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div className="contact-card text-center p-4 h-100">
                  <div className="contact-icon mb-3">
                    <FontAwesomeIcon icon={item.icon} size="2x" />
                  </div>
                  <h5 className="fw-bold mb-2">{item.title}</h5>
                  <p className="h6 text-primary mb-2">{item.details}</p>
                  <p className="text-muted small">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="contact-main py-5 bg-light">
        <div className="container">
          <div className="row">
            {/* Contact Form */}
            <div className="col-lg-8 mb-5">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-md-5">
                  <div className="text-center mb-4">
                    <FontAwesomeIcon icon={faComment} className="text-primary mb-3" size="2x" />
                    <h2 className="h3 fw-bold mb-2">Send us a Message</h2>
                    <p className="text-muted">Fill out the form below and we'll get back to you ASAP</p>
                  </div>

                  {submitStatus === "success" && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      <strong>Success!</strong> Your message has been sent. We'll get back to you soon!
                      <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setSubmitStatus(null)}
                      ></button>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label">
                          <FontAwesomeIcon icon={faUser} className="me-2" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label">
                          <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="subject" className="form-label">Subject *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="What is this regarding?"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="message" className="form-label">Message *</label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Store Info & FAQ */}
            <div className="col-lg-4">
              {/* Store Info */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <div className="text-center mb-3">
                    <FontAwesomeIcon icon={faStore} className="text-primary mb-2" size="2x" />
                    <h5 className="fw-bold">Visit Our Store</h5>
                  </div>
                  <div className="store-info">
                    <p className="mb-3">
                      <strong>Address:</strong><br />
                      123 Fashion Street<br />
                      Style City, SC 12345<br />
                      United States
                    </p>
                    <p className="mb-3">
                      <strong>Phone:</strong><br />
                      +1 (555) 123-4567
                    </p>
                    <p className="mb-0">
                      <strong>Email:</strong><br />
                      store@clothesstore.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick FAQ */}
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="text-center mb-3">
                    <FontAwesomeIcon icon={faHeadset} className="text-primary mb-2" size="2x" />
                    <h5 className="fw-bold">Quick Answers</h5>
                  </div>
                  <div className="faq-list">
                    {faqItems.map((item, index) => (
                      <div key={index} className="faq-item mb-3">
                        <h6 className="fw-bold text-dark mb-1">{item.question}</h6>
                        <p className="text-muted small mb-0">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container-fluid p-0">
          <div className="map-placeholder">
            <div className="map-overlay">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="map-info-card">
                      <h4 className="fw-bold mb-3">Find Our Store</h4>
                      <p className="mb-3">
                        Visit our flagship store in the heart of Style City. 
                        We offer personalized styling services and you can try on 
                        all your favorite pieces.
                      </p>
                      <div className="store-features">
                        <div className="feature-item mb-2">
                          <FontAwesomeIcon icon={faUser} className="text-primary me-2" />
                          Personal Styling Available
                        </div>
                        <div className="feature-item mb-2">
                          <FontAwesomeIcon icon={faClock} className="text-primary me-2" />
                          Extended Holiday Hours
                        </div>
                        <div className="feature-item">
                          <FontAwesomeIcon icon={faHeadset} className="text-primary me-2" />
                          Free Parking Available
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Note: In a real application, you would embed a Google Map or similar service here */}
            <div className="map-container">
              <div className="map-fallback text-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" className="text-muted mb-3" />
                <h5>Interactive Map</h5>
                <p className="text-muted">Map would be embedded here in production</p>
                <button className="btn btn-outline-primary mt-2">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 bg-dark text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h3 className="h2 fw-bold mb-2">Need Immediate Assistance?</h3>
              <p className="lead mb-0">
                Call us now and speak directly with our customer service team.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <a href="tel:+15551234567" className="btn btn-primary btn-lg">
                <FontAwesomeIcon icon={faPhone} className="me-2" />
                Call Now: (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footercomponent />
    </div>
  );
};

export default ContactPage;