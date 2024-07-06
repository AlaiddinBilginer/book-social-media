import { Link } from 'react-router-dom';
import bookImage from './book.png';

const MainHero = () => {
  return (
    <section>
      <div className="container flex flex-col-reverse mx-auto p-8 lg:flex-row">
        <div className="mt-20 flex flex-col space-y-10 mb-44 m-10 lg:m-10 xl:m-20 lg:mt:16 lg:w-1/2 xl:mb-52">
          <h1 className="text-5xl font-bold text-center lg:text-6xl lg:max-w-md lg:text-left mt-6">
            Hoş Geldin!
          </h1>
          <p className="text-2xl text-center text-gray-400 lg:max-w-xl lg:text-left">
            Kitap tutkunları için tasarlanmış bu platformda, sadece kitapları değil, hayatı
            keşfedeceksiniz.
          </p>
          <div className="mx-auto lg:mx-0">
            <Link
              to="/book"
              className="py-5 px-10 text-2xl font-bold text-white bg-green-400 rounded lg:py-4 hover:opacity-70"
            >
              Kitapları İncele
            </Link>
          </div>
        </div>
        <div className="flex justify-center sm:flex sm:justify-center">
          <img src={bookImage} alt="" className="h-80 lg:h-180 lg:w-180 sm:h-96 sm:w-96" />
        </div>
      </div>
    </section>
  );
};

export default MainHero;
