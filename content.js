const pencil = document.createElement("div");
pencil.classList.add("PENI-pencil");
document.body.appendChild(pencil);

const inputCopy = document.createElement("div");
inputCopy.classList.add("PENI-input-copy");
document.body.appendChild(inputCopy);

const animationTime = 400;

let isWriting = false;
let isErasing = false;
let isTransitioning = false;
let transitioningDebounce = null;
let erasingDebounce = null;
let eraseDebounce = null;
let hideDebounce = null;

let pencilBaseLeft = 0;
let pencilBaseBottom = 0;

pencil.addEventListener("mouseenter", () => {
  hideDebounce = setTimeout(() => hidePencil(), 1000);
});

pencil.addEventListener("mouseleave", () => {
  clearTimeout(hideDebounce);
});

document.addEventListener("scroll", () => {
  hidePencil();
});

document.addEventListener("focusout", (e) => {
  if (e.relatedTarget?.tagName === "INPUT") return;

  hidePencil();
});

document.addEventListener("focusin", (e) => {
  const target = e.target;

  if (target.tagName === "INPUT") {
    positionPencilToInput(target);
    showPencil();
  } else {
    hidePencil();
  }
});

document.addEventListener("selectionchange", () => {
  const activeElement = document.activeElement;
  if (activeElement && activeElement.tagName === "INPUT") {
    positionPencilLeft(activeElement);
  }
});

document.addEventListener("keydown", (e) => {
  const isEraseMode = ["Backspace", "Delete"].includes(e.key);
  const isWriteMode = e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
  if (!isWriteMode && !isEraseMode) return;

  let delay = 0;

  if (isEraseMode) {
    pencil.classList.remove("write");
    setTimeout(erase, 0);

    return;
  }

  if (isTransitioning) return;

  if (pencil.classList.contains("eraseing")) {
    setTransitioning();
    delay = animationTime;
    pencil.classList.remove("eraseing");
    pencil.classList.remove("erase");
    clearTimeout(eraseDebounce);
    erasingDebounce = null;
  }

  setTimeout(write, delay);
});

const write = () => {
  if (isWriting) return;
  isWriting = true;
  pencil.classList.add("write");
  setTimeout(() => {
    pencil.classList.remove("write");
    isWriting = false;
  }, animationTime);
};

const erase = () => {
  if (isErasing) return;

  isErasing = true;
  if (!pencil.classList.contains("eraseing")) {
    setTransitioning();
    pencil.classList.add("eraseing");
    eraseDebounce = setTimeout(() => pencil.classList.add("erase"), animationTime);
    setTimeout(() => {
      pencil.classList.remove("erase");
      isErasing = false;
    }, animationTime * 2);
  } else {
    pencil.classList.add("erase");
    setTimeout(() => {
      pencil.classList.remove("erase");
      isErasing = false;
    }, animationTime);
  }

  clearTimeout(erasingDebounce);
  erasingDebounce = setTimeout(() => {
    pencil.classList.remove("eraseing");
    erasingDebounce = null;
  }, 2000);
};

const setTransitioning = () => {
  clearTimeout(transitioningDebounce);
  isTransitioning = true;
  transitioningDebounce = setTimeout(() => (isTransitioning = false), animationTime);
};

const hidePencil = () => {
  pencil.classList.add("disappear");
  setTimeout(() => {
    pencil.classList.add("hide");
  }, animationTime);
};

const showPencil = () => {
  pencil.classList.remove("hide");
  setTimeout(() => {
    pencil.classList.remove("disappear");
  }, 0);
};

const getCursorOffset = (inputElement) => {
  if (!inputElement) return 0;

  const cursorPosition = inputElement.selectionStart || 0;
  const textBeforeCursor = (inputElement.value || "").substring(0, cursorPosition);

  const computedStyle = window.getComputedStyle(inputElement);
  inputCopy.style.setProperty("--PENI-input-max-width", inputElement.offsetWidth + "px");
  inputCopy.style.setProperty("--PENI-input-font-size", computedStyle.fontSize);
  inputCopy.style.setProperty("--PENI-input-font-family", computedStyle.fontFamily);
  inputCopy.style.setProperty("--PENI-input-font-weight", computedStyle.fontWeight);
  inputCopy.style.setProperty("--PENI-input-letter-spacing", computedStyle.letterSpacing);
  inputCopy.style.setProperty("--PENI-input-line-height", computedStyle.lineHeight);
  inputCopy.style.setProperty("--PENI-input-padding", computedStyle.padding);

  inputCopy.innerText = textBeforeCursor;

  const textWidth = inputCopy.offsetWidth;
  const paddingRight = parseFloat(computedStyle.paddingRight) || 0;

  return textWidth - paddingRight;
};

const positionPencilLeft = (inputElement) => {
  if (!inputElement) return;

  const cursorOffset = getCursorOffset(inputElement);

  pencil.style.setProperty("--PENI-left", `${pencilBaseLeft + cursorOffset}px`);
};

const positionPencilToInput = (inputElement) => {
  if (!inputElement) return;

  const rect = inputElement.getBoundingClientRect();
  const computedStyle = window.getComputedStyle(inputElement);
  const inputHeight = inputElement.offsetHeight;
  const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
  const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
  const boxHeight = inputHeight - paddingTop - paddingBottom;

  pencilBaseLeft = rect.left;
  pencilBaseBottom = window.innerHeight - rect.bottom + paddingBottom + boxHeight / 2;

  pencil.style.setProperty("--PENI-left", `${pencilBaseLeft}px`);
  pencil.style.setProperty("--PENI-bottom", `${pencilBaseBottom}px`);
};
