import LinkIcon from "@/assets/LinkIcon.svg";
import CopyIcon from "@/assets/CopyIcon.svg";
import { toast } from "sonner";

const CoinLink = ({ link }) => {
  const handleCopyClick = () => {
    toast(link);
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="w-full h-[52px] bg-white dark:bg-[#1E1932] flex justify-between items-center rounded-md p-[16px 24px]">
      <a target="_blank" rel="noreferrer" href={link}>
        <LinkIcon />
      </a>
      <h1>{link}</h1>
      <CopyIcon onClick={() => handleCopyClick()} />
    </div>
  );
};

export default CoinLink;
