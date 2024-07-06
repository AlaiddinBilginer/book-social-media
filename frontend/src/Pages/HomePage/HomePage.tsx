import AuthorTextArticle from '../../Components/HomePageComponents/AuthorTextArticle/AuthorTextArticle';
import MainHero from '../../Components/HomePageComponents/MainHero/MainHero';
import SecondHero from '../../Components/HomePageComponents/SecondHero/SecondHero';
import SearchForm from '../../Components/SearchForm/SearchForm';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="shadow-xl">
        <SearchForm searchType="book" />
        <MainHero />
      </div>
      <div className="flex lg:justify-between lg:items-start lg:flex-row shadow-xl mt-12 flex-col text-center items-center lg:text-start">
        <SecondHero />
        <div className="lg:flex lg:flex-col lg:justify-center lg:items-center lg2:mr-32 lg:mr-0 sm:mr-50">
          <SearchForm searchType="author" />
          <AuthorTextArticle />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
