document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.parentElement?.querySelector("input");

    if (!input) {
      return;
    }

    const isVisible = input.type === "text";
    input.type = isVisible ? "password" : "text";
    button.classList.toggle("visible", !isVisible);

    const label = isVisible ? "Показать пароль" : "Скрыть пароль";
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
  });
});

// Remember the last email used, so the login form is pre-filled on the
// next visit. The password is deliberately not stored.
(function () {
  const emailInput = document.querySelector('form[action="/login"] input[name="email"]');
  if (!emailInput) {
    return;
  }

  let lastEmail = "";
  try {
    lastEmail = localStorage.getItem("tap:lastEmail") || "";
  } catch (e) {}

  if (lastEmail && !emailInput.value) {
    emailInput.value = lastEmail;
  }

  document.querySelector('form[action="/login"]').addEventListener("submit", () => {
    try {
      if (emailInput.value) {
        localStorage.setItem("tap:lastEmail", emailInput.value);
      }
    } catch (e) {}
  });
})();
