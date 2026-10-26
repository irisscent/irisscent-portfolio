const revealItems = document.querySelectorAll(".reveal");
const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector(".form-message");
const year = document.querySelector("#year");
const projectModal = document.querySelector("#project-modal");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const modalRole = document.querySelector("#modal-role");
const modalTechnologies = document.querySelector("#modal-technologies");
const modalImpact = document.querySelector("#modal-impact");
const modalCloseButton = document.querySelector(".project-modal-close");
const projectCards = document.querySelectorAll(".project-card");

const projectDetails = {
  onda: {
    title: "Onda — 나만의 영감 수집함",
    description: "흩어진 이미지와 메모를 한곳에 모으고, 나중에 쉽게 다시 발견하도록 돕는 모바일 앱입니다.",
    role: "제품 방향 설정, 사용자 흐름 설계, iOS 화면 디자인",
    technologies: "Figma, SwiftUI 프로토타이핑, 사용자 인터뷰",
    impact: "예시 프로젝트에서 저장 콘텐츠 재방문율이 높아지고, 영감 정리 시간을 줄였습니다."
  },
  "space-oddity": {
    title: "Space Oddity",
    description: "독립 창작자의 작업을 한 공간에 소개하는 가상의 브랜드와 웹 경험입니다.",
    role: "브랜드 아이덴티티, 아트 디렉션, 웹 UI 설계",
    technologies: "Figma, Adobe Illustrator, HTML, CSS",
    impact: "예시 프로젝트에서 브랜드 인지도를 높이고 포트폴리오 탐색 흐름을 단순화했습니다."
  },
  slowly: {
    title: "Slowly, better days",
    description: "작은 일상 습관과 기분의 변화를 차분히 기록하는 가상의 웹 서비스입니다.",
    role: "사용자 조사, 대시보드 UI 디자인, 인터랙션 프로토타입",
    technologies: "Figma, JavaScript, CSS",
    impact: "예시 프로젝트에서 주간 기록 완료율을 높이는 간결한 입력 흐름을 제안했습니다."
  }
};

let lastFocusedCard = null;

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

year.textContent = new Date().getFullYear();

// 프로젝트 정보를 모달에 채우고, 연 카드로 포커스를 옮깁니다.
function openProjectModal(card) {
  const project = projectDetails[card.dataset.project];
  if (!project) {
    console.error(`프로젝트 상세 정보를 찾을 수 없습니다: ${card.dataset.project}`);
    return;
  }

  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalRole.textContent = project.role;
  modalTechnologies.textContent = project.technologies;
  modalImpact.textContent = project.impact;
  lastFocusedCard = card;
  projectModal.showModal();
  modalCloseButton.focus();
}

// 카드의 클릭, Enter, Space 입력으로 상세 모달을 엽니다.
projectCards.forEach((card) => {
  card.addEventListener("click", () => openProjectModal(card));
  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openProjectModal(card);
  });
});

// 닫기 버튼과 모달 바깥 영역 클릭으로 모달을 닫습니다.
modalCloseButton.addEventListener("click", () => projectModal.close());
projectModal.addEventListener("click", (event) => {
  if (event.target === projectModal) projectModal.close();
});

// Escape 또는 닫기 이후 마지막으로 선택한 카드에 포커스를 돌려줍니다.
projectModal.addEventListener("close", () => {
  if (lastFocusedCard) lastFocusedCard.focus();
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name");
  formMessage.textContent = `${name}님, 메시지를 확인했어요. 곧 답장드릴게요!`;
  contactForm.reset();
});
