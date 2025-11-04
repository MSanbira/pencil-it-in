const defaultOptions = {
  isColored: false,
  hue: 45,
  size: "large",
};

document.addEventListener("DOMContentLoaded", async () => {
  const isColoredInput = document.getElementById("isColored");
  const hueInput = document.getElementById("hue");
  const sizeInputs = document.querySelectorAll('input[name="size"]');

  const changeHueAccentColor = (hue) => {
    const accentColor = `hsl(${hue}, 80%, 50%)`;
    document.body.style.setProperty("--accent-color", accentColor);
  };

  const savedOptions = await chrome.storage.sync.get(defaultOptions);
  changeHueAccentColor(savedOptions.hue);

  isColoredInput.checked = savedOptions.isColored;
  hueInput.value = savedOptions.hue;
  hueInput.disabled = !savedOptions.isColored;
  sizeInputs.forEach((input) => {
    if (input.value === savedOptions.size) {
      input.checked = true;
    }
  });

  isColoredInput.addEventListener("change", async () => {
    hueInput.disabled = !isColoredInput.checked;
    await chrome.storage.sync.set({ isColored: isColoredInput.checked });
  });

  hueInput.addEventListener("input", async () => {
    changeHueAccentColor(hueInput.value);
  });

  hueInput.addEventListener("change", async () => {
    await chrome.storage.sync.set({ hue: parseInt(hueInput.value) });
  });

  sizeInputs.forEach((input) => {
    input.addEventListener("change", async () => {
      if (input.checked) {
        await chrome.storage.sync.set({ size: input.value });
      }
    });
  });  
});
