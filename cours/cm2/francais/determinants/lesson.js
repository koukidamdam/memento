const quiz = document.querySelector("#quiz");
const feedback = document.querySelector("#quiz-feedback");
const answers = {
  q1: "defini",
  q2: "une",
  q3: "possessif",
  q4: "ce",
  q5: "article-defini",
  q6: "cet",
  q7: "possession",
  q8: "trois",
  q9: "indefini",
  q10: "interrogatif",
  q11: "mon",
  q12: "fleurs"
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
    ? "Bravo, tout est juste ! Tu sais reconnaître les principales familles de déterminants."
    : `${score} / ${Object.keys(answers).length} bonnes réponses. Relis la leçon et réessaie !`;
});
