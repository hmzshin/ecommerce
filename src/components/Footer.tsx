import facebook from "../assets/footer/facebook.svg";
import twitter from "../assets/footer/twitter.svg";
import instagram from "../assets/footer/instagram.svg";

import { footerLinks } from "../data";
const Footer = ({ bgColor = "bg-neutral-50" }) => {
  return (
    <section id="footer" className="">
      <div
        className={`${bgColor} flex justify-between items-center h-40 px-[15%]`}
      >
        <p className="text-slate-800 text-3xl font-bold font-['Montserrat'] tracking-[0.2px]">
          Bandage
        </p>
        <div className="flex gap-5">
          <img src={facebook} />
          <img src={instagram} />
          <img src={twitter} />
        </div>
      </div>
      <div className="flex gap-10 px-[15%] py-20 justify-between">
        {footerLinks.map((item, i) => (
          <div key={i} className="flex flex-col items-start gap-5">
            <h4 className="text-slate-800 text-lg font-bold font-['Montserrat'] tracking-[0.2px]">
              {item.header}
            </h4>
            <div>
              {item.body.map((link, i) => (
                <p
                  key={i}
                  className="mt-2 text-neutral-500 text-base font-bold font-['Montserrat'] tracking-[0.2px]"
                >
                  {link}
                </p>
              ))}
            </div>
          </div>
        ))}
        <div className="flex flex-col items-start gap-5 ">
          <h4 className="text-slate-800 text-lg font-bold font-['Montserrat'] tracking-[0.2px]">
            Get in Touch
          </h4>
          <form className=" h-14 flex">
            <input
              type="text"
              placeholder="Your Email"
              className="pl-3 h-full bg-stone-50 rounded-tl-lg rounded-bl-lg border border-neutral-200 "
            />
            <button className="text-center text-white text-base font-normal font-['Montserrat'] tracking-tight bg-sky-500 rounded-tr-lg rounded-br-lg border border-neutral-200 p-2">
              Subscribe
            </button>
          </form>

          <p className=" text-neutral-500 text-base font-bold font-['Montserrat'] tracking-[0.2px]">
            Lore imp sum dolor Amit
          </p>
        </div>
      </div>
      <div className="px-[15%] py-8 bg-neutral-50">
        <p className="text-neutral-500 text-base font-bold font-['Montserrat']  tracking-[0.2px]">
          Made With Love By Finland All Right Reserved{" "}
        </p>
      </div>
    </section>
  );
};

export default Footer;
