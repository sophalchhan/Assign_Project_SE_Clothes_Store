import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faShieldAlt,
  faHeadset,
  faRecycle,
  faAward,
  faUsers,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Headercomponent from "../../components/headercomponent/Headercomponent";
import Footercomponent from "../../components/footercomponent/Footercomponent";
import "./AboutPage.css";

const AboutPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: "Passionate about sustainable fashion and creating timeless pieces."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Head Designer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: "Bringing innovative designs and trends to life."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Customer Experience",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: "Dedicated to ensuring every customer has an amazing shopping experience."
    }
  ];

  const features = [
    {
      icon: faTruck,
      title: "Free Shipping",
      description: "Free shipping on all orders over $50"
    },
    {
      icon: faShieldAlt,
      title: "Secure Payment",
      description: "Your payment information is safe and secure"
    },
    {
      icon: faHeadset,
      title: "24/7 Support",
      description: "Round-the-clock customer support"
    },
    {
      icon: faRecycle,
      title: "Sustainable Fashion",
      description: "Eco-friendly and ethically sourced materials"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "5+", label: "Years Experience" },
    { number: "100+", label: "Brand Partners" },
    { number: "24/7", label: "Customer Support" }
  ];

  return (
    <div className="about-page">
        <Headercomponent />
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">Our Story</h1>
              <p className="lead mb-4">
                Founded in 2019, Clothes Store began with a simple mission: to provide 
                high-quality, sustainable fashion that makes you look good and feel even better. 
                We believe that great style shouldn't come at the expense of our planet.
              </p>
              <p className="mb-4">
                From our humble beginnings as a small boutique to becoming a trusted name 
                in sustainable fashion, we've remained committed to our core values of 
                quality, sustainability, and exceptional customer service.
              </p>
            </div>
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Our Store" 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <FontAwesomeIcon icon={faHeart} className="text-primary mb-3" size="2x" />
                  <h3 className="h4 mb-3">Our Mission</h3>
                  <p className="mb-0">
                    To revolutionize the fashion industry by providing sustainable, 
                    high-quality clothing that empowers individuals to express their 
                    unique style while protecting our planet for future generations.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <FontAwesomeIcon icon={faAward} className="text-primary mb-3" size="2x" />
                  <h3 className="h4 mb-3">Our Vision</h3>
                  <p className="mb-0">
                    To become the world's most trusted sustainable fashion brand, 
                    inspiring positive change in the industry and creating a community 
                    of conscious consumers who value quality, style, and sustainability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Why Choose Us</h2>
            <p className="lead text-muted">We're committed to providing the best shopping experience</p>
          </div>
          <div className="row">
            {features.map((feature, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div className="text-center">
                  <div className="feature-icon mb-3">
                    <FontAwesomeIcon icon={feature.icon} size="3x" className="text-primary" />
                  </div>
                  <h5 className="fw-bold mb-2">{feature.title}</h5>
                  <p className="text-muted">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats py-5 bg-dark text-white">
        <div className="container">
          <div className="row text-center">
            {stats.map((stat, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div className="stat-item">
                  <h3 className="display-4 fw-bold text-primary">{stat.number}</h3>
                  <p className="h5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Meet Our Team</h2>
            <p className="lead text-muted">The passionate people behind Clothes Store</p>
          </div>
          <div className="row">
            {teamMembers.map((member) => (
              <div key={member.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card team-card border-0 shadow-sm h-100">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="card-img-top team-img"
                  />
                  <div className="card-body text-center p-4">
                    <h5 className="card-title fw-bold mb-1">{member.name}</h5>
                    <p className="text-primary mb-2">{member.role}</p>
                    <p className="card-text text-muted">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Our Values</h2>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="text-center">
                <FontAwesomeIcon icon={faStar} className="text-warning mb-3" size="2x" />
                <h5 className="fw-bold mb-2">Quality First</h5>
                <p className="text-muted">
                  We never compromise on quality. Every piece is carefully crafted 
                  and inspected to meet our high standards.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="text-center">
                <FontAwesomeIcon icon={faRecycle} className="text-success mb-3" size="2x" />
                <h5 className="fw-bold mb-2">Sustainability</h5>
                <p className="text-muted">
                  We're committed to eco-friendly practices and sustainable sourcing 
                  throughout our supply chain.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="text-center">
                <FontAwesomeIcon icon={faUsers} className="text-info mb-3" size="2x" />
                <h5 className="fw-bold mb-2">Community</h5>
                <p className="text-muted">
                  We believe in building a community of conscious consumers who 
                  share our values and vision for a better fashion industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footercomponent />
    </div>
  );
};

export default AboutPage;