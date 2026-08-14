import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const MATCH_COLORS = ["#3CA458", "#16225C", "#D32F2F"];
const PAYMENT_COLORS = ["#3CA458", "#16225C", "#D32F2F"];


export default function DashboardCharts({ stats }) {

  const matchData = [
    {
      name: "Upcoming",
      value: stats.upcoming_matches
    },
    {
      name: "Completed",
      value: stats.completed_matches
    },
    {
      name: "Cancelled",
      value: stats.cancelled_matches
    },
  ];


  const paymentData = [
    {
      name: "Paid",
      value: stats.payment_paid
    },
    {
      name: "Partial",
      value: stats.payment_partial
    },
    {
      name: "Pending",
      value: stats.payment_pending
    },
  ];


  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        gap-4
        sm:gap-5
      "
    >


      {/* Matches Chart */}
      <div
        className="
          rounded-xl
          border
          border-qt-line
          bg-white
          p-4
          sm:p-5
          shadow-card
        "
      >

        <h3
          className="
            mb-2
            sm:mb-3
            text-sm
            sm:text-base
            font-display
            font-semibold
            text-qt-navy
          "
        >
          Matches by status
        </h3>


        <ResponsiveContainer
          width="100%"
          height={220}
        >

          <PieChart>

            <Pie
              data={matchData}
              dataKey="value"
              nameKey="name"
              innerRadius={45}
              outerRadius={75}
              paddingAngle={2}
            >

              {matchData.map((_, i) => (

                <Cell
                  key={i}
                  fill={
                    MATCH_COLORS[
                      i % MATCH_COLORS.length
                    ]
                  }
                />

              ))}

            </Pie>


            <Tooltip />


            <Legend
              wrapperStyle={{
                fontSize: "12px"
              }}
            />

          </PieChart>

        </ResponsiveContainer>


      </div>




      {/* Payments Chart */}
      <div
        className="
          rounded-xl
          border
          border-qt-line
          bg-white
          p-4
          sm:p-5
          shadow-card
        "
      >

        <h3
          className="
            mb-2
            sm:mb-3
            text-sm
            sm:text-base
            font-display
            font-semibold
            text-qt-navy
          "
        >
          Payments by status
        </h3>



        <ResponsiveContainer
          width="100%"
          height={220}
        >

          <PieChart>

            <Pie
              data={paymentData}
              dataKey="value"
              nameKey="name"
              innerRadius={45}
              outerRadius={75}
              paddingAngle={2}
            >

              {paymentData.map((_, i) => (

                <Cell
                  key={i}
                  fill={
                    PAYMENT_COLORS[
                      i % PAYMENT_COLORS.length
                    ]
                  }
                />

              ))}

            </Pie>


            <Tooltip />


            <Legend
              wrapperStyle={{
                fontSize: "12px"
              }}
            />


          </PieChart>

        </ResponsiveContainer>


      </div>


    </div>
  );
}