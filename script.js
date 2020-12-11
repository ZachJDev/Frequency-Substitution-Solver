const inputArea = document.getElementById("inputText");
const outputArea = document.getElementById("outputText");
const freqChart = document.getElementById("freqChart");
const genBtn = document.getElementById("genButton")

outputArea.addEventListener('keydown', (e) => {
  e.preventDefault()
})

genBtn.addEventListener("click", (e) => {
  const freqBody = document.getElementById("tableBody");
  const Decipher = new DecipherTool(inputArea.value);
  outputArea.value = Decipher.displayText;

  // Remove old table info
  freqChart.removeChild(freqBody);
  // Add new table body with same id. appendChild returns the new node
  const newTableBody = freqChart.insertAdjacentElement(
    "beforeend",
    document.createElement("tbody")
  );

  newTableBody.id = "tableBody";
  const addToTable = buildTable("tableBody");
  Decipher.frequencies.forEach(({ letter, freq }, idx) => {
    // Put the new table rows in the DOM
    const newLetterInput = document.createElement("input");
    newLetterInput.type = "text";
    newLetterInput.maxLength = "1";

    addToTable(
      `${letter}`,
      `${((freq / Decipher.length) * 100).toFixed(2)}%`,
      newLetterInput
    );

    // Set up event handler for each cipher letter
    let originalLetter = letter.toLowerCase();

    newLetterInput.addEventListener("input", (e) => {
      let replacement = e.target.value.toLowerCase();
      if(Decipher.isAlpha(replacement)) Decipher.updateLetter(originalLetter, replacement);
      else if(replacement === "")  Decipher.revertLetter(originalLetter);
      else e.target.value = ''
    
      outputArea.value = Decipher.displayText;


    });
  });
});
