const quiz = document.querySelector("#quiz");
const feedback = document.querySelector("#quiz-feedback");
const answers = {
  q1: "sujet",
  q2: "feminin-singulier",
  q3: "travaillent",
  q4: "elle-chante",
  q5: "ils",
  q6: "elles-sont",
  q7: "avons",
  q8: "jouent",
  q9: "oui",
  q10: "arrivee",
  q11: "partis",
  q12: "elles-arrivees"
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
    ? "Bravo, tout est juste ! Tu sais conjuguer selon le sujet et reconnaître les accords."
    : `${score} / ${Object.keys(answers).length} bonnes réponses. Relis la leçon et réessaie !`;
});
