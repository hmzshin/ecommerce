import heroImg from "../assets/contact/none.png";
import { Icon } from "@iconify/react";
import Footer from "../components/Footer";

import arrow from "../assets/contact/arrow.svg";
import Header from "../components/Header";
const ContactPage = () => {
  return (
    <>
      <Header />
      <section
        id="hero"
        className="flex flex-wrap justify-around px-[12%] lg:flex-nowrap lg:max-h-[700px] "
      >
        <div className="flex flex-col items-center gap-10 py-40 lg:w-1/2 lg:items-start ">
          <p className="text-slate-800 text-lg font-bold font-['Montserrat'] tracking-tight">
            CONTACT US
          </p>
          <p className=" text-slate-800 text-5xl text-center font-bold font-['Montserrat'] leading-[60px] tracking-tight max-w-xl lg:text-6xl  lg:text-left">
            Get in touch today!
          </p>
          <p className="max-w-md text-neutral-500 text-xl text-center font-normal font-['Montserrat'] tracking-tight lg:text-left">
            We know how large objects will act, but things on a small scale
          </p>
          <p className=" lg:text-left ">Phone ; +451 215 215 </p>
          <p className=" lg:text-left ">Fax : +451 215 215</p>
          <div className="flex gap-5">
            <Icon icon="mdi:twitter" className="w-6 h-6" />
            <Icon icon="devicon-plain:facebook" className="w-6 h-6" />
            <Icon icon="mdi:instagram" className="w-6 h-6" />
            <Icon icon="bi:linkedin" className="w-6 h-6" />
          </div>
        </div>
        <div className="lg:w-1/2 ">
          <img
            src={heroImg}
            className="w-full h-full object-scale-down object center"
          />
        </div>
      </section>

      <section className="pt-32 bg-neutral-50 lg:bg-white">
        <div className="flex flex-col items-center gap-10 px-5">
          <p className="text-center text-slate-800 text-base font-bold font-['Montserrat']  tracking-tight">
            VISIT OUR OFFICE
          </p>{" "}
          <h3 className="text-center text-slate-800 text-5xl font-bold font-['Montserrat']  tracking-tight max-w-2xl  ">
            We help small businesses with big ideas
          </h3>
        </div>
        <div className="flex flex-wrap justify-center  gap-10 pt-32 pb-20   ">
          <div className=" flex flex-col items-center gap-2 p-14 bg-white  ">
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

          <div className=" flex flex-col items-center gap-2 p-14  bg-slate-800 md:bg-white xl:bg-slate-800 ">
            <Icon
              icon="ion:location-sharp"
              className="w-24 h-24 text-sky-500"
            />
            <p className="text-center text-white md:text-black xl:text-white  text-base font-bold font-['Montserrat']  tracking-tight">
              georgia.young@example.com
            </p>
            <p className="text-center text-white md:text-black xl:text-white text-base font-bold font-['Montserrat']  tracking-tight">
              georgia.young@ple.com
            </p>
            <p className="text-center text-white md:text-black xl:text-white text-lg font-bold font-['Montserrat']  tracking-tight pt-5 pb-2">
              Get Support
            </p>
            <div className="text-center text-sky-500 text-base font-bold font-['Montserrat']  tracking-tight py-4 px-5 rounded-[37px] border border-sky-500 inline-block">
              Submit Request
            </div>
          </div>

          <div className=" flex flex-col items-center gap-2 p-14 bg-white">
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
