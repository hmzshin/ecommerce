import { Icon } from "@iconify/react";
import Footer from "../components/Footer";
import HeaderInnerPages from "../components/HeaderInnerPages";
import MemberCard from "../components/MemberCard";
import { teamMembers } from "../data";

import hero1 from "../assets/members/hero1.jpeg";
import hero2 from "../assets/members/hero2.jpeg";
import hero3 from "../assets/members/hero3.jpeg";
import hero4 from "../assets/members/hero1.jpeg";

const TeamPage = () => {
  return (
    <>
      <HeaderInnerPages />
      <section id="hero">
        <div className="flex flex-col items-center gap-5 py-20 ">
          <p className="text-center text-neutral-500 text-base font-bold font-['Montserrat'] tracking-tight ">
            WHAT WE DO
          </p>
          <h3 className="text-center text-slate-800 text-6xl font-bold font-['Montserrat'] leading-[80px] tracking-tight">
            Innovation tailored for you
          </h3>
          <p className="text-center text-neutral-500 text-base font-bold font-['Montserrat']  tracking-tight flex gap-5">
            <span className="text-slate-800">Home</span>{" "}
            <Icon icon="mingcute:right-fill" className="w-6 h-6" />
            <span>Team</span>
          </p>
        </div>
        <div className="flex justify-between gap-5 items-center ">
          <div className="w-1/2 h-[70vh]">
            <img src={hero1} className="default-img" />
          </div>
          <div className="w-1/2 h-[70vh] flex flex-wrap justify-between content-between">
            {[hero1, hero2, hero3, hero4].map((img, i) => (
              <div key={i} className="w-[49%] h-[49%]  ">
                <img src={img} className="default-img" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="teamMembers" className="px-[15%] py-20">
        <h3 className="text-slate-800 text-5xl text-center font-bold font-['Montserrat'] tracking-tight p-32 ">
          Meet Our Team
        </h3>
        <div className="flex flex-wrap items-center justify-between gap-10 pt-20 ">
          {teamMembers.map((member, i) => (
            <MemberCard key={i} member={member} style={"w-96"} />
          ))}
        </div>
      </section>
      <section
        id="trial"
        className="flex flex-col gap-10 items-center px-[15%] py-20"
      >
        <p className="text-center text-slate-800 text-4xl font-bold font-['Montserrat']  tracking-tight">
          Start your 14 days free trial
        </p>
        <p className="text-center text-neutral-500 text-base font-normal font-['Montserrat'] tracking-tight max-w-md">
          Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
          RELIT official consequent.
        </p>
        <div className="blueBtn">Try it now</div>
        <div className="flex items-center gap-10">
          <Icon icon="logos:twitter" className="w-6 h-6" />
          <Icon icon="logos:facebook" className="w-6 h-6" />
          <Icon icon="skill-icons:instagram" className="w-6 h-6" />
          <Icon icon="devicon:linkedin" className="w-6 h-6" />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TeamPage;
