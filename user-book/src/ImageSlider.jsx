import Carousel from 'react-bootstrap/Carousel';
import slide1 from './assets/slide1.webp'
import slide2 from './assets/slide2.webp'
import slide3 from './assets/slide3.webp'
import slide4 from './assets/slide4.webp'
import bok1 from './assets/bok1.jpg'
import bok2 from './assets/bok2.jpg'
function ImageSlider() {
  return (
    <Carousel>
      <Carousel.Item>
<img src={slide1} alt="" className='d-block w-100' />        
      </Carousel.Item>
      <Carousel.Item>
<img src={slide2} alt="" className='d-block w-100' />        
      </Carousel.Item>
      <Carousel.Item>
        <img src={slide3} alt="" className='d-block w-100' />
       
      </Carousel.Item>
      <Carousel.Item>
        <img src={slide4} alt="" className='d-block w-100' />
       
      </Carousel.Item>
    </Carousel>
    
  );
}

export default ImageSlider;