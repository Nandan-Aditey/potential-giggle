const fileUpload = document.getElementById("fileUpload");
const fileStatus = document.getElementById("fileStatus");

fileUpload.addEventListener("change", async () => {
  const file = fileUpload.files[0];
  if (!file) return;

  fileStatus.textContent = `Loading ${file.name}...`;

  if (file.type === "application/pdf") {
    const text = await extractPdfText(file);
    inputText.value = text;
    fileStatus.textContent = "PDF loaded successfully.";
  }

  else if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const text = await extractDocxText(file);
    inputText.value = text;
    fileStatus.textContent = "Word document loaded successfully.";
  }

  else {
    fileStatus.textContent = "Unsupported file type.";
  }
});


async function extractPdfText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    fullText += content.items.map(it => it.str).join(" ") + "\n";
  }
  return fullText;
}


async function extractDocxText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}
