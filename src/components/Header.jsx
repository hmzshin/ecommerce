import React from "react";
import phone from "../assets/header/phone.svg";
import mail from "../assets/header/mail.svg";
import instagram from "../assets/header/instagram.svg";
import youtube from "../assets/header/youtube.svg";
import facebook from "../assets/header/facebook.svg";
import twitter from "../assets/header/twitter.svg";
import user from "../assets/header/user.svg";
import search from "../assets/header/search.svg";
import chart from "../assets/header/chart.svg";
import like from "../assets/header/like.svg";
import { Link } from "react-router-dom";

const data = [
  { svg: phone, text: "(225) 555-0118" },
  { svg: mail, text: "michelle.rivera@example.com" },
  { text: "Follow Us  and get a chance to win 80% off" },
  {
    text: "Follow Us  :",
    socialMedia: [instagram, youtube, facebook, twitter],
  },
];
const Header = () => {
  return (
    <section id="header">
      <div className="w-full h-16 py-3 px-16 bg-slate-800">
        {" "}
        <ul className="flex gap-5 justify-between items-center xl:[&>*:nth-child(3)]:px-[15%]">
          {data.map((list, i) => (
            <li key={i} className="flex p-2 items-center gap-3 ">
              <img src={list.svg} />

              <span className="text-white text-sm font-bold font-['Montserrat'] leading-normal tracking-[0.2px]">
                {list.text}
              </span>
              <div className="flex items-center gap-5 ">
                {list.socialMedia?.map((social, index) => (
                  <a href="#" className="w-6 h-6 p-1">
                    <img key={index} src={social} className="" />
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full h-14 px-16 my-5 flex gap-40 items-center">
        <h1 className="text-slate-800 text-2xl font-bold font-['Montserrat'] leading-loose tracking-tight">
          Bandage
        </h1>
        <div className="flex w-full justify-between items-center">
          <nav>
            <ul className="flex gap-10 ">
              {[
                { path: "/", text: "Home" },
                { path: "/shop", text: "Shop" },
                { path: "/about", text: "About" },
                { path: "/contact", text: "Contact" },
                { path: "", text: "Pages" },
              ].map((link, i) => (
                <Link
                  to={link.path}
                  className="text-neutral-500 text-base font-bold font-['Montserrat'] leading-normal tracking-tight"
                >
                  {link.text}
                </Link>
              ))}
            </ul>
          </nav>
          <div className="flex items-center text-center text-sky-500 font-bold font-['Montserrat'] tracking-tight">
            <div className="flex gap-2 mr-16 ">
              <img className="w-5 h-5 mr-1" src={user} />
              <p>Login</p>
              <p>/</p>
              <p>Register</p>
            </div>
            <div className="flex gap-2">
              <img src={search} className="w-5 h-5 mr-10" />
              <img src={chart} className="w-5 h-5" /> 1
              <img src={like} className="w-5 h-5 ml-10" /> 1
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
