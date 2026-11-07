// Two views over one catalog.
//
// Selected: five substantial components per library, tiles sized from what the
// component actually measures (lines of code). Not a uniform card wall: the
// weight decides the span, so a 900-line app shell gets a wide tile and a 40-line
// primitive stays narrow.
//
// All items: a dense index for finding a specific thing.

const ROWS = 200;
const FEATURED = 5;
const REPO = "https://github.com/jjjermiah/ui-catalog/blob/main/";

const state = { items: [], lib: "", tier: "", q: "", sort: "lines", shown: ROWS };

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const num = (n) => Number(n).toLocaleString("en-US");

// The library description is a property of the collection, not of an item.
const ABOUT = {
  "watermelon-ui": "1,178 components, no paid tier. Everything Watermelon publishes.",
  arc: "Free half of Arc: components, blocks and a few items.",
  "arc-pro": "Arc's paid half, rebuilt from the bundle its docs pages ship.",
  boardui: "Free BoardUI: dashboards and agent interfaces on React Aria.",
  "boardui-pro": "BoardUI's paid components, as published by people who bought them.",
  kobra: "Eleven free components from Kobra's React Aria set.",
  "kobra-pro": "Kobra's paid set, unwound from its gallery.",
  "beui-pro": "beUI has no free tier. All 329 previews recovered from its Turbopack modules.",
  affectui: "141 items: 40 exact from the MIT repo, 101 rebuilt from demos.",
  bencho: "Free Bencho blocks, shipped as the author's own TSX and CSS.",
  libraries: "Nine MIT npm packages, cloned at the source rather than the dist.",
};

// Pick a library's most substantial work, skipping near-duplicates so five tiles
// read as five different ideas rather than five variants of one card. Anything
// over 5,000 lines is a bundle or a whole page rather than a component, so it is
// not allowed to be the hero;
function featured(items, n) {
  const real = items.filter((i) => i.lines > 0 && i.lines <= 5000);
  const pool = real.length >= n ? real : items.filter((i) => i.lines > 0);
  const byWeight = [...pool].sort((a, b) => b.lines - a.lines || b.bytes - a.bytes);
  const picked = [];
  const stems = new Set();
  for (const it of byWeight) {
    const stem = it.slug.split(/[-_]/)[0];
    if (stems.has(stem) && picked.length > 1) continue;
    stems.add(stem);
    picked.push(it);
    if (picked.length === n) break;
  }
  return picked;
}

// Tile width comes from the component. The largest file in a library sets the
// scale: if it dominates (60% of the biggest five) it takes 7 columns and the
// runner-up takes 5; otherwise the pair splits 6 and 6. The rest are thirds, so
// every row totals 12 and no tile is left sitting beside a hole.
function widths(group) {
  const n = group.length;
  if (n === 0) return [];
  if (n === 1) return [12];
  const max = group[0].lines || 1;
  const r = group[1].lines / max;
  const lead = r < 0.35 ? 8 : r < 0.6 ? 7 : 6;
  const out = [lead, 12 - lead];
  for (let i = 2; i < n; i++) out.push(Math.floor(12 / (n - 2)) || 4);
  return out;
}

function tile(it, w, largest) {
  const showUsage = it.usage && w >= 5;
  return `<button class="tile${largest ? " lead" : ""}" style="grid-column: span ${w}" data-id="${esc(it.id)}">
    <div class="tile-top">
      <span class="tiermark t${esc(it.tier[0])}">${esc(it.tier)}</span>
      <h3 class="tile-name">${esc(it.name)}</h3>
    </div>
    ${it.description ? `<p class="tile-desc">${esc(it.description)}</p>` : ""}
    ${showUsage ? `<pre class="tile-usage">${esc(it.usage.split("\n").slice(0, 6).join("\n"))}</pre>` : ""}
    <div class="tile-foot">
      <span>${num(it.lines)} lines</span>
      <span>${it.files} file${it.files === 1 ? "" : "s"}</span>
      ${it.jsx ? `<span>${num(it.jsx)} jsx</span>` : ""}
      <span class="path">${esc(it.libDir)}/${esc(it.slug)}</span>
    </div>
  </button>`;
}

