(function () {
  const nav = document.querySelector(".site-nav");
  const menu = document.querySelector(".menu-button");
  const links = document.querySelector(".nav-links");
  const lang = document.querySelector(".lang-select");
  let noticeTimer;

  function showLanguageNotice() {
    let notice = document.querySelector(".language-notice");
    if (!notice) {
      notice = document.createElement("div");
      notice.className = "language-notice";
      document.body.appendChild(notice);
    }
    notice.textContent = "This official-page rebuild currently includes English and Vietnamese pages.";
    notice.classList.add("is-visible");
    window.clearTimeout(noticeTimer);
    noticeTimer = window.setTimeout(() => {
      notice.classList.remove("is-visible");
    }, 3600);
  }

  function setScrolled() {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 10);
  }

  menu?.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    menu.setAttribute("aria-expanded", String(open));
  });

  links?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      menu?.setAttribute("aria-expanded", "false");
    });
  });

  lang?.addEventListener("change", () => {
    const selected = lang.value;
    const here = window.location.pathname;
    const match = here.match(/^(.*?)(?:en|vi)(?:\/|$)/);
    const base = match ? match[1] : "/";
    const target = here.includes("/about")
      ? "about/"
      : here.includes("/careers")
        ? "careers/"
        : "";
    if (selected === "vi") {
      window.location.href = `${base}vi/${target}`;
      return;
    }
    if (selected === "en") {
      window.location.href = `${base}en/${target}`;
      return;
    }
    lang.value = document.documentElement.lang || "en";
    showLanguageNotice();
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -60px 0px" });
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  window.addEventListener("scroll", setScrolled, { passive: true });
  setScrolled();
})();
