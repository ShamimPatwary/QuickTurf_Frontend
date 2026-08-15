import React from "react";
import Button from "../common/Button";
import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";

const statusColor = {
  pending: "navy",
  active: "green",
  rejected: "red",
  expired: "gray"
};

export default function MemberTable({
  members,
  onApprove,
  onReject
}) {

  if (members.length === 0) {
    return (
      <EmptyState
        title="No membership purchases yet"
        description="Customer membership purchases will appear here for approval."
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

        {members.map((m) => (

          <div
            key={m.id}
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

                <p
                  className="
                    font-medium
                    text-qt-navy
                    break-words
                  "
                >
                  {m.name}
                </p>

                <p className="text-xs text-qt-charcoal/50 break-words">
                  {m.email || "—"}
                </p>

              </div>


              <div className="flex-shrink-0">

                <Badge color={statusColor[m.status]}>
                  {m.status}
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
                <p className="text-qt-charcoal/50">Phone</p>
                <p className="font-medium text-qt-navy whitespace-nowrap overflow-hidden">
                  {m.phone}
                </p>
              </div>


              <div>
                <p className="text-qt-charcoal/50">Amount paid</p>
                <p className="font-medium text-qt-navy whitespace-nowrap">
                  ৳{m.amount_paid}
                </p>
              </div>

            </div>


            <div
              className="
                mt-2
                flex
                items-center
                justify-between
                gap-2
              "
            >

              <span className="text-xs text-qt-charcoal/60">
                {m.transaction_id ? (
                  <span className="block max-w-[150px] truncate font-mono">
                    {m.transaction_id}
                  </span>
                ) : "—"}
              </span>


              <span className="text-xs text-qt-charcoal/60 whitespace-nowrap">
                {m.expires_at
                  ? new Date(m.expires_at).toLocaleDateString()
                  : "—"}
              </span>

            </div>


            {m.status === "pending" && (

              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  gap-2
                "
              >

                <Button
                  variant="accent"
                  onClick={() => onApprove(m)}
                >
                  Approve
                </Button>


                <Button
                  variant="danger"
                  onClick={() => onReject(m)}
                >
                  Reject
                </Button>

              </div>

            )}

          </div>

        ))}

      </div>


      <table
        className="
          hidden
          min-w-[800px]
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
              Phone
            </th>

            <th className="px-3 sm:px-4 py-3">
              Amount paid
            </th>

            <th className="px-3 sm:px-4 py-3">
              Transaction ID
            </th>

            <th className="px-3 sm:px-4 py-3">
              Status
            </th>

            <th className="px-3 sm:px-4 py-3">
              Expires
            </th>

            <th className="px-3 sm:px-4 py-3 text-right">
              Actions
            </th>

          </tr>

        </thead>



        <tbody className="divide-y divide-qt-line">

          {members.map((m) => (

            <tr
              key={m.id}
              className="hover:bg-qt-mist/50"
            >


              {/* Customer */}
              <td className="px-3 sm:px-4 py-3">

                <p
                  className="
                    font-medium
                    text-qt-navy
                    break-words
                  "
                >
                  {m.name}
                </p>

                <p className="text-xs text-qt-charcoal/50">
                  {m.email || "—"}
                </p>

              </td>



              {/* Phone */}
              <td
                className="
                  px-3
                  sm:px-4
                  py-3
                  text-qt-charcoal/70
                  whitespace-nowrap
                "
              >
                {m.phone}
              </td>




              {/* Amount */}
              <td
                className="
                  px-3
                  sm:px-4
                  py-3
                  whitespace-nowrap
                "
              >
                ৳{m.amount_paid}
              </td>




              {/* Transaction ID */}
              <td className="px-3 sm:px-4 py-3">

                <span
                  className="
                    inline-block
                    max-w-[150px]
                    truncate
                    font-mono
                    text-xs
                    text-qt-charcoal/70
                  "
                >
                  {m.transaction_id}
                </span>

              </td>




              {/* Status */}
              <td className="px-3 sm:px-4 py-3">

                <Badge color={statusColor[m.status]}>
                  {m.status}
                </Badge>

              </td>




              {/* Expire */}
              <td
                className="
                  px-3
                  sm:px-4
                  py-3
                  text-xs
                  text-qt-charcoal/60
                  whitespace-nowrap
                "
              >
                {m.expires_at
                  ? new Date(m.expires_at).toLocaleDateString()
                  : "—"}
              </td>




              {/* Actions */}
              <td className="px-3 sm:px-4 py-3 text-right">

                {m.status === "pending" && (

                  <div
                    className="
                      flex
                      justify-end
                      flex-wrap
                      gap-2
                    "
                  >

                    <Button
                      variant="accent"
                      onClick={() => onApprove(m)}
                    >
                      Approve
                    </Button>


                    <Button
                      variant="danger"
                      onClick={() => onReject(m)}
                    >
                      Reject
                    </Button>


                  </div>

                )}

              </td>


            </tr>

          ))}

        </tbody>


      </table>


    </div>
  );
}