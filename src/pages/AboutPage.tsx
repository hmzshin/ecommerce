import Footer from "../components/Footer";
import Clients from "../components/Clients";
import MemberCard from "../components/MemberCard";
import { Icon } from "@iconify/react";

import happyWoman from "../assets/about/none.svg";
import videoPreview from "../assets/about/videoPreview.jpeg";
import member1 from "../assets/about/member1.jpeg";
import workWithUs from "../assets/about/workWithUs.jpeg";
import Header from "../components/Header";

const AboutPage = () => {
  return (
    <>
      <Header />
      <section
        id="hero"
        className="flex flex-wrap justify-center px-[11%] pt-10"
      >
        <div className=" flex flex-col items-center gap-10 py-20 lg:items-start lg:w-1/2 lg:py-40   ">
          <p className="hidden text-slate-800 text-lg font-bold font-['Montserrat'] tracking-tight lg:block">
            ABOUT COMPANY
          </p>
          <p className=" text-slate-800 text-5xl text-center font-bold font-['Montserrat'] tracking-tight lg:text-[58px]">
            ABOUT US
          </p>
          <p className="max-w-sm text-neutral-500 text-xl font-normal font-['Montserrat'] tracking-tight text-center lg:text-left">
            We know how large objects will act, but things on a small scale
          </p>
          <p className="blueBtn w-56 ">Get Quote Now</p>
        </div>
        <div className="lg:w-1/2 max-h-[650px]">
          <img
            src={happyWoman}
            className="w-full h-full object-cover object center"
          />
        </div>
      </section>
      <section className="flex flex-wrap gap-10 items-center justify-around px-[12% py-32  lg:flex-nowrap lg:px-[12%]">
        <div>
          <p className="text-red-500 text-base font-normal font-['Montserrat'] tracking-tight text-center lg:text-left ">
            Problems trying
          </p>
          <p className="max-w-xl text-slate-800 text-3xl text-center font-bold font-['Montserrat']  tracking-tight pt-10 lg:text-left">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
          </p>
        </div>
        <p className="max-w-sm text-neutral-500 text-base text-center font-normal font-['Montserrat'] tracking-tight lg:text-left xl:max-w-xl">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics{" "}
        </p>
      </section>

      <section className="flex flex-wrap items-center justify-center md:justify-around px-[15%] py-20  gap-20">
        {[
          { text1: "15K", text2: "Happy Customers" },
          { text1: "150K", text2: "Monthly Visitors" },
          { text1: "15", text2: "Countries  Worldwide" },
          { text1: "100+", text2: "Top Partners" },
        ].map((item, i) => (
          <div key={i}>
            <p className="text-center text-slate-800 text-6xl font-bold font-['Montserrat']  tracking-tight">
              {item.text1}
            </p>
            <p className="text-center text-neutral-500 text-lg font-bold font-['Montserrat'] tracking-tight">
              {item.text2}
            </p>
          </div>
        ))}
      </section>

      <section className="px-[15%] py-20 relative ">
        <div
          className="w-16 h-16 md:w-24 md:h-24 absolute
        top-[calc(50%-32px)] left-[calc(50%-32px)] 
        md:top-[calc(50%-48px)] md:left-[calc(50%-48px)] bg-sky-500 rounded-full p-5 text-white hover:scale-105 transition-all"
        >
          <Icon icon="ph:play-fill" className="w-full h-full" />
        </div>
        <img
          src={videoPreview}
          className="w-full h-full object-cover object-center rounded-3xl "
        />
      </section>

      <section
        id="team"
        className="px-[12%] py-28 flex flex-col items-center gap-20"
      >
        <div className="flex flex-col items-center gap-10">
          <h3 className="text-slate-800 text-5xl text-center font-bold font-['Montserrat'] tracking-tight">
            Meet Our Team
          </h3>
          <p className="max-w-lg text-center text-neutral-500 text-base font-normal font-['Montserrat']  tracking-tight">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics{" "}
          </p>
        </div>
        <div className="flex flex-wrap gap-20 items-center justify-around self-stretch">
          {[
            { img: member1, username: "Username", profession: "engineer" },
            { img: member1, username: "Username", profession: "engineer" },
            { img: member1, username: "Username", profession: "engineer" },
          ].map((member, i) => (
            <MemberCard key={i} member={member} />
          ))}
        </div>
      </section>

      <section id="clients" className="bg-neutral-50 py-32">
        <div className="px-[15%] flex flex-col items-center gap-10 pb-10">
          <h3 className="text-slate-800 text-[40px] text-center font-bold font-['Montserrat'] leading-[50px] tracking-tight">
            Big Companies Are Here
          </h3>
          <p className="max-w-xl text-center text-neutral-500 text-base font-normal font-['Montserrat']  tracking-tight">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics{" "}
          </p>
        </div>
        <Clients />
      </section>

      <section className="flex flex-wrap justify-center md:h-[70vh]">
        <div
          className="flex flex-col items-center justify-center  gap-10 px-[15%] py-20 bg-sky-600  md:items-start
         md:w-[60%] md:h-full"
        >
          <p className="text-white text-lg  font-bold font-['Montserrat'] tracking-tight">
            Work With Us
          </p>
          <p className="text-white text-5xl text-center md:text-start font-bold font-['Montserrat']tracking-tight">
            Now Let’s grow Yours
          </p>
          <p className="max-w-md text-white text-base text-center md:text-start font-normal font-['Montserrat'] tracking-tight">
            The gradual accumulation of information about atomic and small-scale
            behavior during the first quarter of the 20th{" "}
          </p>
          <div className="text-center text-neutral-50 text-base font-bold font-['Montserrat']  tracking-tight px-10  py-4 border border-neutral-50  rounded-md ">
            Button
          </div>
        </div>
        <div className="hidden w-[40%] max-h-full border-[2px] border-sky-600 md:block  ">
          <img
            src={workWithUs}
            className=" w-full h-full object-cover object-top"
          />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutPage;
