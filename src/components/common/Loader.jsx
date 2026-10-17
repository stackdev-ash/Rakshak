import { LoaderCircle } from "lucide-react";

const Loader = ({
  text = "Loading...",
  fullScreen = true,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen ? "min-h-screen" : "py-10"
      }`}
    >
      <LoaderCircle
        size={50}
        className="text-green-600 animate-spin"
      />

      <p className="text-gray-600 font-medium">
        {text}
      </p>
    </div>
  );
};

export default Loader;