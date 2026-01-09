import { type ReactElement, useEffect, useState } from "react";
import type { CategoryExpenseSummary, DailyExpenseSummary, SumExpenses } from "../../model/SumExpensesModel.ts";
import { getExpenseSummary } from "../../services/ExpenseService.ts";
import type { AxiosError, AxiosResponse } from "axios";
import StatCard from "./StatCard.tsx";
import { AMOUNT_SYMBOL, formatDate } from "../../utils/Utils.ts";

function DashboardPage(): ReactElement {
  const [sumExpenses, setSumExpenses] = useState<SumExpenses>({
    totalExpenses: 0.00,
    last7DaysExpense: 0.00,
    last30DaysExpense: 0.00,
    last365DaysExpense: 0.00,
    dailyExpenseSummaryDtos: [],
    categoryExpenseSummaryDtos: []
  });

  useEffect(() => {
    getExpenseSummary()
      .then((response: AxiosResponse<SumExpenses>) => {
        console.log(response.data);
        setSumExpenses(response.data);
      })
      .catch((error: AxiosError) => console.log(error));
  }, []);

  return (
    <div className="min-w-full min-h-full flex items-start justify-center px-4 py-5">
      <div className="min-w-3xl mx-auto space-y-6">
        {/* top stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <StatCard title="Last 365 days" amount={sumExpenses.last365DaysExpense} />
          <StatCard title="Last 30 days" amount={sumExpenses.last30DaysExpense} />
          <StatCard title="Last 7 days" amount={sumExpenses.last7DaysExpense} />
        </div>

        {/* bottom panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* past 30 days sum expense */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl shadow-lg flex- flex-col">
            <div className="py-3 text-center border-b border-slate-800">
              <h2 className="text-sm font-semibold text-fuchsia-400">
                Past 30 days sum expense
              </h2>
            </div>
            <div className="p-4 h-80 overflow-y-auto">
              <ul className="space-y-3 text-sm">
                {sumExpenses.dailyExpenseSummaryDtos.map((item: DailyExpenseSummary, idx: number) => (
                  <li key={idx}>
                    <div className="text-slate-200 font-medium">
                      {formatDate(item.date)}
                    </div>
                    <div className="text-emerald-400 font-semibold">
                      {`${AMOUNT_SYMBOL}${item.totalAmount.toFixed(2)}`}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Categorical sum expense */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl shadow-lg flex flex-col">
            <div className="py-3 text-center border-b border-slate-800">
              <h2 className="text-sm font-semibold text-fuchsia-400">
                Categorical sum expense
              </h2>
            </div>

            <div className="p-4 h-80 overflow-y-auto">
              <ul className="space-y-3 text-sm">
                {sumExpenses.categoryExpenseSummaryDtos.map((item: CategoryExpenseSummary, idx: number) => (
                  <li key={idx}>
                    <div className="font-semibold text-slate-100">
                      {item.categoryName}
                    </div>
                    <div className="text-emerald-400 font-semibold">
                      {`${AMOUNT_SYMBOL}${item.totalAmount.toFixed(2)}`}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
