import img1 from "../assets/shopCards/img1.svg";
import img2 from "../assets/shopCards/img2.png";
import img3 from "../assets/shopCards/img3.png";

const TopProductsOfWeek = () => {
  return (
    <section id="shopCards">
      <section className="flex flex-wrap md:flex-nowrap px-[7%] lg:pr-[12%] md:h-[900px] items-center gap-10 md:gap-8  py-20">
        <div className="h-[500px] md:w-[50%] md:h-full relative ">
          <div className="w-full lg:w-[69%] h-[40%] absolute bottom-0 bg-[#2d8bc0bf] p-16 flex flex-col gap-5 hover:w-full hover:h-full items-center justify-center transition-all duration-500 ">
            <p className=" text-white text-3xl font-bold font-['Montserrat'] tracking-tight">
              Top Product Of <br />
              the Week
            </p>
            <p className="exploreBtn whitespace-nowrap">EXPLORE ITEMS</p>
          </div>
          <img src={img1} className="default-img" />
        </div>
        <div className="flex flex-wrap gap-5 md:gap-0  content-between h-full md:w-[45%] ">
          <div className="w-full  md:h-[calc(50%-10px)] relative ">
            <div className="w-full lg:w-[60%] h-[60%] absolute bottom-0 bg-[#2d8bc0bf] p-10 flex flex-col gap-5 items-center justify-center hover:w-full hover:h-full  transition-all duration-500">
              <p className=" text-white text-2xl font-bold font-['Montserrat'] tracking-tight">
                Top Product Of the Week
              </p>
              <p className="exploreBtn  whitespace-nowrap">EXPLORE ITEMS</p>
            </div>
            <img src={img2} className="default-img" />
          </div>
          <div className="w-full md:h-[calc(50%-10px)] mt-2.5 relative">
            <div className="w-full lg:w-[60%] h-[60%] absolute bottom-0 bg-[#2d8bc0bf] p-10 flex flex-col gap-5 items-center justify-center hover:w-full hover:h-full  transition-all duration-500">
              <p className=" text-white text-2xl font-bold font-['Montserrat'] tracking-tight">
                Top Product Of the Week
              </p>
              <p className="exploreBtn  whitespace-nowrap">EXPLORE ITEMS</p>
            </div>
            <img src={img3} className="default-img" />
          </div>
        </div>
      </section>
    </section>
  );
};

export default TopProductsOfWeek;
