import Navbar from '../components/Navbar';
import Slide from '../components/Slide';
import Data from '../components/axios';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import Listings from '../components/Listings';
import ListingCard from '../components/ListingCard';
import Feedback from './Feedback'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Slide/>
    <Categories />
    {/* <Data /> */}

    <Listings/>
    <Feedback/>
    {/* <ListingCard/> */}
    <Footer/>

    </>
  )
}

export default Home;
