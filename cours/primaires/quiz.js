const quiz = document.querySelector("#quiz");
const feedback = document.querySelector("#quiz-feedback");
const answers = window.lessonAnswers;
const questionCount = Object.keys(answers).length;

quiz.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(quiz);
  const unanswered = Object.keys(answers).filter((question) => !formData.get(question));

  if (unanswered.length > 0) {
    feedback.dataset.result = "incomplete";
    feedback.textContent = `Réponds aux ${questionCount} questions avant de vérifier.`;
    return;
  }

  const score = Object.entries(answers).reduce(
    (total, [question, answer]) => total + Number(formData.get(question) === answer),
    0
  );
  feedback.dataset.result = "complete";
  feedback.textContent = score === questionCount
    ? "Bravo, tout est juste !"
    : `${score} / ${questionCount} bonnes réponses. Relis le cours et réessaie !`;
});
