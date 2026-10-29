const quiz = document.querySelector("#quiz");
const feedback = document.querySelector("#quiz-feedback");
const answers = {
  q1: "informer",
  q2: "interrogation",
  q3: "interrogative",
  q4: "imperative",
  q5: "exclamative",
  q6: "declarative",
  q7: "conseil",
  q8: "quand",
  q9: "interdiction",
  q10: "intention",
  q11: "faux",
  q12: "non"
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
    ? "Bravo, tout est juste ! Tu sais reconnaître les quatre types de phrases."
    : `${score} / ${Object.keys(answers).length} bonnes réponses. Relis les réponses et réessaie !`;
});
