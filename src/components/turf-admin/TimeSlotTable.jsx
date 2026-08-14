import React, { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import EmptyState from "../common/EmptyState";

export default function TimeSlotTable({
  slots,
  onCreate,
  onDelete,
  onToggleActive,
  creating
}) {

  const [form, setForm] = useState({
    start_time: "",
    end_time: "",
    price: ""
  });



  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });



  const handleAdd = (e) => {
    e.preventDefault();

    if (!form.start_time || !form.end_time || !form.price)
      return;


    onCreate({
      start_time: `${form.start_time}:00`,
      end_time: `${form.end_time}:00`,
      price: parseFloat(form.price)
    });


    setForm({
      start_time: "",
      end_time: "",
      price: ""
    });
  };



  const formatTime = (time) => {
    if (!time) return "";

    const [hour, minute] = time.split(":");
    const h = Number(hour);

    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;

    return `${hour12}:${minute} ${period}`;
  };



  return (
    <div className="flex flex-col gap-4">



      {/* Add Time Slot Form */}
      <form
        onSubmit={handleAdd}
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-3
        "
      >

        <Input
          label="Start time"
          name="start_time"
          type="time"
          value={form.start_time}
          onChange={handleChange}
        />


        <Input
          label="End time"
          name="end_time"
          type="time"
          value={form.end_time}
          onChange={handleChange}
        />


        <Input
          label="Price (৳)"
          name="price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange}
        />



        <div className="flex items-end">

          <Button
            type="submit"
            variant="accent"
            fullWidth
            disabled={creating}
            className="w-full"
          >
            Add slot
          </Button>

        </div>


      </form>





      {slots.length === 0 ? (

        <EmptyState
          title="No time slots yet"
          description="Add a time slot to make it bookable by customers."
        />

      ) : (


<div
          className="
            w-full
            rounded-xl
            border
            border-qt-line
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

            {slots.map((slot) => (

              <div
                key={slot.id}
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

                  <p
                    className="
                      font-mono
                      text-qt-navy
                      whitespace-nowrap
                    "
                  >
                    {formatTime(slot.start_time)}
                    {" – "}
                    {formatTime(slot.end_time)}
                  </p>


                  <p className="whitespace-nowrap">
                    ৳{slot.price}
                  </p>

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

                  <button
                    onClick={() => onToggleActive(slot)}
                    className={`
                      rounded-full
                      px-2.5
                      py-1
                      text-xs
                      font-semibold
                      whitespace-nowrap

                      ${
                        slot.is_active
                          ? "bg-qt-green/10 text-qt-green-dark"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {slot.is_active
                      ? "Active"
                      : "Inactive"}
                  </button>


                  <Button
                    variant="ghost"
                    onClick={() => onDelete(slot.id)}
                  >
                    Delete
                  </Button>

                </div>

              </div>

            ))}

          </div>


          <table
            className="
              hidden
              min-w-[650px]
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
                  Time
                </th>


                <th className="px-3 sm:px-4 py-3">
                  Price
                </th>


                <th className="px-3 sm:px-4 py-3">
                  Active
                </th>


                <th className="px-3 sm:px-4 py-3 text-right">
                  Actions
                </th>

              </tr>

            </thead>



            <tbody className="divide-y divide-qt-line">

              {slots.map((slot) => (

                <tr
                  key={slot.id}
                  className="hover:bg-qt-mist/50"
                >


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
                    {formatTime(slot.start_time)}
                    {" – "}
                    {formatTime(slot.end_time)}
                  </td>




                  <td
                    className="
                      px-3
                      sm:px-4
                      py-3
                      whitespace-nowrap
                    "
                  >
                    ৳{slot.price}
                  </td>




                  <td className="px-3 sm:px-4 py-3">

                    <button
                      onClick={() => onToggleActive(slot)}
                      className={`
                        rounded-full
                        px-2.5
                        py-1
                        text-xs
                        font-semibold
                        whitespace-nowrap

                        ${
                          slot.is_active
                            ? "bg-qt-green/10 text-qt-green-dark"
                            : "bg-gray-100 text-gray-500"
                        }
                      `}
                    >
                      {slot.is_active
                        ? "Active"
                        : "Inactive"}
                    </button>

                  </td>




                  <td
                    className="
                      px-3
                      sm:px-4
                      py-3
                      text-right
                    "
                  >

                    <Button
                      variant="ghost"
                      onClick={() => onDelete(slot.id)}
                    >
                      Delete
                    </Button>


                  </td>



                </tr>

              ))}


            </tbody>


          </table>


        </div>


      )}


    </div>
  );
}