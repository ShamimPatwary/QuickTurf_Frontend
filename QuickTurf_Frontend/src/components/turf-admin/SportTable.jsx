import React, { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import EmptyState from "../common/EmptyState";

export default function SportTable({
  sports,
  onCreate,
  onDelete,
  creating
}) {

  const [name, setName] = useState("");



  const handleAdd = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    onCreate(name.trim());
    setName("");
  };



  return (
    <div className="flex flex-col gap-4">


      {/* Add Sport Form */}
      <form
        onSubmit={handleAdd}
        className="
          flex
          flex-col
          gap-3
          sm:flex-row
        "
      >

        <div className="flex-1">

          <Input
            name="sport_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. football, cricket"
          />

        </div>


        <Button
          type="submit"
          variant="accent"
          disabled={creating}
          className="
            w-full
            sm:w-auto
          "
        >
          Add sport
        </Button>


      </form>





      {sports.length === 0 ? (

        <EmptyState
          title="No sports yet"
          description="Add a sport to start configuring time slots and pricing."
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

            {sports.map((sport) => (

              <div
                key={sport.id}
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  p-4
                "
              >

                <p
                  className="
                    capitalize
                    font-medium
                    text-qt-navy
                    break-words
                  "
                >
                  {sport.name}
                </p>


                <div className="flex-shrink-0">

                  <Button
                    variant="ghost"
                    onClick={() => onDelete(sport.id)}
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
              min-w-[450px]
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
                  Sport
                </th>


                <th className="px-3 sm:px-4 py-3 text-right">
                  Actions
                </th>

              </tr>

            </thead>



            <tbody className="divide-y divide-qt-line">

              {sports.map((sport) => (

                <tr
                  key={sport.id}
                  className="hover:bg-qt-mist/50"
                >

                  <td
                    className="
                      px-3
                      sm:px-4
                      py-3
                      capitalize
                      font-medium
                      text-qt-navy
                    "
                  >
                    {sport.name}
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
                      onClick={() => onDelete(sport.id)}
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