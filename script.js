document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("fancyForm");
  const submitBtn = document.getElementById("submitBtn");
  const resetBtn = document.getElementById("resetBtn");
  const progress = document.getElementById("progress");
  const bar = document.querySelector(".progress .bar");
  const success = document.getElementById("success");
  const avatar = document.getElementById("avatar");
  const preview = document.getElementById("preview");

  function setError(input, message) {
    const el = input.closest(".field").querySelector(".error");
    el.textContent = message || "";
  }

  function validate() {
    let ok = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");

    if (!name.value.trim() || name.value.trim().length < 2) {
      setError(name, "Please enter your name");
      ok = false;
    } else setError(name, "");
    if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      setError(email, "Enter a valid email");
      ok = false;
    } else setError(email, "");
    return ok;
  }

  avatar.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];

    if (!file) {
      preview.style.backgroundImage = "none";
      preview.setAttribute("aria-hidden", "true");
      return;
    }

    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      preview.style.backgroundImage = `url(${url})`;
      preview.removeAttribute("aria-hidden");
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validate()) return;

    submitBtn.disabled = true;
    progress.hidden = false;
    bar.style.width = "2%";
    let pct = 2;
    const t = setInterval(() => {
      pct += Math.random() * 18;
      if (pct >= 96) pct = 96;
      bar.style.width = `${Math.floor(pct)}%`;
    }, 220);

    // simulate network/upload delay
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 1200));
    clearInterval(t);
    bar.style.width = "100%";

    await new Promise((r) => setTimeout(r, 420));
    progress.hidden = true;
    success.hidden = false;
    form.reset();
    preview.style.backgroundImage = "none";
    submitBtn.disabled = false;
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    success.hidden = true;
    progress.hidden = true;
    preview.style.backgroundImage = "none";
    document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
  });
});
