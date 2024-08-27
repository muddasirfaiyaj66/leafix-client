import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.1, 
  });

  return (
    <div
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {inView && (
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="relative z-10 text-center font-primary text-white bg-black p-5 bg-opacity-5 rounded-md">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold">
          {" "}
          Grow <span className="text-secondary">Your Garden</span> with Us!
        </h1>
        <p className="mt-4 text-lg md:text-2xl lg:text-4xl">
          Explore Our Wide Range of{" "}
          <span className="text-secondary">Plants</span> and{" "}
          <span className="text-secondary">Gardening</span> Supplies
        </p>

        <Link to="/shop">
          {" "}
          <button className="btn px-8 py-2 text-2xl font-primary hover:bg-green-700 bg-primary text-white mt-5 border border-primary ">
            Shop Now
          </button>
        </Link>
      </div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export default HeroSection;
