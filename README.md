# Broad Shoulders Initiative

A clean static website for the youth-led Broad Shoulders Initiative, a not-for-profit initiative dedicated to spreading awareness on mental health for students and creating an inclusive community for sharing challenges such as body image, academic stress, sports-related injury, and family situations.

## Pages

- `index.html`
- `about.html`
- `stories.html`
- `resources.html`
- `submit.html`
- `contact.html`

## Project Structure

- `assets/css/styles.css`: shared responsive styling.
- `assets/js/script.js`: mobile navigation behavior.
- `assets/images/`: optimized logo and story visuals.
- `stories/`: published standalone story pages.

## Current Story Pages

- `stories/communication.html`
- `stories/enjoying-the-music.html`
- `stories/problems.html`
- `stories/doubt-and-performance-anxiety.html`
- `stories/broad-shoulders.html`
- `stories/are-you-at-your-moms.html`
- `stories/you-come-before-the-athlete.html`

## Maintenance Notes

- Keep shared visual rules in `assets/css/styles.css` so new pages inherit the same calm editorial style.
- Add future top-level pages by copying an existing page shell, updating the active nav item, and adding one nav link in each page header.
- The nav spacing is prepared for one additional future page link without needing a redesign.
- Future partner logos, descriptions, and links can live under `assets/images/` and a new top-level page when that content is approved.
- Keep all story pages linked from `stories.html`, and add any story-specific support links inside that story's `Resources & Support` section.
- Do not publish submission content until it has been reviewed for consent, privacy, identifying details, and safety.

## Easy Preview

Open `index.html` directly in a browser, or run a tiny static server:

```bash
python3 -m http.server 8128
```

Then visit `http://127.0.0.1:8128`.

## Deploying With GitHub Pages

After pushing the repository to GitHub:

1. Open the repository settings.
2. Go to Pages.
3. Select the `main` branch and root folder.
4. Save and wait for GitHub Pages to publish.
