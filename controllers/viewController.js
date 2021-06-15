exports.homepage = (req, res, next) => {
  res.status(200).render("home", {
    title: "Home Page",
    user: {
      firstName: "Riccardo",
      lastName: "Borgat",
      image: "Riccar",
    },
  });
};
