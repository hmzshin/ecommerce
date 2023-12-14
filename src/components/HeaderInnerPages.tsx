import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const HeaderInnerPages = () => {
  return (
    <section id="header">
      <div className="w-full h-14 px-[15%] my-5 flex gap-40 items-center">
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
                  key={i}
                  to={link.path}
                  className="text-neutral-500 text-base font-bold font-['Montserrat'] leading-normal tracking-tight"
                >
                  {link.text}
                </Link>
              ))}
            </ul>
          </nav>
          <div className="flex gap-20 items-center text-center text-sky-500 font-bold font-['Montserrat'] tracking-tight">
            <p>Login</p>

            <div className="blueBtn">
              Become a member
              <Icon icon="formkit:arrowright" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderInnerPages;
