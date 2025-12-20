import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CoinPercentage from "./CoinPercentage";
import CoinTableChart from "./CoinTableChart";
import Link from "next/link";

const CoinTable = ({ coinList }) => {
  return (
    <Table
      className={
        "bg-white text-black dark:bg-[#191925] dark:text-white w-[98%] justify-self-center"
      }
    >
      <TableHeader>
        <TableRow>
          <TableHead
            className={"text-black dark:text-white hidden sm:table-cell"}
          >
            Number
          </TableHead>
          <TableHead
            className={"text-black dark:text-white hidden sm:table-cell"}
          >
            Name
          </TableHead>
          <TableHead
            className={"text-black dark:text-white hidden sm:table-cell"}
          >
            Price
          </TableHead>
          <TableHead
            className={"text-black dark:text-white hidden sm:table-cell"}
          >
            1h%
          </TableHead>
          <TableHead
            className={"text-black dark:text-white hidden sm:table-cell"}
          >
            24h%
          </TableHead>
          <TableHead
            className={"text-black dark:text-white hidden sm:table-cell"}
          >
            7d%
          </TableHead>
          <TableHead
            className={"text-black dark:text-white hidden sm:table-cell"}
          >
            24h volume/market cap
          </TableHead>
          <TableHead
            className={"text-black dark:text-white hidden sm:table-cell"}
          >
            Circulating/Total supply
          </TableHead>
          <TableHead
            className={"text-black dark:text-white hidden sm:table-cell"}
          >
            Last 7d
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {coinList.map((item, index) => {
          const priceChange1h = item.price_change_percentage_1h_in_currency;
          const priceChange24h = item.price_change_percentage_24h_in_currency;
          const priceChange7d = item.price_change_percentage_7d_in_currency;

          return (
            <TableRow key={item.id}>
              <TableCell className="hidden sm:table-cell">
                <p>{index + 1}</p>
              </TableCell>
              <TableCell>
                <div className="flex w-[120px] sm:w-full">
                  <img src={item.image} className="w-[32px]"></img>
                  {/* Desktop */}
                  <Link
                    className="self-center pl-3 hidden sm:block"
                    href={`/coin/${item.id}`}
                  >{`${item.name}[${item.symbol.toUpperCase()}]`}</Link>
                  {/* Mobile */}
                  <Link
                    className="self-center pl-3 sm:hidden"
                    href={`/coin/${item.id}`}
                  >{`${item.symbol.toUpperCase()}`}</Link>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <p className="w-[80px]">{`$${item.current_price.toFixed(
                  2
                )}`}</p>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <CoinPercentage price_percentage={priceChange1h} />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <CoinPercentage price_percentage={priceChange24h} />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <CoinPercentage price_percentage={priceChange7d} />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Progress
                  value={(item.total_volume / item.market_cap) * 100}
                  className="w-[228px] h-[6px]"
                />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Progress
                  value={(item.circulating_supply / item.total_supply) * 100}
                  className="w-[228px] h-[6px]"
                />
              </TableCell>
              <TableCell>
                <div>
                  <CoinTableChart data={item.sparkline_in_7d.price} />
                </div>
              </TableCell>
              <TableCell className={"sm:hidden"}>
                <p className="w-[80px]">{`$${item.current_price.toFixed(
                  2
                )}`}</p>
                <CoinPercentage price_percentage={priceChange24h} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CoinTable;
