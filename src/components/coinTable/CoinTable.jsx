import { Progress } from "@/components/ui/progress";
import CoinPercentage from "./CoinPercentage";
import CoinTableChart from "./CoinTableChart";
import Link from "next/link";

const CoinTable = ({ coinList }) => {
  return (
    <div className="flex flex-col gap-[8px]">
      {coinList.map((item, index) => {
        const priceChange1h = item.price_change_percentage_1h_in_currency;
        const priceChange24h = item.price_change_percentage_24h_in_currency;
        const priceChange7d = item.price_change_percentage_7d_in_currency;

        return (
          <Link
            key={item.id}
            href={`/coin/${item.id}`}
            className="flex gap-[20px] bg-white dark:bg-[#191925] text-black dark:text-white p-[20px] rounded-md items-center justify-center"
          >
            <p>{index + 1}</p>
            <div className="flex items-center gap-[16px] w-[208px] flex-wrap">
              <img src={item.image} className="w-[32px]"></img>
              <h1 className="align-baseline">{`${
                item.name
              }[${item.symbol.toUpperCase()}]`}</h1>
            </div>
            <p className="w-[80px]">{`$${item.current_price.toFixed(2)}`}</p>
            <CoinPercentage price_percentage={priceChange1h} />
            <CoinPercentage price_percentage={priceChange24h} />
            <CoinPercentage price_percentage={priceChange7d} />
            <Progress
              value={(item.total_volume / item.market_cap) * 100}
              className="w-[228px] h-[6px]"
            />
            <Progress
              value={(item.circulating_supply / item.total_supply) * 100}
              className="w-[228px] h-[6px]"
            />
            <div>
              <CoinTableChart data={item.sparkline_in_7d.price} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CoinTable;
