import HeroSection from "../../components/HeroSection/HeroSection";
import ProductSection from "../../components/ProductsSection/ProductSection";


const Home = () => {
    return (
        <div className="min-h-screen ">
           <HeroSection></HeroSection>
           <ProductSection></ProductSection>
        </div>
    );
};

export default Home;