function renderShowcase() {
  const libs = [...new Set(state.items.map((i) => i.libDir))];
  const blocks = libs.map((dir) => {
    const items = state.items.filter((i) => i.libDir === dir);
    const picked = featured(items, FEATURED);
    const lib = items[0].lib;
    return `<section class="set" data-lib="${esc(dir)}">
      <div class="set-head">
        <h2>${esc(lib)}</h2>
        <span class="n">${num(items.length)} items</span>
        <span class="what">${esc(ABOUT[dir] ?? "")} <a href="#all" data-goto="${esc(dir)}">Browse all</a></span>
      </div>
      <div class="grid">${(() => {
        const w = widths(picked);
        return picked.map((it, i) => tile(it, w[i], w[i] === 7 && i === 0)).join("");
      })()}</div>
    </section>`;
  });
  $("#showcase").innerHTML = blocks.join("");
}

function matches(it) {
  if (state.lib && it.libDir !== state.lib) return false;
  if (state.tier && !it.tier.includes(state.tier)) return false;
  if (!state.q) return true;
  const q = state.q.toLowerCase();
  return (
    it.name.toLowerCase().includes(q) ||
    it.slug.toLowerCase().includes(q) ||
    (it.description ?? "").toLowerCase().includes(q) ||
    (it.category ?? "").toLowerCase().includes(q) ||
    it.lib.toLowerCase().includes(q)
  );
}

function renderIndex() {
  const list = state.items.filter(matches).sort((a, b) => {
    if (state.sort === "name") return a.name.localeCompare(b.name);
    if (state.sort === "lib") return a.lib.localeCompare(b.lib) || b.lines - a.lines;
    return b.lines - a.lines;
  });
  $("#rows").innerHTML = list
    .slice(0, state.shown)
    .map(
      (it) => `<tr data-id="${esc(it.id)}">
        <td class="nm">${esc(it.name)}<span class="slug">${esc(it.slug)}</span></td>
        <td class="libcell">${esc(it.lib)}</td>
        <td class="num">${num(it.lines)}</td>
        <td class="num">${it.files}</td>
        <td class="tiercol"><span class="tiermark t${esc(it.tier[0])}">${esc(it.tier)}</span></td>
      </tr>`,
    )
    .join("");
  $("#count").textContent = `${num(list.length)} of ${num(state.items.length)}`;
  $("#more").hidden = list.length <= state.shown;
  $("#empty").hidden = list.length > 0;
}

function openItem(id) {
  const it = state.items.find((i) => i.id === id);
  if (!it) return;
  const props = it.props?.length
    ? `<h3>props</h3><table><thead><tr><th>Name</th><th>Type</th><th>Notes</th></tr></thead><tbody>${it.props
        .map((p) => `<tr><td><code>${esc(p.name)}</code></td><td>${esc(p.type ?? "")}</td><td>${esc(p.description ?? p.desc ?? "")}</td></tr>`)
        .join("")}</tbody></table>`
    : "";

  const origin = it.source
    ? `Recovered from <a href="${esc(it.source.url)}" target="_blank" rel="noreferrer">${esc(it.source.repo)}</a>${it.source.replica ? ". A reproduction of the design, not the vendor's file." : "."}`
    : { A: "The library publishes this file itself.", B: "Recovered from a compiled module the library ships to the browser.", C: "Rebuilt from the outside." }[it.tier];

  $("#sheet").innerHTML = `
    <div class="sheet-bar">
      <span class="kicker">${esc(it.lib)} · tier ${esc(it.tier)}</span>
      <button id="close" type="button">close ✕</button>
    </div>
    <h2>${esc(it.name)}</h2>
    <div class="kicker">${esc(it.id)}${it.category ? ` · ${esc(it.category)}` : ""}${it.type ? ` · ${esc(it.type.replace("registry:", ""))}` : ""}</div>
    ${it.description ? `<p style="margin-top:16px">${esc(it.description)}</p>` : ""}
    ${it.usage ? `<h3>usage</h3><pre>${esc(it.usage)}</pre>` : ""}
    ${props}
    <h3>files</h3>
    <div class="files">
      ${it.code ? `<div><a href="${REPO}${esc(it.code)}" target="_blank" rel="noreferrer">${esc(it.code)}</a> <span>· ${num(it.lines)} lines</span></div>` : ""}
      <div><span>${it.files} files · ${num(it.bytes)} bytes${it.css ? " · includes css" : ""}</span></div>
    </div>
    <h3>where it came from</h3>
    <p>${origin}</p>
    ${it.chunk ? `<p class="mono">chunk ${esc(it.chunk)}${it.module ? ` · module ${esc(it.module)}` : ""}</p>` : ""}
    <p><a href="${REPO}${esc(it.id)}" target="_blank" rel="noreferrer">Folder on GitHub</a></p>
  `;
  $("#drawer").hidden = false;
  $("#close").onclick = closeDrawer;
  history.replaceState(null, "", `#${it.id}`);
}

