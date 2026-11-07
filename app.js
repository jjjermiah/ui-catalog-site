// Catalog browser: reads catalog.json and renders it. No framework, no build.
//
// Deliberately metadata only. The component code stays in the private repo; this
// page is for finding what exists and jumping to the file.

const PAGE = 60; // cards rendered per batch
const state = { items: [], lib: "", tier: "", q: "", sort: "name", shown: PAGE };

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

const REPO = "https://github.com/jjjermiah/ui-catalog/blob/main/";

function matches(it) {
  if (state.lib && it.libDir !== state.lib) return false;
  if (state.tier && !it.tier.includes(state.tier)) return false;
  if (!state.q) return true;
  const q = state.q.toLowerCase();
  return (
    it.name.toLowerCase().includes(q) ||
    it.slug.includes(q) ||
    (it.description ?? "").toLowerCase().includes(q) ||
    it.lib.toLowerCase().includes(q) ||
    (it.category ?? "").toLowerCase().includes(q)
  );
}

function sorted(list) {
  const by = state.sort;
  return list.sort((a, b) => {
    if (by === "lines") return b.lines - a.lines;
    if (by === "lib") return a.lib.localeCompare(b.lib) || a.name.localeCompare(b.name);
    return a.name.localeCompare(b.name);
  });
}

function card(it) {
  return `<button class="card" data-id="${esc(it.id)}">
    <div class="tags">
      <span class="pill"><span class="tier-dot" style="background:var(--${it.tier[0].toLowerCase()})"></span>${esc(it.lib)}</span>
      ${it.category ? `<span class="pill">${esc(it.category)}</span>` : ""}
      ${it.type ? `<span class="pill">${esc(it.type.replace("registry:", ""))}</span>` : ""}
    </div>
    <h3 title="${esc(it.name)}">${esc(it.name)}</h3>
    <p>${esc(it.description ?? "No description published for this item.")}</p>
    <div class="meta">
      <span>${fmt(it.lines)} lines</span>
      <span>${it.files} file${it.files === 1 ? "" : "s"}</span>
      ${it.jsx ? `<span>${fmt(Number(it.jsx))} jsx</span>` : ""}
      ${it.css ? "<span>css</span>" : ""}
    </div>
  </button>`;
}

function render() {
  const list = sorted(state.items.filter(matches));
  const slice = list.slice(0, state.shown);
  $("#grid").innerHTML = slice.map(card).join("");
  $("#count").textContent = `${list.length} of ${state.items.length}`;
  $("#empty").hidden = list.length > 0;
  $("#more").hidden = list.length <= state.shown;
}

function renderLibs() {
  const counts = state.items.reduce((m, i) => ((m[i.lib] = (m[i.lib] ?? 0) + 1), m), {});
  const rows = [
    `<button class="lib" data-lib="" aria-current="${state.lib === ""}"><b>All libraries</b><span>${state.items.length}</span></button>`,
    ...Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([lib, n]) => {
        const dir = state.items.find((i) => i.lib === lib)?.libDir ?? "";
        return `<button class="lib" data-lib="${esc(dir)}" aria-current="${state.lib === dir}"><b>${esc(lib)}</b><span>${n}</span></button>`;
      }),
  ];
  $("#libs").innerHTML = rows.join("");
}

function openItem(id) {
  const it = state.items.find((i) => i.id === id);
  if (!it) return;
  const props = it.props?.length
    ? `<h4>Props</h4><table><thead><tr><th>Name</th><th>Type</th><th>Notes</th></tr></thead><tbody>${
        it.props.map((p) => `<tr><td><code>${esc(p.name)}</code></td><td>${esc(p.type ?? "")}</td><td>${esc(p.description ?? p.desc ?? "")}</td></tr>`).join("")
      }</tbody></table>`
    : "";

  $("#sheet").innerHTML = `
    <button class="ghost close" id="close" type="button">Close</button>
    <h2>${esc(it.name)}</h2>
    <div class="sub">
      <span class="tier-dot" style="background:var(--${it.tier[0].toLowerCase()})"></span>
      tier ${esc(it.tier)} · ${esc(it.lib)} · <code>${esc(it.slug)}</code>
    </div>
    ${it.description ? `<p>${esc(it.description)}</p>` : ""}
    ${it.usage ? `<h4>Usage</h4><pre>${esc(it.usage)}</pre>` : ""}
    ${props}
    <h4>Files</h4>
    <div class="filelist">
      <div><code>${esc(it.id)}/</code><span>${fmt(it.bytes)} B</span></div>
      ${it.code ? `<div><a class="link" href="${REPO}${esc(it.code)}" target="_blank" rel="noreferrer">${esc(it.code.split("/").pop())}</a><span>${fmt(it.lines)} lines</span></div>` : ""}
    </div>
    <h4>Where it came from</h4>
    <p>${
      it.source
        ? `Recovered from <a class="link" href="${esc(it.source.url)}" target="_blank" rel="noreferrer">${esc(it.source.repo)}</a>${it.source.replica ? " · a reproduction, not the vendor's code" : ""}.`
        : { A: "The library published this file itself.", B: "Recovered from a compiled module the library serves to the browser." }[it.tier] ?? "Recovered or reproduced; see the folder AGENTS.md."
    }</p>
    <h4>Open</h4>
    <p><a class="link" href="${REPO}${esc(it.id)}" target="_blank" rel="noreferrer">Folder on GitHub</a>${
      it.chunk ? ` · chunk <code>${esc(it.chunk)}</code>` : ""
    }${it.module ? ` · module <code>${esc(it.module)}</code>` : ""}</p>
  `;
  $("#drawer").hidden = false;
  $("#close").onclick = closeDrawer;
  history.replaceState(null, "", `#${it.id}`);
}

function closeDrawer() {
  $("#drawer").hidden = true;
  history.replaceState(null, "", location.pathname + location.search);
}

function applyHash() {
  const id = location.hash.slice(1);
  if (id) openItem(id);
}

async function boot() {
  const res = await fetch("catalog.json");
  const data = await res.json();
  state.items = data.items;
  $("#total").textContent = `${data.items.length} items · ${data.libraries.length} libraries`;
  renderLibs();
  render();

  $("#q").addEventListener("input", (e) => {
    state.q = e.target.value.trim();
    state.shown = PAGE;
    render();
  });
  $("#tier").addEventListener("change", (e) => {
    state.tier = e.target.value;
    state.shown = PAGE;
    render();
  });
  $("#sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });
  $("#libs").addEventListener("click", (e) => {
    const btn = e.target.closest(".lib");
    if (!btn) return;
    state.lib = btn.dataset.lib;
    state.shown = PAGE;
    renderLibs();
    render();
  });
  $("#grid").addEventListener("click", (e) => {
    const c = e.target.closest(".card");
    if (c) openItem(c.dataset.id);
  });
  $("#more").addEventListener("click", () => {
    state.shown += PAGE;
    render();
  });
  $("#drawer").addEventListener("click", (e) => {
    if (e.target.id === "drawer") closeDrawer();
  });
  $("#theme").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== $("#q")) {
      e.preventDefault();
      $("#q").focus();
    }
    if (e.key === "Escape") closeDrawer();
  });

  const saved = localStorage.getItem("theme");
  if (saved) document.documentElement.dataset.theme = saved;
  applyHash();
}

boot();
