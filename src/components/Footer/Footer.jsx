import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import Logo from "../Logo";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 md:flex justify-between items-center">
        {/* Blog Name & Description */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-semibold text-white">MyBlog</h2>
          <p className="text-sm text-gray-400">
            Sharing thoughts, ideas, and knowledge.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="mb-6 md:mb-0">
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a yo="/blogs" className="hover:text-white">
                Blogs
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="hover:text-white">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="hover:text-white">
            <FaLinkedin size={20} />
          </a>
          <a href="#" className="hover:text-white">
            <FaGithub size={20} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} MyBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
