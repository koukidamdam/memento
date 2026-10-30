function shuffle(items) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
  }

  return items;
}

document.querySelectorAll(".question").forEach((question) => {
  const choices = [...question.querySelectorAll(".answer-option")];
  shuffle(choices).forEach((choice) => question.append(choice));

  question.querySelectorAll("select").forEach((select) => {
    const placeholder = [...select.options].filter((option) => option.value === "");
    const answers = [...select.options].filter((option) => option.value !== "");
    select.replaceChildren(...placeholder, ...shuffle(answers));
  });
});
