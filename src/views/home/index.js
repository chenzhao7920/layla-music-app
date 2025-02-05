import React, { useState, useEffect } from "react";
import { TablePagination, Button, CircularProgress } from "@mui/material";
import { searchReleases } from "../../api/discogs/discogsApi";
import { genreOptions, countryOptions } from "../../utils/constant";
import crossImg from "../../statics/images/cross.svg";
import { useQuery } from "@tanstack/react-query";
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
} from "../../utils/favorite";
import SelectField from "./components/selectField";
import HomeAlbumCard from "./components/homeAlbumCard";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(() => Number(searchParams.get("page")) || 1);
  const [year, setYear] = useState(() => searchParams.get("year") || "2024");
  const [country, setCountry] = useState(
    () => searchParams.get("country") || "Canada"
  );
  const [genre, setGenre] = useState(() => searchParams.get("genre") || "");
  const [rowsPerPage, setRowsPerPage] = useState(
    () => Number(searchParams.get("rowsPerPage")) || 5
  );
  //filter drawer
  const [yearF, setYearF] = useState("");
  const [countryF, setCountryF] = useState("");
  const [genreF, setGenreF] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const yearOptions = React.useMemo(() => {
    const yearOptions = [];
    const startYear = 1900;
    const endYear = new Date().getFullYear();
    for (let year = endYear; year >= startYear; year--) {
      yearOptions.push({ value: `${year}`, label: `${year}` });
    }
    return yearOptions;
  }, []);

  // URL search querys
  useEffect(() => {
    if (searchTriggered) {
      const params = new URLSearchParams();
      if (year) params.set("year", year);
      if (country) params.set("country", country);
      if (genre) params.set("genre", genre);
      if (page !== 1) params.set("page", page.toString());
      if (rowsPerPage !== 5) params.set("rowsPerPage", rowsPerPage.toString());

      navigate(
        { pathname: location.pathname, search: params.toString() },
        { replace: true }
      );
    }
  }, [
    year,
    country,
    genre,
    page,
    rowsPerPage,
    location.pathname,
    navigate,
    searchTriggered,
  ]);

  // fetching Data use React query
  const { data, isLoading, error } = useQuery({
    queryKey: ["releases", country, year, genre, page, rowsPerPage],
    queryFn: () => searchReleases({ country, year, genre, page, rowsPerPage }),
    retry: 5,
  });

  const handleChangePage = (_, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  // tags generater
  const tag = (txt, onClose) => {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-400 rounded-full">
        <div className="font-medium text-white">{txt}</div>
        <img
          alt="cross"
          src={crossImg}
          className="w-4 cursor-pointer"
          onClick={onClose}
        ></img>
      </div>
    );
  };
  // handle filters state
  useEffect(() => {
    const initFilter = () => {
      setYearF(year);
      setCountryF(country);
      setGenreF(genre);
    };
    initFilter();
  }, [country, genre, year]);

  const cleanFilter = () => {
    setYear("");
    setCountry("");
    setGenre("");
  };
  const submitFilter = () => {
    setYear(yearF);
    setCountry(countryF);
    setGenre(genreF);
  };
  // handle favorites
  const [favorites, setFavorites] = useState(getFavorites());
  const toggleFavorite = (albumID) => {
    if (favorites.includes(+albumID)) {
      const updatedFavorites = removeFromFavorites(+albumID);
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = addToFavorites(+albumID);
      setFavorites(updatedFavorites);
    }
  };

  if (isLoading)
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-slate-100">
        <CircularProgress className="sm:w-16 sm:h-16 w-10 h-10" />
      </div>
    );
  if (error) return <></>;
  return (
    <div className="flex flex-col md:flex-row w-full gap-6 p-4 bg-gray-50 sm:flex-">
      {/* filters Section */}
      <div className="flex-shrink-0 w-full md:w-64">
        <div className="bg-white rounded-lg shadow sticky top-0">
          <div className="border-b border-gray-200 w-full p-4 ">
            <h2 className="text-lg text-gray-600">Refine your Search</h2>
          </div>
          <SelectField
            title="Genre"
            options={genreOptions}
            value={genre}
            onSelectionChange={(value) => {
              setGenreF(value);
              setSearchTriggered(true);
            }}
            searchPlaceholder="Search Category"
            defaultExpanded={false}
          />
          <SelectField
            title="Country"
            options={countryOptions}
            value={country}
            onSelectionChange={(value) => {
              setCountryF(value);
              setSearchTriggered(true);
            }}
            searchPlaceholder="Search Country"
          />
          <SelectField
            title="Year"
            options={yearOptions}
            value={year}
            onSelectionChange={(value) => {
              setYearF(value);
              setSearchTriggered(true);
            }}
            searchPlaceholder="Search Year"
          />
          <div className="border-b border-gray-200 p-4 flex flex-row justify-center ">
            <Button className="flex self-center" onClick={submitFilter}>
              Submit
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        {/* filters */}
        <div className="flex flex-wrap gap-4 py-4 max-sm:px-4">
          {!!genre &&
            tag(genre, () => {
              setGenre("");
            })}
          {!!country &&
            tag(country, () => {
              setCountry("");
            })}
          {!!year &&
            tag(year, () => {
              setYear("");
            })}
          <div
            className="flex items-center gap-2 px-4 py-2 font-medium text-gray-600 bg-gray-100 rounded-full cursor-pointer"
            onClick={() => {
              cleanFilter();
            }}
          >
            Clean all
          </div>
        </div>

        {/* pagination */}
        <div className="flex justify-end">
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={data ? data.pagination.items : "-"}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
        {/* list */}
        {!!data ? (
          <div className="flex flex-col gap-4 py-4">
            {data.results.map((item) => {
              return (
                <HomeAlbumCard
                  key={item.id}
                  album={item}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              );
            })}
          </div>
        ) : (
          //loading
          <div></div>
        )}
      </div>
    </div>
  );
}
