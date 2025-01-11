import React, { useState, useEffect } from "react";
import {
  TablePagination,
  Drawer,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { searchReleases } from "../api/discogsApi";
import { genreList } from "../utils/constant";
import noCoverImg from "../statics/images/no_cover_img.png";
import crossImg from "../statics/images/cross.svg";

export default function AlbumList() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [year, setYear] = useState("2024");
  const [country, setCountry] = useState("Canada");
  const [genre, setGenre] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //filter drawer
  const [open, setOpen] = useState(false);
  const [yearF, setYearF] = useState("");
  const [countryF, setCountryF] = useState("");
  const [genreF, setGenreF] = useState("");
  useEffect(() => {
    searchReleases({ country, year, genre, page, rowsPerPage }).then((res) =>
      setData(res)
    );
  }, [page, rowsPerPage, country, year, genre]);
  const handleChangePage = (_, newPage) => {
    setPage(newPage + 1);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  // filter
  const tag = (txt, onClose) => {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-500 rounded-full">
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
  const initFilter = () => {
    setYearF(year);
    setCountryF(country);
    setGenreF(genre);
  };
  const submitFilter = () => {
    setYear(yearF);
    setCountry(countryF);
    setGenre(genreF);
    setOpen(false);
  };
  return (
    <>
      {/* pagination */}
      <div className="flex justify-start">
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
          className="flex items-center gap-2 px-4 py-2 font-medium text-white bg-gray-500 rounded-full cursor-pointer"
          onClick={() => {
            initFilter();
            setOpen(true);
          }}
        >
          Filter +
        </div>
      </div>
      {/* list */}
      {!!data ? (
        <div className="flex flex-col gap-4 py-4">
          {data.results.map((item) => {
            return (
              <div
                key={item.id}
                className="flex w-full gap-8 p-10 overflow-hidden bg-white rounded-lg max-sm:flex-col drop-shadow-lg"
              >
                <img
                  alt="cover_img"
                  className="w-40 h-40 rounded-full animate-spin-slow max-sm:self-center"
                  src={!!item.cover_image ? item.cover_image : noCoverImg}
                ></img>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-[24px] max-sm:text-center">
                    {item.title}
                  </h3>
                  <div className="flex gap-2 max-sm:self-center">
                    <div className="flex flex-col overflow-hidden rounded-t-md">
                      <div className="flex items-center justify-center px-2 text-white bg-black">
                        Have
                      </div>
                      <div className="flex items-center justify-center px-2 border">
                        {item.community?.have}
                      </div>
                    </div>
                    <div className="flex flex-col overflow-hidden rounded-t-md">
                      <div className="flex items-center justify-center px-2 text-white bg-black">
                        Want
                      </div>
                      <div className="flex items-center justify-center px-2 border">
                        {item.community?.want}
                      </div>
                    </div>
                  </div>
                  <p>
                    <span className="font-medium">Format</span>:{" "}
                    {item.format?.join(", ")}
                  </p>
                  <p>
                    <span className="font-medium">Genre</span>:{" "}
                    {item.genre?.join(", ")}
                  </p>
                  <p>
                    <span className="font-medium">Country</span>: {item.country}
                  </p>
                  <p>
                    <span className="font-medium">Year</span>: {item.year}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        //loading
        <div></div>
      )}
      {/* filter drawer */}
      <Drawer
        open={open}
        onClose={() => {
          initFilter();
          setOpen(false);
        }}
      >
        <div className="flex flex-col gap-4 p-4 sm:p-10">
          <FormControl fullWidth>
            <InputLabel id="genre-select-label">Genre</InputLabel>
            <Select
              labelId="genre-select-label"
              id="genre-select"
              value={genreF}
              onChange={(event) => setGenreF(event.target.value)}
              label="Genre"
            >
              {genreList.map((genre, index) => (
                <MenuItem key={index} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Country"
            variant="outlined"
            value={countryF}
            onChange={(e) => setCountryF(e.target.value)}
          />
          <TextField
            label="Year"
            variant="outlined"
            value={yearF}
            onChange={(e) => setYearF(e.target.value)}
          />
          <Button className="self-center" onClick={submitFilter}>
            Submit
          </Button>
        </div>
      </Drawer>
    </>
  );
}
