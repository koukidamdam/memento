const quiz = document.querySelector("#quiz");
const feedback = document.querySelector("#quiz-feedback");
const answers = {
  q1: "<",
  q2: "5062",
  q3: ">",
  q4: ">",
  q5: "7,40",
  q6: ">",
  q7: "3,09",
  q8: "<",
  q9: "6,00",
  q10: "ordre-correct",
  q11: "5,70",
  q12: ">"
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
    ? "Bravo, tout est juste ! Tu sais comparer les nombres entiers et décimaux."
    : `${score} / ${Object.keys(answers).length} bonnes réponses. Relis la leçon et réessaie !`;
});
