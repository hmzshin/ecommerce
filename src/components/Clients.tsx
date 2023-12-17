import brand1 from "../assets/clients/brand1.svg";
import amazon from "../assets/clients/amazon.svg";
import hooli from "../assets/clients/hooli.svg";
import lyft from "../assets/clients/lyft.svg";
import reddit from "../assets/clients/reddit.svg";
import stripe from "../assets/clients/stripe.svg";

const clients = [hooli, lyft, brand1, stripe, amazon, reddit];
const Clients = ({ bgColor }: any) => {
  return (
    <section id="clients">
      <div
        className={`flex flex-wrap gap-32 xl:gap-20 items-center justify-center py-20 px-[5%] ${bgColor}`}
      >
        {clients.map((client, i) => (
          <div key={i} className="w-36 h-16">
            <img src={client} className="w-full h-full object-fill" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
