import { Link } from 'react-router-dom';

const AuthorTextArticle = () => {
  return (
    <div className="md:max-w-180 ">
      <h2 className="text-4xl font-bold sm:text-center lg:max-w-md lg:text-left lg:mt-10 mt-20">
        Yazarlar Hakkında Bilgi Edin!
      </h2>
      <p className="text-2xl text-center text-gray-400 lg:max-w-xl lg:text-left mt-8">
        Yazarlar hakkında bilgi alarak okumak istediğiniz kitabı daha sağlıklı bir şekilde seçin.
      </p>
      <div className="mx-auto lg:mx-0 mt-10 mb-24">
        <Link
          to="/author"
          className=" py-5 px-10 text-2xl font-bold text-white bg-blue-400 rounded lg:py-4 hover:opacity-70"
        >
          Yazarları İncele
        </Link>
      </div>
    </div>
  );
};

export default AuthorTextArticle;
