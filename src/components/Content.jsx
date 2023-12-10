import contentImg1 from "../assets/content/contentImg1.svg";
import contentImg2 from "../assets/content/contentImg2.svg";
const Content = () => {
  return (
    <section id="content">
      <div className="px-[10%] py-20 flex justify-between">
        <div className="flex gap-5">
          {" "}
          <img src={contentImg1} className="h-[700px]" />
          <img src={contentImg2} className="h-[700px]" />
        </div>

        <div className="flex-col justify-center items-start gap-10 inline-flex">
          <div className="text-sky-500 text-2xl font-bold font-['Montserrat'] leading-normal tracking-tight">
            Featured Products
          </div>
          <div className="w-[700px] text-slate-800 text-6xl font-bold font-['Montserrat'] leading-[50px] tracking-tight">
            We love what we do
          </div>
          <div className="w-[500px] text-neutral-500 text-lg font-normal font-['Montserrat'] leading-tight tracking-tight">
            Problems trying to resolve the conflict between <br />
            the two major realms of Classical physics: <br />
            Newtonian mechanics.
            <br /> <br />
            Problems trying to resolve the conflict between <br />
            the two major realms of Classical physics: <br />
            Newtonian mechanics{" "}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
