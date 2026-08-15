import React, { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";

export default function MembershipTable({
  memberships,
  sports,
  onCreate,
  onDelete,
  creating
}) {

  const [form, setForm] = useState({
    name: "",
    description: "",
    duration_days: "",
    price: "",
    discount_percentage: "",
    sport_ids: [],
  });


  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });



  const toggleSport = (sportId) => {
    setForm((prev) => ({
      ...prev,
      sport_ids: prev.sport_ids.includes(sportId)
        ? prev.sport_ids.filter((id) => id !== sportId)
        : [...prev.sport_ids, sportId],
    }));
  };



  const handleAdd = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.duration_days ||
      !form.price ||
      form.sport_ids.length === 0
    ) return;


    onCreate({
      name: form.name,
      description: form.description,
      duration_days: parseInt(form.duration_days, 10),
      price: parseFloat(form.price),
      discount_percentage: form.discount_percentage
        ? parseFloat(form.discount_percentage)
        : 0,
      sport_ids: form.sport_ids,
    });


    setForm({
      name: "",
      description: "",
      duration_days: "",
      price: "",
      discount_percentage: "",
      sport_ids: []
    });
  };



  return (
    <div
      className="
        flex
        flex-col
        gap-4
      "
    >


      {/* Create Membership Form */}
      <form
        onSubmit={handleAdd}
        className="
          flex
          flex-col
          gap-3
          rounded-xl
          border
          border-qt-line
          bg-white
          p-3
          sm:p-4
        "
      >

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-3
          "
        >

          <Input
            name="name"
            placeholder="Membership name"
            value={form.name}
            onChange={handleChange}
          />


          <Input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />


          <Input
            name="duration_days"
            type="number"
            placeholder="Duration (days)"
            value={form.duration_days}
            onChange={handleChange}
          />


          <Input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price (৳)"
            value={form.price}
            onChange={handleChange}
          />


          <Input
            name="discount_percentage"
            type="number"
            step="0.01"
            min="0"
            max="100"
            placeholder="Discount on bookings (%)"
            value={form.discount_percentage}
            onChange={handleChange}
          />

        </div>




        <div>

          <p
            className="
              mb-1.5
              text-xs
              sm:text-sm
              font-medium
              text-qt-charcoal
            "
          >
            Applies to sport(s)
          </p>


          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >

            {sports.map((sport) => {

              const active =
                form.sport_ids.includes(sport.id);


              return (
                <button
                  key={sport.id}
                  type="button"
                  onClick={() => toggleSport(sport.id)}
                  className={`
                    rounded-full
                    px-3
                    sm:px-3.5
                    py-1.5
                    text-xs
                    sm:text-sm
                    font-medium
                    capitalize
                    whitespace-nowrap
                    transition-colors

                    ${
                      active
                        ? "bg-qt-green text-white"
                        : "bg-qt-mist text-qt-charcoal hover:bg-qt-line"
                    }
                  `}
                >
                  {sport.name}
                </button>
              );

            })}

          </div>



          {sports.length === 0 && (
            <p className="mt-1 text-xs text-qt-charcoal/50">
              Add a sport first before creating memberships.
            </p>
          )}

        </div>



        <Button
          type="submit"
          variant="accent"
          disabled={creating || sports.length === 0}
          className="w-full sm:w-auto"
        >
          Add membership
        </Button>


      </form>




      {/* Membership Cards */}
      {memberships.length === 0 ? (

        <EmptyState
          title="No memberships yet"
          description="Offer recurring memberships to regular customers."
        />

      ) : (

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-3
          "
        >

          {memberships.map((m) => (

            <div
              key={m.id}
              className="
                rounded-xl
                border
                border-qt-line
                bg-white
                p-3
                sm:p-4
                shadow-card
              "
            >

              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-2
                "
              >

                <h4
                  className="
                    font-display
                    font-semibold
                    text-qt-navy
                    break-words
                  "
                >
                  {m.name}
                </h4>


                <Button
                  variant="ghost"
                  onClick={() => onDelete(m.id)}
                >
                  Delete
                </Button>

              </div>



              {m.description && (
                <p
                  className="
                    mt-1
                    text-sm
                    text-qt-charcoal/60
                    break-words
                  "
                >
                  {m.description}
                </p>
              )}




              <div
                className="
                  mt-2
                  flex
                  flex-wrap
                  gap-1.5
                "
              >

                {m.sports?.map((s) => (

                  <Badge
                    key={s.id}
                    color="navy"
                  >
                    {s.name}
                  </Badge>

                ))}



                {m.discount_percentage > 0 && (
                  <Badge color="green">
                    {m.discount_percentage}% off bookings
                  </Badge>
                )}

              </div>




              <p className="mt-2 text-xs text-qt-charcoal/50">
                {m.duration_days} days
              </p>


              <p className="
                mt-1
                font-display
                text-lg
                font-bold
                text-qt-green
              ">
                ৳{m.price}
              </p>


            </div>

          ))}

        </div>

      )}


    </div>
  );
}