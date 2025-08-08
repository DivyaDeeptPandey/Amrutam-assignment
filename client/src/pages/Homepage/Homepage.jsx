import NavBar from '../../components/NavBar/NavBar.jsx'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import HeroBanner from '../../sections/HeroBanner/HeroBanner.jsx'
import BestsellersSection from '../../sections/BestSeller/BestSellerSection.jsx'
import FeaturedCategories from '../../sections/FeaturedCategories/FeaturedCategories.jsx'
import TrendingOffers from '../../sections/TrendingOffers/TrendingOffers.jsx'
import Footer from '../../components/Footer/Footer.jsx'

function HomePage() {
  return (
    <>
      <NavBar />
      <SearchBar />
      <HeroBanner />
      <BestsellersSection />
      <FeaturedCategories />
      <TrendingOffers />
      <Footer />
    </>
  );
}
export default HomePage;