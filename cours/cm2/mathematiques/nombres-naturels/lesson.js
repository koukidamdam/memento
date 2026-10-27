const quiz = document.querySelector("#quiz");
const feedback = document.querySelector("#quiz-feedback");
const answers = {
  q1: "3000",
  q2: "5000+300+6",
  q3: "<",
  q4: "4000",
  q5: "603042",
  q6: "908765>908756",
  q7: "70000+80",
  q8: "600000",
  q9: "209041",
  q10: "100000"
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
    ? "Bravo, tout est juste ! Tu connais bien les nombres naturels."
    : `${score} / ${Object.keys(answers).length} bonnes réponses. Relis les réponses et réessaie !`;
});
