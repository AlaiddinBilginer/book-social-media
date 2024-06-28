import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Footer = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="lg:flex">
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
            <h2 className="text-2xl font-bold mb-4">Kitap Köşesi</h2>
            <p className="text-gray-400">Kitap severlerin buluşma noktası.</p>
          </div>
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
            <h3 className="text-lg font-semibold mb-4">Bağlantılar</h3>
            <ul>
              <li className="mb-2">
                <Link to="/" className="hover:text-gray-300">
                  Anasayfa
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/book" className="hover:text-gray-300">
                  Kitaplar
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="hover:text-gray-300">
                  Hakkımızda
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="hover:text-gray-300">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/3">
            <h3 className="text-lg font-semibold mb-4">İletişim Bilgileri</h3>
            <p className="text-gray-400">Email: info@kitapkosesi.com</p>
            <p className="text-gray-400">Telefon: +90 123 456 7890</p>
            <p className="text-gray-400">Adres: Türkiye</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 mt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Kitap Köşesi. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
