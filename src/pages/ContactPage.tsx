import HeaderInnerPages from "../components/HeaderInnerPages";

import heroImg from "../assets/contact/none.png";
import { Icon } from "@iconify/react";
import Footer from "../components/Footer";

import arrow from "../assets/contact/arrow.svg";
const ContactPage = () => {
  return (
    <>
      <HeaderInnerPages />
      <section id="hero" className="px-[15%] flex pt-10">
        <div className="w-1/2 flex flex-col gap-10 py-40">
          <p className="text-slate-800 text-lg font-bold font-['Montserrat'] tracking-tight">
            CONTACT US
          </p>
          <p className=" text-slate-800 text-6xl font-bold font-['Montserrat'] leading-[80px] tracking-tight max-w-xl">
            Get in touch today!
          </p>
          <p className="w-96 text-neutral-500 text-xl font-normal font-['Montserrat'] tracking-tight">
            We know how large objects will act, but things on a small scale
          </p>
          <p className=" ">Phone ; +451 215 215 </p>
          <p className=" ">Fax : +451 215 215</p>
          <div className="flex gap-5">
            <Icon icon="mdi:twitter" className="w-6 h-6" />
            <Icon icon="devicon-plain:facebook" className="w-6 h-6" />
            <Icon icon="mdi:instagram" className="w-6 h-6" />
            <Icon icon="bi:linkedin" className="w-6 h-6" />
          </div>
        </div>
        <div className="w-1/2 ">
          <img
            src={heroImg}
            className="w-full h-full object-cover object center"
          />
        </div>
      </section>

      <section>
        <div className="flex flex-col items-center gap-10">
          <p className="text-center text-slate-800 text-base font-bold font-['Montserrat']  tracking-tight">
            VISIT OUR OFFICE
          </p>{" "}
          <h3 className="text-center text-slate-800 text-5xl font-bold font-['Montserrat']  tracking-tight max-w-2xl">
            We help small businesses with big ideas
          </h3>
        </div>
        <div className="flex justify-center pt-32  pb-20   ">
          <div className=" flex flex-col items-center gap-2 p-14 ">
            <Icon icon="bx:phone" className="w-24 h-24 text-sky-500" />
            <p className="text-center text-slate-800 text-base font-bold font-['Montserrat']  tracking-tight">
              georgia.young@example.com
            </p>
            <p className="text-center text-slate-800 text-base font-bold font-['Montserrat']  tracking-tight">
              georgia.young@ple.com
            </p>
            <p className="text-center text-slate-800 text-lg font-bold font-['Montserrat']  tracking-tight pt-5 pb-2">
              Get Support
            </p>
            <div className="text-center text-sky-500 text-base font-bold font-['Montserrat']  tracking-tight py-4 px-5 rounded-[37px] border border-sky-500 inline-block">
              Submit Request
            </div>
          </div>

          <div className=" flex flex-col items-center gap-2 bg-slate-800 p-14">
            <Icon
              icon="ion:location-sharp"
              className="w-24 h-24 text-sky-500"
            />
            <p className="text-center text-white text-base font-bold font-['Montserrat']  tracking-tight">
              georgia.young@example.com
            </p>
            <p className="text-center text-white text-base font-bold font-['Montserrat']  tracking-tight">
              georgia.young@ple.com
            </p>
            <p className="text-center text-white text-lg font-bold font-['Montserrat']  tracking-tight pt-5 pb-2">
              Get Support
            </p>
            <div className="text-center text-sky-500 text-base font-bold font-['Montserrat']  tracking-tight py-4 px-5 rounded-[37px] border border-sky-500 inline-block">
              Submit Request
            </div>
          </div>

          <div className=" flex flex-col items-center gap-2 p-14">
            <Icon
              icon="clarity:email-solid"
              className="w-24 h-24 text-sky-500"
            />
            <p className="text-center text-slate-800 text-base font-bold font-['Montserrat']  tracking-tight">
              georgia.young@example.com
            </p>
            <p className="text-center text-slate-800 text-base font-bold font-['Montserrat']  tracking-tight">
              georgia.young@ple.com
            </p>
            <p className="text-center text-slate-800 text-lg font-bold font-['Montserrat']  tracking-tight pt-5 pb-2">
              Get Support
            </p>
            <div className="text-center text-sky-500 text-base font-bold font-['Montserrat']  tracking-tight py-4 px-5 rounded-[37px] border border-sky-500 inline-block">
              Submit Request
            </div>
          </div>
        </div>
      </section>

      <section
        id="trial"
        className="flex flex-col gap-10 items-center px-[15%] py-20"
      >
        <img src={arrow} />
        <p className=" text-center text-slate-800 text-lg font-bold font-['Montserrat']  tracking-tight">
          WE Can't WAIT TO MEET YOU
        </p>
        <p className="text-center text-slate-800 text-6xl font-bold leading-[58px] font-['Montserrat'] tracking-tight max-w-md">
          Let’s Talk
        </p>
        <div className="blueBtn">Try it free now</div>
      </section>
      <Footer />
    </>
  );
};
export default ContactPage;
