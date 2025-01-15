// BookmarkButton.tsx
import React, { useState, useEffect, useRef } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
} from "../utils/favorite";
import { Popper, Paper } from "@mui/material";
const FavoriteButton = React.memo(({ id, type, ...rest }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const [favorites, setFavorites] = useState(getFavorites());
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);
  const toggleFavorite = () => {
    if (favorites.includes(+id)) {
      const updatedFavorites = removeFromFavorites(+id);
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = addToFavorites(+id);
      setFavorites(updatedFavorites);
    }
  };

  const handleMouseEnter = () => {
    setOpen(true);
  };
  const handleMouseLeave = () => {
    setOpen(false);
  };
  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleFavorite}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        {favorites.includes(+id) ? (
          <FavoriteIcon
            fontSize="large"
            sx={{
              color: "#FFD700",
              "&:hover": {
                color: "#FFD700",
                transform: "scale(1.1)",
                transition: "transform 0.2s",
              },
              ...rest,
            }}
          />
        ) : (
          <FavoriteIcon
            fontSize="large"
            sx={{
              color: "#999",
              // color: "#FFD700",
              "&:hover": {
                color: "#FFD700",
                transform: "scale(1.1)",
                transition: "transform 0.2s",
              },
              ...rest,
            }}
          />
        )}

        <Popper
          open={open}
          anchorEl={buttonRef.current}
          placement="right"
          sx={{ zIndex: 1000 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
              maxWidth: 200,
              ml: 1,
            }}
          >
            {favorites.includes(+id)
              ? "Remeve from Favorites"
              : "Add to Favorites"}
          </Paper>
        </Popper>
      </button>
    </>
  );
});

export default FavoriteButton;
