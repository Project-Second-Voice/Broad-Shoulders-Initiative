const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navToggleLabel = navToggle?.querySelector(".sr-only");
const stories = window.BSI_STORIES || [];
const categories = window.BSI_CATEGORIES || [];

function setMenu(open) {
  if (!navToggle || !navLinks) return;
  navLinks.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  if (navToggleLabel) navToggleLabel.textContent = open ? "Close navigation" : "Open navigation";
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    setMenu(!navLinks.classList.contains("open"));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  document.addEventListener("click", (event) => {
    if (!navLinks.classList.contains("open")) return;
    if (event.target.closest(".nav")) return;
    setMenu(false);
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 861px)").matches) setMenu(false);
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function makeTags(tags) {
  return (tags || [])
    .map((tag) => `<span class="story-tag">${escapeHtml(tag)}</span>`)
    .join("");
}

function makeArchiveCard(story) {
  const imageClass = story.imageClass ? ` ${story.imageClass}` : "";
  return `
    <article class="blog-entry" id="${escapeHtml(story.slug)}" data-story-card data-tags="${escapeHtml(story.tags.join("|"))}">
      <img class="${escapeHtml(imageClass.trim())}" src="${escapeHtml(story.image)}" alt="${escapeHtml(story.imageAlt)}" width="1024" height="715" loading="lazy" decoding="async" />
      <div class="blog-content">
        <p class="eyebrow">${escapeHtml(story.category)}</p>
        <h2>${escapeHtml(story.title)}</h2>
        <p class="story-meta"><span>${escapeHtml(story.date)}</span><span>${escapeHtml(story.readTime)}</span><span>${escapeHtml(story.author)}</span></p>
        <div class="story-tags" aria-label="Story categories">${makeTags(story.tags)}</div>
        <p>${escapeHtml(story.excerpt)}</p>
        <a class="button secondary read-more" href="${escapeHtml(story.url)}">Read More</a>
      </div>
    </article>
  `;
}

function renderStoryArchive() {
  const archive = document.querySelector("[data-story-archive]");
  const filters = document.querySelector("[data-story-filters]");
  if (!archive || !stories.length) return;

  archive.innerHTML = stories.map(makeArchiveCard).join("");

  if (!filters) return;
  filters.innerHTML = [
    '<button class="tag-filter active" type="button" data-filter="all" aria-pressed="true">All Stories</button>',
    ...categories.map((category) => `<button class="tag-filter" type="button" data-filter="${escapeHtml(category)}" aria-pressed="false">${escapeHtml(category)}</button>`),
  ].join("");

  filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    const filter = button.dataset.filter;
    filters.querySelectorAll(".tag-filter").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    archive.querySelectorAll("[data-story-card]").forEach((card) => {
      const matches = filter === "all" || card.dataset.tags.split("|").includes(filter);
      card.hidden = !matches;
    });
  });
}

function renderLatestStories() {
  const latest = document.querySelector("[data-latest-stories]");
  if (!latest || !stories.length) return;

  latest.innerHTML = stories
    .slice(0, 3)
    .map(
      (story) => `
        <a class="post-row" href="${escapeHtml(story.url)}">
          <span>${escapeHtml(story.category)}</span>
          <strong>${escapeHtml(story.title)}</strong>
          <em>${escapeHtml(story.author)}</em>
          <span class="post-row-tags">${makeTags(story.tags.slice(0, 2))}</span>
        </a>
      `
    )
    .join("");
}

function renderStoryDetailTags() {
  const slug = document.body.dataset.storySlug;
  if (!slug || !stories.length) return;
  const story = stories.find((item) => item.slug === slug);
  const meta = document.querySelector(".page-hero .story-meta");
  if (!story || !meta || document.querySelector(".page-hero .story-tags")) return;
  meta.insertAdjacentHTML("afterend", `<div class="story-tags" aria-label="Story categories">${makeTags(story.tags)}</div>`);
}

function renderStorySupportNote() {
  const detail = document.querySelector(".story-detail");
  if (!detail || document.querySelector(".global-support-note")) return;
  detail.insertAdjacentHTML(
    "beforeend",
    `
      <aside class="global-support-note" aria-label="Support reminder">
        <p>If you are struggling, you are not alone. Support resources are available, and reaching out can be a strong first step.</p>
        <div class="support-note-links">
          <a href="../resources.html">Visit Resources</a>
          <a href="https://988lifeline.org/get-help/" target="_blank" rel="noopener">988 Lifeline</a>
        </div>
      </aside>
    `
  );
}

renderStoryArchive();
renderLatestStories();
renderStoryDetailTags();
renderStorySupportNote();
