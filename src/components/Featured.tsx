import bookReader from "../assets/features/book-reader.svg";
import book from "../assets/features/carbon-book.svg";
import arrowGrowth from "../assets/features/arrow-growth.svg";

const features = [
  {
    img: bookReader,
    header: "Easy Wins",
    body: "Get your best looking smile now!",
  },
  {
    img: book,
    header: "Concrete",
    body: "Defalcate is most focused in helping you discover your most beautiful smile",
  },
  {
    img: arrowGrowth,
    header: "Hack Growth",
    body: "Overcame any hurdle or any other problem.",
  },
];

const Featured = () => {
  return (
    <section id="features">
      <div className="flex flex-col gap-10  lg:px-[5%] 2xl:px-[15%] py-20">
        <section className="flex flex-col gap-5">
          <p className="text-center text-neutral-500 text-2xl font-normal font-['Montserrat'] tracking-[0.2px]">
            Featured Products
          </p>
          <p className="text-center text-slate-800 text-3xl font-bold font-['Montserrat'] leading-10 tracking-[0.1px]">
            THE BEST SERVICES
          </p>
          <p className="text-center text-neutral-500 text-base font-normal font-['Montserrat'] leading-5 tracking-[0.2px]">
            Problems trying to resolve the conflict between{" "}
          </p>
        </section>
        <section className="flex flex-wrap  justify-center gap-10 ">
          {features.map((feature, i) => (
            <div
              key={i}
              className="px-10 py-9 flex-col justify-start items-center gap-5 inline-flex"
            >
              <img src={feature.img} className="w-32" />
              <p className="text-center text-slate-800 text-3xl font-bold font-['Montserrat'] leading-loose tracking-[0.2px]">
                {feature.header}
              </p>
              <p className="w-[260px] text-center text-neutral-500 font-normal font-['Montserrat'] leading-tight tracking-[0.2px]">
                {feature.body}
              </p>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
};

export default Featured;
