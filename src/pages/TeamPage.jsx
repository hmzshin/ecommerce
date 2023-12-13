import { Icon } from "@iconify/react";
import Footer from "../components/Footer";
import HeaderInnerPages from "../components/HeaderInnerPages";
import MemberCard from "../components/MemberCard";
import { teamMembers } from "../data";

const TeamPage = () => {
  return (
    <>
      <HeaderInnerPages />
      <section id="hero"></section>
      <section id="teamMembers" className="px-[15%] py-20">
        <h3 className="text-slate-800 text-5xl text-center font-bold font-['Montserrat'] tracking-tight ">
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
