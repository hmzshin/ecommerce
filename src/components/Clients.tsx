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
      <div className={`flex justify-around py-20 px-[10%] ${bgColor}`}>
        {clients.map((client, i) => (
          <img key={i} src={client} />
        ))}
      </div>
    </section>
  );
};

export default Clients;
