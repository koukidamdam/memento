const quiz = document.querySelector("#quiz");
const feedback = document.querySelector("#quiz-feedback");
const answers = {
  q1: "egaux",
  q2: "90",
  q3: "paralleles",
  q4: "ABAC",
  q5: "4",
  q6: "abscisse",
  q7: "3",
  q8: "monter2",
  q9: "non",
  q10: "colonne",
  q11: "non",
  q12: "carre"
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
    ? "Bravo, tout est juste ! Tu maîtrises le codage et le repérage."
    : `${score} / ${Object.keys(answers).length} bonnes réponses. Relis les réponses et réessaie !`;
});
