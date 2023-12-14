import start from "../assets/blog/star.svg";
import salesIcon from "../assets/blog/salesIcon.svg";
import arrowRight from "../assets/blog/arrowIcon.svg";

const BlogCard = ({ content }: any) => {
  return (
    <div className="flex">
      <img src={content.img} className="w-64" />
      <div className="w-96 p-7 flex-col justify-start items-start gap-5 flex">
        <div className="flex justify-between items-center self-stretch">
          <p className="text-sky-500 text-base font-bold font-['Montserrat'] leading-normal tracking-[0.2px]">
            {content.category}
          </p>

          <div className="w-14 h-7 p-1 bg-slate-800 rounded-3xl flex justify-between items-center ">
            <img src={start} />
            <p className="text-white text-sm font-normal font-['Montserrat'] tracking-[0.2px]">
              {content.overview}
            </p>
          </div>
        </div>
        <p className=" text-slate-800 text-lg font-bold font-['Montserrat'] tracking-[0.1px]">
          {content.title}
        </p>
        <p className=" text-neutral-500 text-base font-normal font-['Montserrat'] tracking-[0.2px]">
          {content.description}
        </p>
        <div className="flex justify-start items-center gap-2.5 ">
          <img src={salesIcon} />
          <p className="text-neutral-500 text-base font-bold font-['Montserrat'] tracking-[0.2px]">
            {content.sales}
          </p>
        </div>
        <p className="text-center text-stone-300 text-lg font-bold font-['Montserrat'] leading-normal tracking-[0.2px]">
          <span className="">{content.prices.normal}</span>
          <span className=" text-teal-700 ml-3">{content.prices.discount}</span>
        </p>
        <div className="flex justify-start items-center gap-2">
          {content.colors.map((color: any, i: number) => (
            <div key={i} className={`w-4 h-4 ${color} rounded-full`} />
          ))}
        </div>
        <div className="flex py-3 justify-between items-center self-stretch">
          {content.frame.map((item: any, i: number) => (
            <div key={i} className="justify-start items-center gap-[5px] flex">
              <img src={item.icon} />
              <p className="text-neutral-500 text-base font-normal font-['Montserrat'] tracking-[0.2px]">
                {item.content}
              </p>
            </div>
          ))}
        </div>

        <p className="px-4 py-4 rounded-[37px] border border-sky-500 text-sky-500 text-lg font-bold font-['Montserrat'] leading-normal tracking-[0.2px] flex gap-2 whitespace-nowrap ">
          Learn More <img src={arrowRight} />
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
