import defaultImage from "../../../assets/react.svg";

interface Props {
  name: string;
  showImage: boolean;
}

const ShowLogo = ({ name, showImage }: Props) => {
  return (
    <img
      className="w-16 h-16 bg-[#2E2E2E]"
      src={
        showImage
          ? `http://localhost:3000/subscriptions/logo/${name}`
          : defaultImage
      }
    />
  );
};

export default ShowLogo;
