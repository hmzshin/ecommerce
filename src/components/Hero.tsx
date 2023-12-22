import heroImg from "../assets/hero/heroImg.png";

const Hero = () => {
  return (
    <section id="hero" className="py-10">
      <div className="flex flex-col mx-5 pt-7 rounded-3xl bg-gradient-to-r from-[#96E9FB] to-[#ABECD6] gap-16  md:flex-row  md:h-[390px] md:gap-3  lg:justify-between lg:h-[450px] xl:mr-20 items-center xl:pr-12  xl:h-[540px] 2xl:h-[600px]">
        <section className="flex flex-col justify-center items-center gap-5  py-5 lg:gap-8 md:items-start md:pl-10 lg:pl-16 xl:pl-20 2xl:pl-32 ">
          <p className="text-sky-600 text-base font-bold font-['Montserrat'] leading-normal tracking-tight">
            SUMMER 2020
          </p>
          <p className="text-slate-800  text-4xl text-center md:text-left font-bold font-['Montserrat'] xl:leading-[80px] tracking-tight lg:text-6xl ">
            NEW COLLECTION
          </p>
          <p className="text-neutral-500 text-xl font-normal font-['Montserrat'] leading-7 tracking-tight px-12 text-center md:px-0 md:text-left ">
            We know how large objects will act,{" "}
            <br className="hidden lg:block" />
            but things on a small scale.
          </p>

          <div className="px-7 py-2  bg-sky-500 rounded-md flex-col justify-start items-center gap-2.5 flex lg:px-10 lg:py-4">
            <p className="text-center text-white text-xl lg:text-2xl font-bold font-['Montserrat'] leading-loose tracking-tight">
              SHOP NOW
            </p>
          </div>
        </section>
        <section className="relative  z-0 w-[445px] shrink-0 grow-0 h-[295px] md:scale-[1.2] lg:scale-[1.4] xl:scale-[1.7] 2xl:scale-[1.9]  ">
          <img src={heroImg} className="" />
          <div className="w-10 h-10 absolute bg-white rounded-full -z-10 " />
          <div className=" w-[270px] h-[270px] bg-white rounded-full absolute -top-10 right-20 -z-10" />
        </section>
      </div>
    </section>
  );
};

export default Hero;
