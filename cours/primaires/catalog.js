(function addPrimaryCourseCards() {
  const schoolLevels = [
    ["cp", "CP"],
    ["ce1", "CE1"],
    ["ce2", "CE2"],
    ["cm1", "CM1"],
    ["6e", "6e"],
    ["5e", "5e"],
    ["4e", "4e"],
    ["3e", "3e"],
    ["2nde", "2nde"],
    ["premiere", "Première"],
    ["terminale", "Terminale"]
  ];
  const schoolLessons = [
    ...window.primaryMathLessons,
    ...window.primaryFrenchLessons,
    ...window.primaryHistoryLessons,
    ...window.secondaryCourseLessons
  ];
  const courseList = document.querySelector("#course-list");
  const emptyState = document.querySelector("#empty-state");

  for (const lesson of schoolLessons) {
    const applicableLevels = schoolLevels.filter(([year]) => lesson.levels[year]);
    for (const [year, levelName] of applicableLevels) {
      const levelLesson = lesson.levels[year];
      const card = document.createElement("a");
      card.className = "course-card";
      card.href = `./cours/primaires/lecon/index.html?classe=${year}&notion=${lesson.id}`;
      card.dataset.year = year;
      card.dataset.subject = lesson.subject;

      const top = document.createElement("div");
      top.className = "course-card-top";
      const icon = document.createElement("span");
      icon.className = "course-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = lesson.icon;
      const arrow = document.createElement("span");
      arrow.className = "course-arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "↗";
      top.append(icon, arrow);

      const details = document.createElement("div");
      const category = document.createElement("p");
      category.className = "course-category";
      const subjectName = {
        francais: "Français",
        mathematiques: "Mathématiques",
        histoire: "Histoire"
      }[lesson.subject];
      category.textContent = `${levelName} / ${subjectName}`;
      const title = document.createElement("h3");
      title.textContent = levelLesson.title;
      const description = document.createElement("p");
      description.className = "course-description";
      description.textContent = levelLesson.summary;
      details.append(category, title, description);

      const bottom = document.createElement("div");
      bottom.className = "course-card-bottom";
      const type = document.createElement("span");
      type.textContent = "Leçon adaptée + exercice";
      const time = document.createElement("span");
      time.className = "read-time";
      time.textContent = "5 min";
      bottom.append(type, time);

      card.append(top, details, bottom);
      courseList.insertBefore(card, emptyState);
    }
  }
}());
