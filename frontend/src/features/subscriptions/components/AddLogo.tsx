import { useDebounce } from "../../../hooks/useDebounde";
import defaultImage from "../../../assets/react.svg";

interface LogoProps {
  name: string;
  showImage: boolean;
  setShowImage: (showImage: boolean) => void;
}

const AddLogo = ({ name, showImage, setShowImage }: LogoProps) => {
  const debouncedName = useDebounce(name, 1200);

  return (
    <div className="flex">
      <img
        className="w-16 h-16 bg-[#2E2E2E]"
        src={
          debouncedName && showImage
            ? `http://localhost:3000/subscriptions/logo/${debouncedName}`
            : defaultImage
        }
      />

      {debouncedName ? (
        <button type="button" onClick={() => setShowImage(!showImage)}>
          {showImage ? "Delate Image" : "Find Image"}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddLogo;
