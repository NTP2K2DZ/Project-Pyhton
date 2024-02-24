import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Img2 from '../img/img2.jpg';
import Img3 from '../img/img3.jpg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
function Hero() {
  return (
    <section className="h-[800px] bg-hero 
    bg-no-repeat bg-cover bg-center py-24"
    >
      <Carousel className="container mx-auto flex justify-around h-full" autoPlay infiniteLoop showThumbs={false} interval={5000} stopOnHover={false}>
        <div className=" lg:block">
          <img src={Img2} alt='' />
        </div>
        <div>
          <img src={Img3} alt='' />
        </div>
      </Carousel>
    </section>
  );
}

export default Hero


