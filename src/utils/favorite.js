export const getFavorites = () => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export const addToFavorites = (album) => {
  const favorites = getFavorites();
  const updatedFavorites = [...favorites, album];
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  return updatedFavorites;
};

export const removeFromFavorites = (albumId) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((album) => album !== albumId);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  return updatedFavorites;
};