function closeDrawer() {
  $("#drawer").hidden = true;
  history.replaceState(null, "", location.hash.startsWith("#all") ? "#all" : location.pathname);
}

function showView(name, lib = "") {
  const showcase = name !== "all";
  $("#showcase").hidden = !showcase;
  $("#catalog").hidden = showcase;
  $("#view-showcase").setAttribute("aria-pressed", String(showcase));
  $("#view-all").setAttribute("aria-pressed", String(!showcase));
  if (!showcase) {
    if (lib && state.lib !== lib) {
      state.lib = lib;
      $("#lib").value = lib;
    }
    renderIndex();
  }
  document.documentElement.scrollTop = 0;
}

async function boot() {
  const data = await (await fetch("catalog.json")).json();
  state.items = data.items;
  $("#lede-count").textContent = num(data.items.length);

  // library filter, in catalog order
  const libs = [];
  for (const it of state.items) if (!libs.some((l) => l.dir === it.libDir)) libs.push({ dir: it.libDir, label: it.lib });
  $("#lib").innerHTML = `<option value="">Every library</option>${libs.map((l) => `<option value="${esc(l.dir)}">${esc(l.label)}</option>`).join("")}`;

  renderShowcase();
  renderIndex();

  $("#view-showcase").onclick = () => showView("showcase");
  $("#view-all").onclick = () => showView("all");

  $("#q").oninput = (e) => { state.q = e.target.value.trim(); state.shown = ROWS; renderIndex(); };
  $("#lib").onchange = (e) => { state.lib = e.target.value; state.shown = ROWS; renderIndex(); };
  $("#tier").onchange = (e) => { state.tier = e.target.value; state.shown = ROWS; renderIndex(); };
  $("#sort").onchange = (e) => { state.sort = e.target.value; renderIndex(); };
  $("#more").onclick = () => { state.shown += ROWS; renderIndex(); };

  $("#showcase").addEventListener("click", (e) => {
    const goto = e.target.closest("[data-goto]");
    if (goto) {
      e.preventDefault();
      showView("all", goto.dataset.goto);
      return;
    }
    const t = e.target.closest(".tile");
    if (t) openItem(t.dataset.id);
  });
  $("#rows").addEventListener("click", (e) => {
    const tr = e.target.closest("tr[data-id]");
    if (tr) openItem(tr.dataset.id);
  });
  $("#drawer").addEventListener("click", (e) => { if (e.target.id === "drawer") closeDrawer(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
    if (e.key === "/" && document.activeElement !== $("#q")) { e.preventDefault(); showView("all"); $("#q").focus(); }
  });

  if (location.hash.startsWith("#all")) showView("all");
  else if (location.hash.length > 1) openItem(location.hash.slice(1));
}

boot();
