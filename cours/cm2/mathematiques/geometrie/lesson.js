const quiz = document.querySelector("#quiz");
const feedback = document.querySelector("#quiz-feedback");
const answers = {
  q1: "majuscule",
  q2: "(AB)",
  q3: "2",
  q4: "A",
  q5: "jamais",
  q6: "90",
  q7: "O",
  q8: "aigu",
  q9: "obtus",
  q10: "180",
  q11: "rapporteur",
  q12: "equerre"
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
    ? "Bravo, tout est juste ! Tu maîtrises les points, les droites et les angles."
    : `${score} / ${Object.keys(answers).length} bonnes réponses. Relis les réponses et réessaie !`;
});
