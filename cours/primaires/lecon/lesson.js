const primaryCourseData = [
  ...window.primaryMathLessons,
  ...window.primaryFrenchLessons,
  ...window.primaryHistoryLessons,
  ...window.secondaryCourseLessons
];
const primaryPracticeQuestions = window.primaryPracticeQuestions;
const secondaryRevisionQuestions = window.secondaryRevisionQuestions;
const primaryLevelNames = {
  cp: "CP",
  ce1: "CE1",
  ce2: "CE2",
  cm1: "CM1",
  ...window.secondaryLevelNames
};
const courseParameters = new URLSearchParams(window.location.search);
const selectedLevel = courseParameters.get("classe");
const selectedLesson = primaryCourseData.find((lesson) => lesson.id === courseParameters.get("notion"));
const selectedContent = selectedLesson?.levels[selectedLevel];
const lessonPage = document.querySelector("#lesson-page");

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

if (!selectedContent || !primaryLevelNames[selectedLevel]) {
  lessonPage.innerHTML = `
    <section class="lesson-hero">
      <div>
        <p class="eyebrow"><span class="eyebrow-dot"></span> Leçon indisponible</p>
        <h1>Ce cours est introuvable.</h1>
        <p class="lesson-intro">Le lien ne correspond à aucune leçon de ce parcours.</p>
        <a class="button button-primary" href="../../../index.html#cours">Revenir aux cours</a>
      </div>
    </section>`;
  throw new Error(`Unknown primary lesson: ${selectedLevel}/${courseParameters.get("notion")}`);
}

const subjectName = {
  francais: "Français",
  mathematiques: "Mathématiques",
  histoire: "Histoire"
}[selectedLesson.subject];
const title = escapeHtml(selectedContent.title);
const summary = escapeHtml(selectedContent.summary);
const explanation = escapeHtml(selectedContent.explanation);
const example = escapeHtml(selectedContent.example);
const subjectPractice = primaryPracticeQuestions[selectedLevel]?.[selectedLesson.subject]
  ?? secondaryRevisionQuestions[selectedLevel]?.[selectedLesson.subject];
if (!subjectPractice || subjectPractice.length !== 5) {
  throw new Error(`Missing revision questions: ${selectedLevel}/${selectedLesson.subject}`);
}
const questions = [
  selectedContent,
  ...subjectPractice
];
const quizMarkup = questions.map((item, index) => {
  const questionName = `q${index + 1}`;
  const options = item.options.map((option, optionIndex) => `
    <label class="answer-option"><input type="radio" name="${questionName}" value="${optionIndex}"> ${escapeHtml(option)}</label>`
  ).join("");

  return `<fieldset class="question"><legend><span>${index + 1}</span> ${escapeHtml(item.question)}</legend>${options}</fieldset>`;
}).join("");
const methodBySubject = {
  mathematiques: `Lis ce qu’on cherche, puis repère les nombres, les unités ou les figures utiles. Choisis une stratégie et montre les étapes de ton raisonnement. Pour vérifier, estime le résultat ou utilise une opération inverse quand c’est possible.`,
  francais: `Lis la phrase entière avant de choisir une réponse. Repère les mots importants, demande-toi quel rôle ils jouent et vérifie que ta réponse respecte le sens de la phrase. Relis-la une dernière fois pour contrôler les accords et la ponctuation.`,
  histoire: `Replace chaque événement dans le temps : cherche les dates, les lieux et les personnes. Compare les événements du plus ancien au plus récent, puis raconte avec tes mots ce qui s’est passé et pourquoi c’est important.`
};
const gradeGuidance = {
  cp: "Tu peux dire la réponse à voix haute, montrer les éléments ou dessiner pour t’aider.",
  ce1: "Tu peux faire un dessin ou utiliser un exemple concret avant de répondre.",
  ce2: "Explique en une phrase comment tu as trouvé ta réponse.",
  cm1: "Justifie ton choix à l’aide d’une règle, d’un calcul ou d’un indice du récit."
};

document.title = `${selectedContent.title} — ${primaryLevelNames[selectedLevel]} · Mémento`;
document.querySelector('meta[name="description"]').content = summary;
window.lessonAnswers = Object.fromEntries(
  questions.map((item, index) => [`q${index + 1}`, String(item.answer)])
);

