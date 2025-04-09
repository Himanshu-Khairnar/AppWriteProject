import React from "react";
import { Link } from "react-router-dom"; // Fixed import

export default function Footer() {
  const recipientEmail = "himanshuk1205@gmail.com";

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-7 mt-5 text-center">
      <p>© 2025</p>
      <Link to="https://x.com/Himansh52658724">X</Link>
      <Link to="https://linkedin.com/in/himanshu-khairnar-9908a6288">
        Linkedin
      </Link>
      <a href={`mailto:${recipientEmail}`}>Email</a>
      <Link to="https://github.com/Himanshu-Khairnar">Github</Link>
      <Link to="https://stackoverflow.com/users/28455233/himanshu-khairnar">
        Stack overflow
      </Link>
      <Link to="/about">
        About Us
      </Link>
    </div>
  );
}
