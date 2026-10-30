import { useDebounce } from "../../../hooks/useDebounde";
import defaultImage from "../../../assets/react.svg";
import { Trash2, ImagePlus } from "lucide-react";

interface LogoProps {
  name: string;
  showImage: boolean;
  setShowImage: (showImage: boolean) => void;
}

const LoadImage = () => {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-surface text-text-muted shadow-sm transition hover:bg-primary-soft hover:text-primary">
      <ImagePlus size={15} />
    </div>
  );
};

const HideImage = () => {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-surface text-danger shadow-sm transition hover:bg-danger-soft">
      <Trash2 size={15} />
    </div>
  );
};

const AddLogo = ({ name, showImage, setShowImage }: LogoProps) => {
  const debouncedName = useDebounce(name, 1200);

  return (
    <div className="relative h-16 w-16">
      <img
        className="w-16 h-16 bg-[#2E2E2E]"
        src={
          debouncedName && showImage
            ? `http://localhost:3000/subscriptions/logo/${debouncedName}`
            : defaultImage
        }
      />

      {debouncedName ? (
        <button
          className="absolute -right-1 -bottom-3"
          type="button"
          onClick={() => setShowImage(!showImage)}
        >
          {showImage ? <HideImage /> : <LoadImage />}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddLogo;
