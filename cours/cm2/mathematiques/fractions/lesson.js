const quiz = document.querySelector("#quiz");
const feedback = document.querySelector("#quiz-feedback");
const answers = {
  q1: "5",
  q2: "3",
  q3: "2/7",
  q4: "5/9",
  q5: "<",
  q6: "0.7",
  q7: "0.35",
  q8: "0.008",
  q9: "246/100",
  q10: "9/100"
};

quiz.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(quiz);
  const unanswered = Object.keys(answers).filter((question) => !formData.get(question));

  if (unanswered.length > 0) {
    feedback.dataset.result = "incomplete";
    feedback.textContent = "Réponds aux dix questions avant de vérifier.";
    return;
  }

  const score = Object.entries(answers).reduce(
    (total, [question, answer]) => total + Number(formData.get(question) === answer),
    0
  );
  feedback.dataset.result = "complete";
  feedback.textContent = score === Object.keys(answers).length
    ? "Bravo, tout est juste ! Tu maîtrises les fractions."
    : `${score} / ${Object.keys(answers).length} bonnes réponses. Relis les réponses et réessaie !`;
});
