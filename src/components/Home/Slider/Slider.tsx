import "./style.css";
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Container from "../../ui/Container";

// Plugin to create a 3D rotating effect
const carousel: KeenSliderPlugin = (slider) => {
  const z = 300; // Distance for 3D effect
  function rotate() {
    const deg = 360 * slider.track.details.progress;
    slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`;
  }
  slider.on("created", () => {
    const deg = 360 / slider.slides.length;
    slider.slides.forEach((element, idx) => {
      element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`;
    });
    rotate();
  });
  slider.on("detailsChanged", rotate);
};

const Slider = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      selector: ".carousel__cell",
      renderMode: "custom",
      mode: "free-snap",
    },
    [carousel]
  );

  return (
    <Container>
      <h1></h1>
      <div className="wrapper">
        <div className="scene my-10">
          <div className="carousel keen-slider" ref={sliderRef}>
            <div className="carousel__cell number-slide1"></div>
            <div className="carousel__cell number-slide2"></div>
            <div className="carousel__cell number-slide3"></div>
            <div className="carousel__cell number-slide4"></div>
            <div className="carousel__cell number-slide5"></div>
            <div className="carousel__cell number-slide6"></div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Slider;
