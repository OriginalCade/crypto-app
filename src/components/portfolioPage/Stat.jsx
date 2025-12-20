import { Progress } from "../ui/progress";

const Stat = ({ label, value, positive, progress, custom }) => {
  const textColor =
    positive === undefined
      ? "text-cyan-400" // neutral
      : positive
      ? "text-emerald-400" // positive
      : "text-[#FE2264]"; // negative

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs dark:text-white/60 text-black">{label}</span>

      {custom ? (
        custom
      ) : (
        <span className={`font-semibold ${textColor}`}>{value}</span>
      )}

      {typeof progress === "number" && (
        <Progress value={progress} className="mt-1 h-[6px]" />
      )}
    </div>
  );
};

export default Stat;
