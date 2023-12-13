import { Icon } from "@iconify/react";

const MemberCard = ({ member }) => {
  return (
    <div className="flex flex-col items-center gap-7 w-80 border  hover:shadow-2xl hover:scale-[1.01] transition-all pb-5">
      <img
        src={member.img}
        className="w-full h-full object-cover object-center "
      />
      <div className="flex flex-col items-center gap-4 pb-3">
        <p className="text-center text-slate-800 text-xl font-bold font-['Montserrat'] tracking-[.0.2px]">
          {member.username}
        </p>
        <p className="text-center text-neutral-500 text-base font-bold font-['Montserrat'] tracking-[0.02px]">
          {member.profession}
        </p>
        <div className="text-sky-500 flex justify-around self-stretch">
          <Icon icon="mdi:facebook" className="w-5 h-5" />
          <Icon icon="mdi:instagram" className="w-5 h-5" />
          <Icon icon="mdi:twitter" className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
