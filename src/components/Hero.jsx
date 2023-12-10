import heroImg from "../assets/hero/heroImg.png";
const Hero = () => {
  return (
    <section id="hero" className="py-20">
      <div className="flex justify-end h-[70vh] rounded-3xl mx-[5%] bg-gradient-to-r from-[#96E9FB] to-[#ABECD6] ">
        <section className="flex flex-col justify-center items-start gap-8">
          <p className="text-sky-600 text-base font-bold font-['Montserrat'] leading-normal tracking-tight">
            SUMMER 2020
          </p>
          <p className="text-slate-800 text-6xl font-bold font-['Montserrat'] leading-[80px] tracking-tight">
            NEW COLLECTION
          </p>
          <p className="text-neutral-500 text-xl font-normal font-['Montserrat'] leading-7 tracking-tight">
            We know how large objects will act, <br />
            but things on a small scale.
          </p>
          <div className="justify-start items-start gap-2.5 inline-flex">
            <div className="px-10 py-4 bg-sky-500 rounded-md flex-col justify-start items-center gap-2.5 inline-flex">
              <div className="text-center text-white text-2xl font-bold font-['Montserrat'] leading-loose tracking-tight">
                SHOP NOW
              </div>
            </div>
          </div>
        </section>
        <section className="w-1/2 relative">
          <img
            src={heroImg}
            className=" absolute -right-40 bottom-0 w-[900px] z-10"
          />
          <div className="w-20 h-20 bg-white rounded-full absolute left-1/3 " />
          <div className="w-[550px] h-[550px] bg-white rounded-full absolute -top-5 -right-5" />
        </section>
      </div>
    </section>
  );
};

export default Hero;
