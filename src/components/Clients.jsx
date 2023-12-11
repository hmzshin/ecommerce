import brand1 from "../assets/clients/brand1.svg";
import amazon from "../assets/clients/amazon.svg";
import hooli from "../assets/clients/hooli.svg";
import lyft from "../assets/clients/lyft.svg";
import reddit from "../assets/clients/reddit.svg";
import stripe from "../assets/clients/stripe.svg";

const clients = [hooli, lyft, brand1, stripe, amazon, reddit];
const Clients = () => {
  return (
    <section id="clients">
      <div className="flex justify-around py-10 px-[10%]">
        {clients.map((client) => (
          <img src={client} />
        ))}
      </div>
    </section>
  );
};

export default Clients;