lessonPage.innerHTML = `
  <nav class="breadcrumbs" aria-label="Fil d’Ariane">
    <a href="../../../index.html">Accueil</a><span>/</span>
    <a href="../../../index.html#cours">${primaryLevelNames[selectedLevel]}</a><span>/</span>
    <span>${subjectName}</span>
  </nav>
  <section class="lesson-hero">
    <div>
      <p class="eyebrow"><span class="eyebrow-dot"></span> ${primaryLevelNames[selectedLevel]} · ${subjectName}</p>
      <h1>${title}</h1>
      <p class="lesson-intro">${summary}</p>
      <div class="lesson-tags"><span>Adapté au ${primaryLevelNames[selectedLevel]}</span><span>10 min</span><span>6 questions</span></div>
    </div>
    <div class="number-art">
      <span class="number-art-label">THÈME DU PARCOURS CM2</span>
      <p><strong>${escapeHtml(selectedLesson.sourceTitle)}</strong></p>
      <p>Une notion à la fois.</p>
    </div>
  </section>
  <div class="lesson-layout">
    <aside class="lesson-sidebar" aria-label="Dans cette leçon">
      <p class="sidebar-title">DANS CETTE LEÇON</p>
      <a href="#notion" class="sidebar-link active">La notion</a>
      <a href="#exemple" class="sidebar-link">Un exemple guidé</a>
      <a href="#methode" class="sidebar-link">La méthode</a>
      <a href="#entrainement" class="sidebar-link">Je m’entraîne</a>
      <a href="#exercices" class="sidebar-link">À toi de jouer</a>
    </aside>
    <article class="lesson-content">
      <section class="lesson-section" id="notion">
        <p class="section-number">01 <span>AU PROGRAMME DE TON NIVEAU</span></p>
        <h2>${title}</h2>
        <p>${explanation}</p>
      </section>
      <section class="lesson-section" id="exemple">
        <p class="section-number">02 <span>ON OBSERVE</span></p>
        <h2>Un exemple pour comprendre</h2>
        <div class="example-card"><span class="example-label">À RETENIR</span><strong>${example}</strong></div>
      </section>
      <section class="lesson-section" id="methode">
        <p class="section-number">03 <span>LA MÉTHODE</span></p>
        <h2>Comment réussir l’exercice ?</h2>
        <p>${methodBySubject[selectedLesson.subject]}</p>
        <div class="property-list">
          <div class="property-card"><span class="example-label">ÉTAPE 1</span><strong>Je repère la notion</strong><p>Le titre de la leçon indique ce que je dois observer : ${title.toLowerCase()}.</p></div>
          <div class="property-card"><span class="example-label">ÉTAPE 2</span><strong>Je vérifie mon raisonnement</strong><p>${gradeGuidance[selectedLevel]}</p></div>
        </div>
      </section>
      <section class="lesson-section" id="entrainement">
        <p class="section-number">04 <span>JE M’ENTRAÎNE</span></p>
        <h2>Je réutilise la notion</h2>
        <p>Relis l’exemple, puis essaie d’expliquer la règle sans regarder le cours. Change un élément de l’exemple et demande-toi si la réponse reste correcte. Cette petite vérification t’aide à comprendre la notion plutôt qu’à retenir une réponse par cœur.</p>
        <div class="example-card"><span class="example-label">MON RAPPEL</span><strong>${title}</strong><p>${explanation}</p></div>
      </section>
      <section class="lesson-section exercises" id="exercices">
        <p class="section-number">05 <span>À TOI DE JOUER</span></p>
        <h2>Vérifie ce que tu as compris</h2>
        <p>Réponds aux six questions : la première porte sur cette leçon, les cinq suivantes te font aussi réviser les notions importantes de ${subjectName.toLowerCase()} en ${primaryLevelNames[selectedLevel]}.</p>
        <form id="quiz">
          ${quizMarkup}
          <button class="button button-primary check-button" type="submit">Vérifier mes réponses →</button>
          <p class="quiz-feedback" id="quiz-feedback" role="status" aria-live="polite"></p>
        </form>
      </section>
    </article>
  </div>
  <nav class="next-course" aria-label="Navigation des cours">
    <a href="../../../index.html#cours">← Tous les cours</a>
    <span>${primaryLevelNames[selectedLevel]} · ${subjectName}</span>
  </nav>`;
