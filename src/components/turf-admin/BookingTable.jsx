import React from "react";
import Button from "../common/Button";
import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";

const paymentColor = {
  paid: "green",
  partial: "navy",
  pending: "red"
};

const statusColor = {
  upcoming: "navy",
  completed: "green",
  cancelled: "red"
};

const formatTime = (time) => {
  if (!time) return "";

  const [hour, minute] = time.split(":");
  const h = Number(hour);

  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;

  return `${hour12}:${minute} ${period}`;
};


export default function BookingTable({ bookings, onView }) {

  if (bookings.length === 0) {
    return (
      <EmptyState
        title="No bookings yet"
        description="Bookings made by customers will appear here."
      />
    );
  }


return (
    <div
      className="
        w-full
        rounded-xl
        border
        border-qt-line
        bg-white
      "
    >

      {/* Mobile card list */}
      <div
        className="
          divide-y
          divide-qt-line
          sm:hidden
        "
      >

        {bookings.map((b) => (

          <div
            key={b.id}
            className="
              p-4
            "
          >

            <div
              className="
                flex
                items-start
                justify-between
                gap-3
              "
            >

              <div className="min-w-0">

                <p className="font-medium text-qt-navy break-words">
                  {b.customer_name}
                </p>

                <p className="text-xs text-qt-charcoal/50 break-words">
                  {b.customer_phone}
                </p>

              </div>


              <div className="flex-shrink-0 flex flex-col items-end gap-1">

                <Badge color={statusColor[b.status]}>
                  {b.status}
                </Badge>

                <Badge color={paymentColor[b.payment_status]}>
                  {b.payment_status}
                </Badge>

              </div>

            </div>


            <div
              className="
                mt-2
                grid
                grid-cols-2
                gap-2
                text-xs
                text-qt-charcoal/70
              "
            >

              <div>
                <p className="text-qt-charcoal/50">Sport</p>
                <p className="capitalize font-medium text-qt-navy">
                  {b.sport_name || "—"}
                </p>
              </div>

              <div>
                <p className="text-qt-charcoal/50">Date</p>
                <p className="font-medium text-qt-navy whitespace-nowrap">
                  {b.booking_date}
                </p>
              </div>

            </div>


            <div
              className="
                mt-2
                text-xs
                text-qt-charcoal/70
              "
            >

              <p className="text-qt-charcoal/50">Time slot</p>

              <p className="font-mono text-qt-navy whitespace-nowrap">
                {b.time_slot
                  ? `${formatTime(b.time_slot.start_time)} – ${formatTime(b.time_slot.end_time)}`
                  : b.start_time
                  ? `${formatTime(b.start_time)} – ${formatTime(b.end_time)}`
                  : "—"}
              </p>

            </div>


            <div
              className="
                mt-2
                grid
                grid-cols-2
                gap-2
                text-xs
                text-qt-charcoal/70
              "
            >

              <div>
                <p className="text-qt-charcoal/50">Match type</p>
                <p className="capitalize font-medium text-qt-navy">
                  {b.match_type}
                </p>
              </div>

              <div>
                <p className="text-qt-charcoal/50">Total</p>
                <p className="font-medium text-qt-navy whitespace-nowrap">
                  ৳{b.total_amount}
                </p>
              </div>

            </div>


            <div
              className="
                mt-1
                flex
                items-center
                justify-between
                gap-2
                text-xs
              "
            >

              <span className="text-qt-charcoal/60">
                Due:
                <span className="font-medium text-qt-red ml-1">
                  ৳{b.due_amount}
                </span>
              </span>

              {b.transaction_id ? (

                <span className="inline-block max-w-[150px] truncate font-mono bg-qt-mist px-2 py-1 rounded text-qt-charcoal/80">
                  {b.transaction_id}
                </span>

              ) : (

                <span className="text-qt-charcoal/30">—</span>

              )}

            </div>


            <div
              className="
                mt-3
                flex
                justify-end
              "
            >

              <Button
                variant="ghost"
                onClick={() => onView(b)}
              >
                View
              </Button>

            </div>

          </div>

        ))}

      </div>


      <table
        className="
          hidden
          min-w-[1100px]
          w-full
          text-left
          text-xs
          sm:table
          sm:text-sm
        "
      >

        <thead
          className="
            bg-qt-mist
            text-[10px]
            sm:text-xs
            uppercase
            tracking-wide
            text-qt-charcoal/60
          "
        >

          <tr>

            <th className="px-3 sm:px-4 py-3">
              Customer
            </th>

            <th className="px-3 sm:px-4 py-3">
              Sport
            </th>

            <th className="px-3 sm:px-4 py-3">
              Time Slot
            </th>

            <th className="px-3 sm:px-4 py-3">
              Match type
            </th>

            <th className="px-3 sm:px-4 py-3">
              Date
            </th>

            <th className="px-3 sm:px-4 py-3">
              Created Time
            </th>

            <th className="px-3 sm:px-4 py-3">
              Total
            </th>

            <th className="px-3 sm:px-4 py-3">
              Due
            </th>

            <th className="px-3 sm:px-4 py-3">
              Transaction ID
            </th>

            <th className="px-3 sm:px-4 py-3">
              Match status
            </th>

            <th className="px-3 sm:px-4 py-3">
              Payment
            </th>

            <th className="px-3 sm:px-4 py-3 text-right">
              Actions
            </th>

          </tr>

        </thead>



        <tbody className="divide-y divide-qt-line">

          {bookings.map((b) => (

            <tr
              key={b.id}
              className="hover:bg-qt-mist/50"
            >

              {/* Customer */}
              <td className="px-3 sm:px-4 py-3">

                <p className="font-medium text-qt-navy">
                  {b.customer_name}
                </p>

                <p className="text-xs text-qt-charcoal/50">
                  {b.customer_phone}
                </p>

              </td>



              {/* Sport */}
              <td
                className="
                  px-3
                  sm:px-4
                  py-3
                  capitalize
                  text-qt-charcoal/80
                "
              >
                {b.sport_name || "—"}
              </td>



              {/* Time Slot */}
              <td
                className="
                  px-3
                  sm:px-4
                  py-3
                  font-mono
                  text-qt-navy
                  whitespace-nowrap
                "
              >
                {b.time_slot
                  ? `${formatTime(b.time_slot.start_time)} – ${formatTime(b.time_slot.end_time)}`
                  : b.start_time
                  ? `${formatTime(b.start_time)} – ${formatTime(b.end_time)}`
                  : "—"}
              </td>



              {/* Match type */}
              <td className="px-3 sm:px-4 py-3 capitalize text-qt-charcoal/70">
                {b.match_type}
              </td>



              {/* Date */}
              <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-qt-charcoal/70">
                {b.booking_date}
              </td>




              {/* Created At */}
              <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-qt-charcoal/70">

                {b.created_at
                  ? new Date(b.created_at).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "—"}

              </td>




              {/* Total */}
              <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                ৳{b.total_amount}
              </td>




              {/* Due */}
              <td className="px-3 sm:px-4 py-3 font-medium text-qt-red whitespace-nowrap">
                ৳{b.due_amount}
              </td>




              {/* Transaction ID */}
              <td className="px-3 sm:px-4 py-3">

                {b.transaction_id ? (

                  <span
                    className="
                      inline-block
                      max-w-[150px]
                      truncate
                      font-mono
                      text-xs
                      text-qt-charcoal/80
                      bg-qt-mist
                      px-2
                      py-1
                      rounded
                    "
                  >
                    {b.transaction_id}
                  </span>

                ) : (

                  <span className="text-xs text-qt-charcoal/30">
                    —
                  </span>

                )}

              </td>




              {/* Match status */}
              <td className="px-3 sm:px-4 py-3">

                <Badge color={statusColor[b.status]}>
                  {b.status}
                </Badge>

              </td>




              {/* Payment status */}
              <td className="px-3 sm:px-4 py-3">

                <Badge color={paymentColor[b.payment_status]}>
                  {b.payment_status}
                </Badge>

              </td>




              {/* Actions */}
              <td className="px-3 sm:px-4 py-3 text-right">

                <Button
                  variant="ghost"
                  onClick={() => onView(b)}
                >
                  View
                </Button>

              </td>


            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}