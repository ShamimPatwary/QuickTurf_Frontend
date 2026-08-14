import React from "react";
import Button from "../common/Button";
import Badge from "../common/Badge";

export function PackageList({ packages, onSelectPackage }) {
  if (!packages || packages.length === 0) return null;

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        gap-3
        sm:gap-4
      "
    >
      {packages.map((pkg) => (
        <div
          key={pkg.id}
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

          <h4
            className="
              font-display
              text-sm
              sm:text-base
              font-semibold
              text-qt-navy
            "
          >
            {pkg.name}
          </h4>


          {pkg.description && (
            <p
              className="
                mt-1
                text-xs
                sm:text-sm
                leading-relaxed
                text-qt-charcoal/60
              "
            >
              {pkg.description}
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
            {pkg.sports?.map((s) => (
              <Badge key={s.id} color="navy">
                {s.name}
              </Badge>
            ))}
          </div>


          <p
            className="
              mt-3
              font-display
              text-base
              sm:text-lg
              font-bold
              text-qt-green
            "
          >
            ৳{pkg.price}
          </p>

          {onSelectPackage && (
            <Button
              variant="primary"
              className="mt-3"
              fullWidth
              onClick={() => onSelectPackage(pkg)}
            >
              Buy this package
            </Button>
          )}

        </div>
      ))}
    </div>
  );
}



export function MembershipList({
  memberships,
  onSelectMembership
}) {
  if (!memberships || memberships.length === 0) return null;

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        gap-3
        sm:gap-4
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

          <h4
            className="
              font-display
              text-sm
              sm:text-base
              font-semibold
              text-qt-navy
            "
          >
            {m.name}
          </h4>



          {m.description && (
            <p
              className="
                mt-1
                text-xs
                sm:text-sm
                leading-relaxed
                text-qt-charcoal/60
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
              <Badge key={s.id} color="navy">
                {s.name}
              </Badge>
            ))}


            {m.discount_percentage > 0 && (
              <Badge color="green">
                {m.discount_percentage}% off every booking
              </Badge>
            )}

          </div>




          <p
            className="
              mt-2
              text-xs
              text-qt-charcoal/50
            "
          >
            Valid for {m.duration_days} days
          </p>



          <p
            className="
              mt-1
              font-display
              text-base
              sm:text-lg
              font-bold
              text-qt-green
            "
          >
            ৳{m.price}
          </p>



          <Button
            variant="primary"
            className="mt-3"
            fullWidth
            onClick={() => onSelectMembership(m)}
          >
            Buy this membership
          </Button>


        </div>

      ))}

    </div>
  );
}
