import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../css/urbanNest.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div className="carousel-item">
          <img src="imgs/marriot1.jpg" className="carousel-image" alt="Offer 1" />
          <div className="carousel-content">
            <h3 className="carousel-title">Offers</h3>
            <p className="carousel-description">Promotions, deals and special offers for you</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="imgs/Hilton1.jpg" className="carousel-image" alt="Offer 2" />
          <div className="carousel-content">
            <h3 className="carousel-title">Dream holidays</h3>
            <p className="carousel-description">Get inspired, compare and book hotels with more flexibility</p>
           
          </div>
        </div>
        <div className="carousel-item">
          <img src="imgs/marriot2.jpg" className="carousel-image" alt="Offer 3" />
          <div className="carousel-content">
            <h3 className="carousel-title">New year, new adventures</h3>
            <p className="carousel-description">Save 15% or more when you book and stay before 1 April 2024</p>
          
          </div>
        </div>
        <div className="carousel-item">
          <img src="imgs/Hilton2.jpg" className="carousel-image" alt="Offer 4" />
          <div className="carousel-content">
            <h3 className="carousel-title">Seize the moment</h3>
            <p className="carousel-description">Save 15% or more when you book and stay before 1 October 2024</p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
