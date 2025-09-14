import UpIcon from "@/assets/UpIcon.svg";
import DownIcon from "@/assets/DownIcon.svg";

const CoinPercentage = ({ price_percentage }) => {
  return (
    <div className="flex items-center gap-[4px]">
      {price_percentage >= 0 ? <UpIcon /> : <DownIcon />}
      <p
        className={price_percentage >= 0 ? "text-[#01F1E3]" : "text-[#FE2264]"}
      >
        {price_percentage ? `${price_percentage.toFixed(2)}%` : "null"}
      </p>
    </div>
  );
};

export default CoinPercentage;
