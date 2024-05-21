document.addEventListener("scroll", function () {
  var sections = document.querySelectorAll(".section");
  var navbarLinks = document.querySelectorAll("#navbar a");

  sections.forEach(function (section) {
    var bounding = section.getBoundingClientRect();
    var currentSection = null;

    if (
      bounding.top >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    ) {
      currentSection = section.id;
    }

    navbarLinks.forEach(function (link) {
      link.classList.remove("active-link");
      if (link.getAttribute("href").substring(1) === currentSection) {
        link.classList.add("active-link");
      }
    });
  });
});
