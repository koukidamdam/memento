const quiz = document.querySelector("#quiz");
const feedback = document.querySelector("#quiz-feedback");
const answers = {
  q1: "une-pomme",
  q2: "qui-quoi",
  q3: "a-la-maitresse",
  q4: "nom-brosse",
  q5: "demain",
  q6: "dans-le-jardin",
  q7: "paisiblement",
  q8: "gateau",
  q9: "la-porte",
  q10: "ccl",
  q11: "deplacer",
  q12: "nom"
};

quiz.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(quiz);
  const unanswered = Object.keys(answers).filter((question) => !formData.get(question));

  if (unanswered.length > 0) {
    feedback.dataset.result = "incomplete";
    feedback.textContent = "Réponds aux douze questions avant de vérifier.";
    return;
  }

  const score = Object.entries(answers).reduce(
    (total, [question, answer]) => total + Number(formData.get(question) === answer),
    0
  );
  feedback.dataset.result = "complete";
  feedback.textContent = score === Object.keys(answers).length
    ? "Bravo, tout est juste ! Tu sais reconnaître les principaux compléments."
    : `${score} / ${Object.keys(answers).length} bonnes réponses. Relis la leçon et réessaie !`;
});
