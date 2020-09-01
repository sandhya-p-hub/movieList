export const genres = [
  { _id: "5df5b7146645a4361c4520ca", name: "Action" },
  { _id: "5df5b7146645a4361c4520c6", name: "Comedy" },
  { _id: "5df5b7146645a4361c4520d2", name: "Thriller" },
  { _id: "5df5b7146645a4361c4520ce", name: "Romance" }
];

export function getGenres() {
  return genres.filter(g => g);
}
