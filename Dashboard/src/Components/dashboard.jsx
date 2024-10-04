import React from "react";
import { FaSearch, FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom"; 
import { FaPlayCircle } from "react-icons/fa";
import Footer from "./Footer/Footer";
export const Dashboard = (user) => {
  const cards = [
    { name: "Nyaysetu chat", route: "/Chat", description: "Chat with Nyaysetu",isNyaysetu: true },
    { name: "Kyr", route: "/kyr", description: "Find laws related to complaints",isNyaysetu: false },
    { name: "Legal check", route: "/summarizer", description: "Explore legal checks",isNyaysetu: false },
    { name: "FAQs", route: "/faq", description: "Frequently Asked Questions",isNyaysetu: false },
    { name: "Complaint assistant", route: "/ComplaintPage", description: "Get help with complaints",isNyaysetu: false },
    { name: "Blogs and Articles", route: "/BlogsAndArticles", description: "Blogs and articles related to law",isNyaysetu: false}
  ];
  const userDetails = user.user
  return (
    <div className="mx-auto pt-8">
      <div className="flex justify-between items-center pt-8 px-2">
        <div>
          <h2 className="font-semibold text-4xl">Hi {userDetails.displayName},</h2>
          <p>What would you like to know?</p>
        </div>
        <button className="h-12 px-8 bg-sky-950 text-white rounded-md">Tour <FaPlayCircle /></button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mb-20">
        {cards.map((card, index) => (
          <Link to={card.route} key={index}>
            <div className="cursor-pointer bg-white border border-gray-300 p-4 rounded-lg hover:shadow-lg transition duration-300">
              <div className="flex items-center justify-between mb-4">
                <FaSearch className="text-md mr-2" />
                {card.isNyaysetu ? (
                  <FaStar className="text-lg" fill="yellow" />
                ) : (
                  <FaRegStar className="text-lg" />
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2">{card.name}</h3>
              <p>{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    <Footer />
    </div>
  );
};

//export default Dashboard;
