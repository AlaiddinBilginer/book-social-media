import authorImage from './authors.png';

type Props = {};

const SecondHero = (props: Props) => {
  return (
    <section>
      <div className="container flex flex-col-reverse lg:ml-8 lg:mt-12 lg2:ml-32 p-8 lg:flex-row">
        <div className="flex justify-center sm:flex sm:justify-center">
          <img src={authorImage} alt="Authors" />
        </div>
      </div>
    </section>
  );
};

export default SecondHero;
