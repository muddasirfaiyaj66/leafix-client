import HeroSection from "../../components/HeroSection/HeroSection";
import PopularCategories from "../../components/Home/popularCategory/PopularCategories";
import Slider from "../../components/Home/Slider/Slider";
import ProductSection from "../../components/ProductsSection/ProductSection";


const Home = () => {
    return (
        <div className="min-h-screen ">
           <HeroSection></HeroSection>
           <ProductSection></ProductSection>
           <PopularCategories/>
           <Slider></Slider>
        </div>
    );
};

export default Home;