document.body.classList.add("js-enhanced");

const rotatingWords = [
  "Data-backed Proposal",
  "Client Need Translation",
  "Delivery Ownership",
  "AI-enhanced Workflow"
];

const heroWord = document.getElementById("heroWord");
let currentWordIndex = 0;

const updateHeroWord = () => {
  if (!heroWord) {
    return;
  }

  currentWordIndex = (currentWordIndex + 1) % rotatingWords.length;
  heroWord.textContent = rotatingWords[currentWordIndex];
};

if (heroWord) {
  window.setInterval(updateHeroWord, 2400);
}

const revealElements = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const imageTriggers = document.querySelectorAll(".project-image-trigger");
const projectModal = document.getElementById("projectModal");
const projectModalImage = document.getElementById("projectModalImage");
const projectModalClose = document.getElementById("projectModalClose");

const closeProjectModal = () => {
  if (!projectModal || !projectModalImage) {
    return;
  }

  projectModal.hidden = true;
  projectModal.setAttribute("aria-hidden", "true");
  projectModalImage.src = "";
  projectModalImage.alt = "";
  document.body.style.overflow = "";
};

const openProjectModal = (src, alt) => {
  if (!projectModal || !projectModalImage) {
    return;
  }

  projectModalImage.src = src;
  projectModalImage.alt = alt;
  projectModal.hidden = false;
  projectModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

imageTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    openProjectModal(trigger.dataset.image || "", trigger.dataset.alt || "");
  });
});

if (projectModal) {
  projectModal.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.dataset.closeModal === "true") {
      closeProjectModal();
    }
  });
}

if (projectModalClose) {
  projectModalClose.addEventListener("click", closeProjectModal);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectModal && !projectModal.hidden) {
    closeProjectModal();
  }
});
