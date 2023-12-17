import BlogCard from "./BlogCard";
import { contents } from "../data";
const Blog = () => {
  return (
    <section id="blog">
      <div className="flex flex-col items-center lg:px-[5%] xl:px-[10%] 2xl:px-[15%] py-20 gap-20">
        <div className="w-96 h-24 flex-col justify-start items-center gap-5 inline-flex">
          <p className="text-center text-sky-500 font-bold font-['Montserrat'] leading-normal tracking-[0.2px]">
            Practice Advice
          </p>
          <p className="text-center text-slate-800 text-5xl font-bold font-['Montserrat']  tracking-[0.2px]">
            Featured Posts
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-20 md:gap-20 xl:flex-nowrap justify-center w-full">
          {contents.map((content, i) => (
            <BlogCard key={i} content={content} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
