import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Logo from "../assets/Logo.svg"
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-bilbao-950 text-white pt-12">
      <div className="px-8 md:px-15">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/20">
          {/* Column 1: Logo & About */}
          <div>
            <Link to="/">
              <img src={Logo} alt="Book Store" className="w-40"/>
            </Link>
            <p className="mt-4 text-sm text-white/80">
              Discover your next favorite book. From timeless classics to modern masterpieces, BookStore has you covered.
            </p>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li><Link to="/collection?category=fiction" className="hover:underline">Fiction</Link></li>
              <li><Link to="/collection?category=children" className="hover:underline">Children</Link></li>
              <li><Link to="/collection?category=fantasy" className="hover:underline">Fantasy</Link></li>
              <li><Link to="/collection?category=thriller" className="hover:underline">Thriller</Link></li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Your Account</h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li><Link to="/login" className="hover:underline">Sign In</Link></li>
              <li><Link to="/register" className="hover:underline">Register</Link></li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-white/80 hover:text-white">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white/80 hover:text-white">
                <FaTwitter />
              </a>
              <a href="#" className="text-white/80 hover:text-white">
                <FaInstagram />
              </a>
              <a href="#" className="text-white/80 hover:text-white">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 text-center text-sm text-white/80">
          &copy; {new Date().getFullYear()} BookStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
