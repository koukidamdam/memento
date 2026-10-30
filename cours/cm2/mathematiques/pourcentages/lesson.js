const quiz = document.querySelector("#quiz");
const feedback = document.querySelector("#quiz-feedback");
const answers = {
  q1: "sur-100",
  q2: "25/100",
  q3: "moitie",
  q4: "9",
  q5: "15",
  q6: "19",
  q7: "21",
  q8: "9",
  q9: "20",
  q10: "40",
  q11: "100/100",
  q12: "63"
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
    ? "Bravo, tout est juste ! Tu sais comprendre et calculer les pourcentages."
    : `${score} / ${Object.keys(answers).length} bonnes réponses. Relis la leçon et réessaie !`;
});
