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
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../store/store";

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
  const [isVisible, setIsVisible] = useState(false);
  const userInfo = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log("header user Info", userInfo);
  }, [userInfo]);

  const menuRef = useRef(null);
  const iconRef = useRef(null);
  const brandRef = useRef(null);

  const w = innerWidth;
  useEffect(() => {
    window.addEventListener("click", (event): any => {
      if (
        isVisible &&
        menuRef.current &&
        event.target !== menuRef.current &&
        event.target !== iconRef.current &&
        event.target !== brandRef.current
      ) {
        setIsVisible(false);
      }
    });

    if (isVisible && w < 1024) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isVisible]);

  return (
    <section id="header" className="">
      <div className="h-16 py-3 px-[4%] bg-slate-800 hidden xl:block">
        {" "}
        <ul className="flex gap-5 justify-between items-center 2xl:[&>*:nth-child(3)]:px-[15%] invisible md:visible ">
          {data.map((list, i) => (
            <li key={i} className="flex p-2 items-center gap-3 ">
              <img src={list.svg} />

              <p className="text-white text-sm font-bold font-['Montserrat'] leading-normal tracking-[0.2px] whitespace-nowrap">
                {list.text}
              </p>
              <div className="flex items-center gap-5 ">
                {list.socialMedia?.map((social, i) => (
                  <a key={i} href="#" className="w-6 h-6 p-1">
                    <img src={social} className="" />
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="my-5 flex justify-between items-center   lg:h-14 pl-[5%] pr-[4%] lg:flex-nowrap xl:gap-20 2xl:gap-40 relative">
        <div
          className="flex items-center"
          onClick={() => setIsVisible(!isVisible)}
        >
          <Icon
            ref={iconRef}
            icon="material-symbols:menu"
            className="w-10 h-10 xl:hidden "
          />
          <h1
            ref={brandRef}
            className="text-slate-800 text-2xl md:text-3xl font-bold font-['Montserrat'] tracking-tight "
          >
            Bandage
          </h1>
        </div>
        <div
          className={`flex flex-wrap xl:w-full justify-between items-center z-10 `}
        >
          <nav
            ref={menuRef}
            className={`transition-all h-[100vh] w-1/2 sm:w-1/3 xl:w-auto xl:h-auto duration-700 absolute top-full bg-white xl:bg-none xl:shadow-none xl:static rounded-md shadow-md px-7 py-10 xl:p-4 overscroll-none ${
              isVisible ? "active-menu" : "passive-menu"
            }  ${
              isVisible ? "pointer-events-auto" : "pointer-events-none"
            } lg:pointer-events-auto overflow-y-scroll lg:overflow-auto `}
          >
            <ul className="flex flex-col xl:flex-row gap-10 ">
              {[
                { path: "/", text: "Home" },
                { path: "/shop", text: "Shop" },
                { path: "/about", text: "About" },
                { path: "/contact", text: "Contact" },
                { path: "/team", text: "Pages" },
              ].map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  className="text-neutral-500 text-3xl xl:text-base font-bold font-['Montserrat'] leading-normal tracking-tight   "
                  onClick={() => setIsVisible(false)}
                >
                  {link.text}
                </Link>
              ))}
            </ul>
          </nav>
          <div className="flex items-center text-center font-bold font-['Montserrat'] tracking-tight ">
            <div
              className={`flex gap-2 mr-10 md:mr-16 ${
                userInfo.name ? "hidden" : ""
              }`}
            >
              <img className="w-5 h-5 mr-1" src={user} />
              <Link to="/login" className="hidden md:block">
                Login
              </Link>
              <p className="hidden md:block">/</p>
              <Link to="/signup" className="hidden md:block">
                Register
              </Link>
            </div>
            <p
              className={`${
                userInfo.name ? "block" : "hidden"
              } mr-10 md:mr-16 `}
            >
              {userInfo.name}
            </p>
            <div className="flex lg:gap-2">
              <img src={search} className="w-5 h-5 mr-10" />
              <img src={chart} className="w-5 h-5" />
              <span className="hidden lg:inline">1</span>
              <img src={like} className="w-5 h-5 ml-10 hidden lg:block" />{" "}
              <span className="hidden lg:inline">1</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
