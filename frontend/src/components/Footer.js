import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="border rounded-xl shadow-lg w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-4 py-4">
        <Link to="/">
          <h1 className="cursor-pointer text-2xl sm:text-3xl font-extrabold">
            myCrypto<span className="text-blue-700">Tracker</span>
          </h1>
        </Link>

        <div className="flex gap-3">
          <FaWhatsapp className="text-green-700 cursor-pointer" />
          <FaFacebook className="text-blue-700 cursor-pointer" />
          <FaGithub className="text-black cursor-pointer" />
          <FaYoutube className="text-red-700 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
