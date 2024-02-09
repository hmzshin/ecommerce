import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  return (
    <section className="flex items-center justify-center flex-col py-20 gap-5">
      <Icon icon="ri:verified-badge-fill" className="w-20 h-20 text-sky-400" />
      <p className="text-lg">Order is successfully taken.</p>
      <p
        className="text-lg cursor-pointer hover:underline"
        onClick={() => navigate("/orders")}
      >
        Click here to see previous orders.
      </p>
    </section>
  );
};

export default SuccessPage;
