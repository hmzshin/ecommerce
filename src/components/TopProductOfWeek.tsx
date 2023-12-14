import img1 from "../assets/shopCards/img1.svg";
import img2 from "../assets/shopCards/img2.svg";
import img3 from "../assets/shopCards/img3.svg";

const TopProductsOfWeek = () => {
  return (
    <section id="shopCards">
      <section className="flex pl-[7%] pr-[14%] items-center gap-8  py-20">
        <div className="w-[50%]  relative ">
          <div className="w-[520px] h-72 absolute bottom-0 bg-[#2d8bc0bf] p-16 flex flex-col gap-5 hover:w-full hover:h-full items-center justify-center transition-all duration-500">
            <p className=" text-white text-3xl font-bold font-['Montserrat'] tracking-tight">
              Top Product Of <br />
              the Week
            </p>
            <p className="exploreBtn">EXPLORE ITEMS</p>
          </div>
          <img
            src={img1}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="flex flex-wrap gap-10 content-between w-[45%] ">
          <div className="w-full relative">
            <div className="w-[425px] h-48 absolute bottom-0 bg-[#2d8bc0bf] p-10 flex flex-col gap-5 items-center justify-center hover:w-full hover:h-full  transition-all duration-500">
              <p className=" text-white text-2xl font-bold font-['Montserrat'] tracking-tight">
                Top Product Of the Week
              </p>
              <p className="exploreBtn">EXPLORE ITEMS</p>
            </div>
            <img
              src={img2}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="w-full relative">
            <div className="w-[425px] h-48 absolute bottom-0 bg-[#2d8bc0bf] p-10 flex flex-col gap-5 items-center justify-center hover:w-full hover:h-full  transition-all duration-500">
              <p className=" text-white text-2xl font-bold font-['Montserrat'] tracking-tight">
                Top Product Of the Week
              </p>
              <p className="exploreBtn">EXPLORE ITEMS</p>
            </div>
            <img
              src={img3}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>
    </section>
  );
};

export default TopProductsOfWeek;