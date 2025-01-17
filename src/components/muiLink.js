// BookmarkButton.tsx
import React, { useState, useRef } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Popper, Paper } from "@mui/material";
import { Link } from "react-router-dom";
const MuiLink = React.memo(({ path, ...rest }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const handleMouseEnter = () => {
    setOpen(true);
  };
  const handleMouseLeave = () => {
    setOpen(false);
  };
  return (
    <>
      <Link
        ref={buttonRef}
        to={path}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <VisibilityIcon
          fontSize="large"
          color="primary"
          sx={{
            color: "primary",
            "&:hover": {
              color: "primary",
              transform: "scale(1.1)",
              transition: "transform 0.2s",
            },
          }}
        />
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
            view more
          </Paper>
        </Popper>
      </Link>
    </>
  );
});

export default MuiLink;
