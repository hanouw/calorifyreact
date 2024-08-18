import Carousel from 'react-bootstrap/Carousel';

function SlideShowCase() {
  return (
    <div class="d-flex justify-content-center">
        <Carousel className="carousel">
        <Carousel.Item className="carousel-items">
            <img 
                className="slide1"
                src='/assets/imgs/showcaseimage/1.PNG'
                width="300"
                height="100"
            />
            <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img 
                className="slide1"
                src='/assets/imgs/showcaseimage/2.PNG'
                width="300"
            />
            <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img 
                className="slide1"
                src='/assets/imgs/showcaseimage/3.PNG'
                width="300"
            />
            <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img 
                className="slide1"
                src='/assets/imgs/showcaseimage/4.PNG'
                width="300"
            />
            <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
    </div>

  );
}

export default SlideShowCase;