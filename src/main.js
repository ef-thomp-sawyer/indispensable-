const INDIEPEN_URI = 'https://indiepen.tech/embed';
const generatorForm = document.getElementById('js-generator-form');
const generatedResultTextarea = document.querySelector('.js-generated-result');
const codeExampleInput = document.querySelector('.js-code-example-url');
const generateButton = document.getElementById('js-generate-button');
const copyButton = document.getElementById('js-copy-button');
const resetButton = document.getElementById('js-reset-button');

generatorForm.addEventListener('submit', (event) => {
  const codeExampleUrl = generatorForm.elements[0].value;
  const encodedURL = encodeURIComponent(codeExampleUrl);

  const preSelectedTab = generatorForm.elements[1].value;
  const tabQueryParameter = preSelectedTab && `&tab=${preSelectedTab}`;

  const indiepenTemplate = `<iframe class="indiepen" src="${INDIEPEN_URI}/?url=${encodedURL}${tabQueryParameter}" style="width: 100%; overflow: hidden; display: block; border: 0;" title="Indiepen Embed" loading="lazy" width="100%" height="450"></iframe>`;

  generatorForm.reset();
  generatedResultTextarea.value += indiepenTemplate;

  generatedResultTextarea.disabled = false;
  generatedResultTextarea.focus();

  resetButton.addEventListener('click', handleResetButton);
  copyButton.addEventListener('click', handleCopyButton);

  copyButton.disabled = false;
  resetButton.disabled = false;

  event.preventDefault();
});

function handleResetButton() {
  copyButton.disabled = true;
  resetButton.disabled = true;
  resetButton.blur();

  generatedResultTextarea.disabled = true;
  generatorForm.reset();
}

async function handleCopyButton() {
  if (!generatedResultTextarea.value) {
    return;
  }
  try {
    const generatedResult = generatedResultTextarea.value;
    await navigator.clipboard.writeText(generatedResult);
  } catch (error) {
    console.error(
      `Whoops, I could not copy your code example ¯\_(ツ)_/¯: `,
      error
    );
  }
}
