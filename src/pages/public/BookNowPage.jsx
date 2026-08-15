import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import TurfCard from "../../components/public/TurfCard";
import { browseTurfs } from "../../api/publicApi";
import DarkNavbar from "../../components/common/DarkNavbar";
import DarkFooter from "../../components/common/DarkFooter";

const SPORTS = ["football", "cricket"];

export default function BookNowPage() {
  const [sport, setSport] = useState("football");
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchType, setSearchType] = useState("name");
  const [search, setSearch] = useState("");


  useEffect(() => {
    if (!sport) return;

    setLoading(true);

    browseTurfs(sport)
      .then((res) => {
        const shuffledTurfs = [...res.data].sort(
          () => Math.random() - 0.5
        );

        setTurfs(shuffledTurfs);
      })
      .finally(() => setLoading(false));

  }, [sport]);



  // Search filter
  const filteredTurfs = turfs.filter((turf) => {

    const value = search.toLowerCase();

    if (!value) return true;


    if (searchType === "name") {
      return turf.name
        ?.toLowerCase()
        .includes(value);
    }


    if (searchType === "address") {
      return turf.address
        ?.toLowerCase()
        .includes(value);
    }


    return true;

  });



  return (
    <div className="flex min-h-screen flex-col">


      {/*<Navbar />*/}
      <DarkNavbar/>


      <main
        className="
          flex-1
          mx-auto
          w-full
          max-w-6xl
          px-4
          sm:px-6
          lg:px-8
          py-8
          sm:py-12
        "
      >


        {/* Heading */}
        <h1
          className="
            mt-20
            font-display
            text-2xl
            sm:text-3xl
            font-bold
            text-qt-navy
          "
        >
          Book Now
        </h1>


        <p className="mt-5 text-sm sm:text-base text-qt-charcoal/60">
          Choose a sport to find available turfs.
        </p>



        {/* Sport Selector */}
        <div
          className="
            mt-6
            flex
            flex-wrap
            gap-3
          "
        >

          {SPORTS.map((s) => (

            <button
              key={s}

              onClick={() => {
                setSport(s);
                setSearch("");
              }}

              className={`
                rounded-full
                px-5
                py-2.5
                sm:px-6
                sm:py-3
                text-sm
                font-semibold
                capitalize
                transition-colors

                ${
                  sport === s
                    ? "bg-qt-green text-white"
                    : "bg-qt-mist text-qt-charcoal hover:bg-qt-line"
                }
              `}
            >
              {s}
            </button>

          ))}

        </div>




        {/* Search Section */}
        <div
          className="
            mt-6
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
          "
        >


          {/* Search Type */}
          <select
            value={searchType}

            onChange={(e) => {
              setSearchType(e.target.value);
              setSearch("");
            }}

            className="
              w-full
              sm:w-52
              rounded-xl
              border
              border-qt-line
              bg-white
              px-4
              py-3
              text-sm
              outline-none
              focus:border-qt-green
            "
          >

            <option value="name">
              Search by Turf Name
            </option>

            <option value="address">
              Search by Address
            </option>

          </select>





          {/* Search Input */}
          <input
            type="text"

            placeholder={
              searchType === "name"
                ? "Enter turf name..."
                : "Enter address..."
            }

            value={search}

            onChange={(e) => setSearch(e.target.value)}

            className="
              w-full
              sm:flex-1
              rounded-xl
              border
              border-qt-line
              bg-white
              px-4
              py-3
              text-sm
              outline-none
              focus:border-qt-green
              focus:ring-2
              focus:ring-qt-green/20
            "
          />


        </div>





        {/* Turf Results */}
        <div className="mt-10">


          {sport && loading && (
            <Loader label="Finding turfs..." />
          )}





          {sport &&
            !loading &&
            filteredTurfs.length === 0 && (

            <EmptyState
              title="No turfs found"

              description={
                search
                  ? "No turf matches your search."
                  : `No turfs currently offer ${sport}.`
              }
            />

          )}







          {sport &&
            !loading &&
            filteredTurfs.length > 0 && (

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-5
              "
            >

              {filteredTurfs.map((turf) => (

                <TurfCard
                  key={turf.id}
                  turf={turf}
                />

              ))}


            </div>

          )}



        </div>


      </main>


      {/*<Footer />*/}
      <DarkFooter/>


    </div>
  );
}