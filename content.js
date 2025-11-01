// TODO - move the pencil to the current place in the input

const pencil = document.createElement("div");
pencil.classList.add("PENI-pencil");
pencil.classList.add("test");
document.body.appendChild(pencil);

const animationTime = 500;

let isWriting = false;
let isErasing = false;
let isTransitioning = false;
let transitioningDebunce = null;
let erasingDebunce = null;
let eraseDebunce = null;

pencil.addEventListener("mouseenter", () => {
  console.log("Mouse enter");
  hidePencil();
});

document.addEventListener("scroll", () => {
  console.log("Scroll");
  hidePencil();
});

document.addEventListener("focusout", (e) => {
  console.log("Focus out");
  if (e.target.tagName === "INPUT") return;

  hidePencil();
});

document.addEventListener("focusin", (e) => {
  console.log("Focus in");
  const target = e.target;

  if (target.tagName === "INPUT") {
    positionPencilToInput(target);
    showPencil();
  } else {
    hidePencil();
  }
});

document.addEventListener("keydown", (e) => {
  const isEraseMode = ["Backspace", "Delete"].includes(e.key);
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
    clearTimeout(eraseDebunce);
    erasingDebunce = null;
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
    eraseDebunce = setTimeout(
      () => pencil.classList.add("erase"),
      animationTime
    );
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

  clearTimeout(erasingDebunce);
  erasingDebunce = setTimeout(() => {
    pencil.classList.remove("eraseing");
    erasingDebunce = null;
  }, 2000);
};

const setTransitioning = () => {
  clearTimeout(transitioningDebunce);
  isTransitioning = true;
  transitioningDebunce = setTimeout(
    () => (isTransitioning = false),
    animationTime
  );
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

const positionPencilToInput = (inputElement) => {
  if (!inputElement) return;

  const rect = inputElement.getBoundingClientRect();
  const pencilSize =
    parseFloat(getComputedStyle(pencil).getPropertyValue("--PENI-size")) || 300;

  const left = rect.left;
  const bottom = window.innerHeight - rect.top;

  pencil.style.setProperty("--PENI-left", `${left}px`);
  pencil.style.setProperty("--PENI-bottom", `${bottom}px`);
};
