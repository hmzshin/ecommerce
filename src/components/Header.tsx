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
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setUser } from "../store/slices/userSlice";
import { resetAddress } from "../store/slices/addressSlice";
import { resetShoppingCart } from "../store/slices/shoppingCardSlice";

const data = [
  { svg: phone, text: "(225) 555-0118" },
  { svg: mail, text: "michelle.rivera@example.com" },
  { text: "Follow Us  and get a chance to win 80% off" },
  {
    text: "Follow Us  :",
    socialMedia: [instagram, youtube, facebook, twitter],
  },
];

const ShoppingCart = lazy(() => import("./ShoppingCart"));

const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [showUserDetails, setShowUserDetails] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>();
  const [isChartVisible, setIsChartVisible] = useState<boolean>(false);
  const userInfo = useAppSelector((state) => state.user);
  const categories = useAppSelector((state) => state.global.categories);
  const shoppingCart = useAppSelector((state) => state.shoppingCard.card);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const menuRef = useRef<HTMLDivElement>(null);
  const shopListRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const arrowIconRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userNameREf = useRef<HTMLDivElement>(null);

  const women = categories.filter((category: any) => category.gender === "k");
  const men = categories.filter((category: any) => category.gender === "e");
  const numberOfItemsInCart = shoppingCart?.reduce(
    (sum: number, item) => sum + item.numberOfItem,
    0
  );

  function deleteToken(): void {
    localStorage.removeItem("token");
    navigate("/");
    Promise.all([
      dispatch(setUser({ name: "", email: "", role_id: "" })),
      dispatch(resetAddress([])),
      dispatch(
        resetShoppingCart({
          card: [],
          payment: { subtotal: 0, shipping: 0, total: 0 },
          address: {
            shipping: {
              address: "",
              city: "",
              district: "",
              id: 0,
              name: "",
              neighborhood: "",
              phone: "",
              surname: "",
              title: "",
              user_id: 0,
            },
            billing: {
              address: "",
              city: "",
              district: "",
              id: 0,
              name: "",
              neighborhood: "",
              phone: "",
              surname: "",
              title: "",
              user_id: 0,
            },
          },
        })
      ),
    ]);
  }
  function searchHandler() {
    if (searchInput) {
      navigate(`/shop/s?filter=${searchInput.replaceAll(" ", "+")}`);
    }
  }
  const w: number = innerWidth;
  useEffect(() => {
    const handleClick = (event: any) => {
      event.stopPropagation();
      if (
        isMenuVisible &&
        menuRef.current &&
        !menuRef.current?.contains(event.target) &&
        !iconRef.current?.contains(event.target) &&
        !brandRef.current?.contains(event.target) &&
        !arrowIconRef.current?.contains(event.target)
      ) {
        setIsMenuVisible(false);
        setShowCategories(false);
      }
      if (
        showCategories &&
        shopListRef.current &&
        !shopListRef.current?.contains(event.target) &&
        !arrowIconRef.current?.contains(event.target)
      ) {
        setShowCategories(false);
      }
      if (
        showUserDetails &&
        userMenuRef.current &&
        !userNameREf.current?.contains(event.target)
      ) {
        setShowUserDetails(false);
      }
    };
    window.addEventListener("click", handleClick);

    window.addEventListener("scroll", () => {
      setShowCategories(false);
    });

    if (isMenuVisible && w < 1024) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isMenuVisible, showCategories, showUserDetails]);

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
      <div className="my-5 flex justify-between items-center   lg:h-14 pl-[5%] pr-[4%] lg:flex-nowrap xl:gap-20  relative">
        <div
          className="flex items-center"
          onClick={() => setIsMenuVisible(!isMenuVisible)}
        >
          <div ref={iconRef}>
            <Icon
              icon="material-symbols:menu"
              className="w-10 h-10 xl:hidden "
            />
          </div>

          <h1
            ref={brandRef}
            className="text-slate-800 text-2xl md:text-3xl font-bold font-['Montserrat'] tracking-tight "
          >
            Bandage
          </h1>
        </div>
        <div
          className={`flex flex-wrap sm:w-full justify-between sm:justify-around xl:justify-between xl:flex-nowrap items-center z-10 `}
        >
          <nav
            ref={menuRef}
            className={`transition-all h-[100vh] px-[7%]  xl:w-auto xl:h-auto duration-500 absolute top-full bg-white xl:bg-none xl:shadow-none xl:static rounded-md shadow-md  py-10 xl:p-4 overscroll-none ${
              isMenuVisible ? "active-menu" : "passive-menu"
            }  ${
              isMenuVisible ? "pointer-events-auto" : "pointer-events-none"
            } lg:pointer-events-auto overflow-y-auto lg:overflow-auto `}
          >
            <ul className="flex flex-col xl:flex-row gap-10 ">
              {[
                { path: "/", text: "Home" },
                { path: "/shop", text: "Shop" },
                { path: "/about", text: "About" },
                { path: "/contact", text: "Contact" },
                { path: "/team", text: "Team" },
              ].map((link, i) =>
                link.path !== "/shop" ? (
                  <Link
                    key={i}
                    to={link.path}
                    className={`text-neutral-500 text-3xl xl:text-base font-bold font-['Montserrat'] leading-normal tracking-tight `}
                    onClick={() => setIsMenuVisible(false)}
                  >
                    {link.text}
                  </Link>
                ) : (
                  <div key={i} className={`flex items-center gap-3`}>
                    <Link
                      to="/shop"
                      className={`text-neutral-500 text-3xl xl:text-base font-bold font-['Montserrat'] leading-normal tracking-tight`}
                      onClick={() => setIsMenuVisible(false)}
                    >
                      Shop
                    </Link>{" "}
                    <div ref={arrowIconRef}>
                      {w < 1280 ? (
                        <Icon
                          icon={
                            showCategories
                              ? "ri:arrow-right-s-line"
                              : "ri:arrow-left-s-line"
                          }
                          className="w-11 h-11 p-2 cursor-pointer self-stretch "
                          onClick={(): void =>
                            setShowCategories(!showCategories)
                          }
                        />
                      ) : (
                        <Icon
                          icon={
                            showCategories
                              ? "ri:arrow-up-s-line"
                              : "ri:arrow-down-s-line"
                          }
                          className="w-6 h-6 cursor-pointer arrowIcon"
                          onClick={(): void =>
                            setShowCategories(!showCategories)
                          }
                        />
                      )}
                    </div>
                    <div
                      className={`fixed top-16 w-full h-full overflow-auto  items-center  bg-neutral-800 bg-opacity-25 transition-all duration-500 z-50 xl:top-40 xl:w-full xl:px-20 xl:left-0 ${
                        showCategories
                          ? "flex activeCategories"
                          : "flex  passiveCategories"
                      }`}
                    >
                      <div
                        ref={shopListRef}
                        className="flex flex-col gap-5 items-start p-10 top-0 bg-white h-full absolute  xl:px-28  xl:top-0 xl:h-auto xl:w-[500px] xl:left-[calc(5%+223px)] 2xl:left-[calc(5%+303px)]"
                      >
                        <div className="flex flex-col items-start gap-3">
                          <h6 className="text-neutral-700 text-2xl font-bold font-['Montserrat'] leading-normal tracking-tight cursor-pointer">
                            <Link to="/shop/s?filter=kadın">Kadın</Link>
                          </h6>
                          {women.map((category: any, i) => (
                            <Link
                              key={i}
                              to={`/shop/${
                                category.id
                              }/kadın/${category.title.toLowerCase()}`}
                              onClick={() => setShowCategories(false)}
                            >
                              <p className="text-neutral-500  text-base font-bold font-['Montserrat'] leading-normal tracking-tight cursor-pointer hover:text-slate-800">
                                {category.title}
                              </p>
                            </Link>
                          ))}
                        </div>
                        <div className="flex flex-col items-start gap-3">
                          <h6 className="text-neutral-700 text-2xl font-bold font-['Montserrat'] leading-normal tracking-tight cursor-pointer">
                            <Link to="/shop/s?filter=erkek">Erkek</Link>
                          </h6>
                          {men.map((category: any, i) => (
                            <Link
                              to={`/shop/${
                                category.id
                              }/erkek/${category.title.toLowerCase()}`}
                              key={i}
                              className="text-neutral-500  text-base font-bold font-['Montserrat'] leading-normal tracking-tight cursor-pointer hover:text-slate-800"
                              onClick={() => setShowCategories(false)}
                            >
                              {category.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </ul>
          </nav>
          <div className="hidden sm:flex  xl:max-2xl:hidden items-center self-stretch relative ">
            <input
              type="text"
              className="w-52 lg:w-full  rounded-md border bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none"
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" ? searchHandler() : () => {}
              }
              placeholder="Search in Store"
            />
            <img
              src={search}
              className="absolute  right-2 w-5 h-5 "
              onClick={searchHandler}
            />
          </div>
          <div className="flex items-center text-center font-bold font-['Montserrat'] tracking-tight ">
            <div
              className={`flex gap-2 mr-10  ${userInfo.name ? "hidden" : ""}`}
            >
              <Link to="/login">
                {" "}
                <img className="w-5 h-5 mr-1" src={user} />
              </Link>

              <Link to="/login" className="hidden md:block">
                Login
              </Link>
              <p className="hidden md:block">/</p>
              <Link to="/signup" className="hidden md:block">
                Register
              </Link>
            </div>
            <div
              ref={userNameREf}
              className={`${
                userInfo.name ? "block" : "hidden"
              } mr-10 md:mr-16 relative cursor-pointer`}
              onClick={() => setShowUserDetails(!showUserDetails)}
            >
              <span>{userInfo.name}</span>

              <div
                ref={userMenuRef}
                className={`absolute top-full pt-2 bg-slate-100 px-10 ${
                  showUserDetails ? "block" : "hidden"
                }`}
              >
                <ul className="flex flex-col gap-2 items-center whitespace-nowrap">
                  <li className="cursor-pointer">Account</li>
                  <li className="cursor-pointer" onClick={deleteToken}>
                    Sign Out
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex lg:gap-2 relative ">
              <img
                src={chart}
                className="w-5 h-5"
                onClick={() => {
                  setIsChartVisible((prev) => !prev);
                }}
              />
              <span className="hidden lg:inline w-3">
                {numberOfItemsInCart}
              </span>
              <img src={like} className="w-5 h-5 ml-10 hidden lg:block" />{" "}
              <span className="hidden lg:inline">1</span>
              <Suspense
                fallback={
                  <Icon
                    icon="svg-spinners:180-ring"
                    className="m-auto w-5 h-5"
                  />
                }
              >
                <ShoppingCart
                  isChartVisible={isChartVisible}
                  setIsChartVisible={setIsChartVisible}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
