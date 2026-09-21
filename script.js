const revealItems = document.querySelectorAll(".reveal");
const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector(".form-message");
const year = document.querySelector("#year");

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

year.textContent = new Date().getFullYear();

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name");
  formMessage.textContent = `${name}님, 메시지를 확인했어요. 곧 답장드릴게요!`;
  contactForm.reset();
});
