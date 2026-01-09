import type { ReactElement } from "react";
import { AMOUNT_SYMBOL } from "../../utils/Utils.ts";

type StatCardProps = {
  title: string;
  amount: number;
};

function StatCard({ title, amount }: StatCardProps): ReactElement {
  return (
    <div
      className="bg-slate-900/80 border border-slate-800 rounded-xl shadow-lg px-5 py-4 flex flex-col
      justify-center"
    >
      <div className="text-sm font-semibold text-sky-300 mb-2">
        {title}
      </div>
      <hr className="text-slate-500" />
      <div className="text-xl font-bold text-emerald-400 mt-2">
        {`${AMOUNT_SYMBOL}${amount.toFixed(2)}`}
      </div>
    </div>
  );
}

export default StatCard;
