import Modal from "@/components/generic/Modal";
import Image from "next/image";

const Notice = ({ isOpen, onClose, type, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-4 p-4">
        <Image
          src={type === "success" ? "/happy.png" : "/sad.png"}
          alt={type === "success" ? "Success" : "Error"}
          width={200}
          height={200}
        />  
        <p className="text-lg font-semibold">{message}</p>
      </div>
    </Modal>
  );
};

export default Notice;
