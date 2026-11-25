// Builds the stats, streak and language cards from GitHub's API.
// Runs in GitHub Actions every 12h, so the README never depends on a public card server.
import { writeFileSync, mkdirSync } from "node:fs";

const USER = process.env.USERNAME || "bhupinder759";
const TOKEN = process.env.GITHUB_TOKEN;
const OUT = process.argv[2] || "dist/cards";

const q = `query($login:String!){ user(login:$login){
  name createdAt followers{totalCount}
  pullRequests{totalCount} issues{totalCount}
  repositories(ownerAffiliations:OWNER, isFork:false, privacy:PUBLIC, first:100){
    totalCount nodes{ stargazerCount languages(first:10, orderBy:{field:SIZE,direction:DESC}){ edges{ size node{ name color } } } } }
  contributionsCollection{ totalCommitContributions restrictedContributionsCount
    contributionCalendar{ totalContributions weeks{ contributionDays{ date contributionCount } } } } } }`;

const res = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: { Authorization: `bearer ${TOKEN}`, "Content-Type": "application/json", "User-Agent": "profile-cards" },
  body: JSON.stringify({ query: q, variables: { login: USER } }),
});
const json = await res.json();
if (!json.data?.user) { console.error(JSON.stringify(json)); process.exit(1); }
const u = json.data.user;
const cal = u.contributionsCollection.contributionCalendar;
const days = cal.weeks.flatMap(w => w.contributionDays);

// streaks (today may still be empty: the streak is still alive then)
let cur = 0, best = 0, run = 0;
for (const d of days) { run = d.contributionCount > 0 ? run + 1 : 0; best = Math.max(best, run); }
for (let i = days.length - 1; i >= 0; i--) {
  if (days[i].contributionCount > 0) cur++;
  else if (i === days.length - 1) continue;
  else break;
}
const activeDays = days.filter(d => d.contributionCount > 0).length;

// languages: every repo counts equally (its own language mix adds up to 1),
// so one huge repo with bundled vendor code cannot drown out the rest
const langs = {};
for (const r of u.repositories.nodes) {
  const sum = r.languages.edges.reduce((a, e) => a + e.size, 0);
  if (!sum) continue;
  for (const e of r.languages.edges) {
    const k = e.node.name; langs[k] ??= { size: 0, color: e.node.color || "#8b949e" }; langs[k].size += e.size / sum;
  }
}
const total = Object.values(langs).reduce((a, l) => a + l.size, 0) || 1;
const top = Object.entries(langs).sort((a, b) => b[1].size - a[1].size).map(([name, l]) => ({ name, color: l.color, pct: (l.size / total) * 100 }))
  .filter(l => l.pct >= 0.5).slice(0, 6);

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const num = n => Number(n).toLocaleString("en-US");
const fmt = n => n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n);
const font = `font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif"`;
const frame = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" ${font}>
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0B1020"/><stop offset="1" stop-color="#161B33"/></linearGradient>
<linearGradient id="acc" x1="0" x2="1"><stop offset="0" stop-color="#7DD3FC"/><stop offset=".5" stop-color="#A78BFA"/><stop offset="1" stop-color="#F472B6"/></linearGradient>
<style>.k{fill:#94A3B8;font-size:13px;font-weight:600}.v{fill:#F1F5F9;font-size:30px;font-weight:800}
.h{fill:#E2E8F0;font-size:17px;font-weight:800}.f{animation:f .8s ease-out backwards}
@keyframes f{from{opacity:0}}.g{animation:g 1.4s ease-out backwards}@keyframes g{from{stroke-dashoffset:var(--len)}}</style></defs>
<rect width="${w}" height="${h}" rx="18" fill="url(#bg)" stroke="#ffffff" stroke-opacity=".08"/>${body}</svg>`;

// --- stats + streak card ---
const tiles = [
  ["Contributions", num(cal.totalContributions)],
  ["Commits", num(u.contributionsCollection.totalCommitContributions)],
  ["Active days", num(activeDays)],
  ["Public repos", num(u.repositories.totalCount)],
  ["Pull requests", num(u.pullRequests.totalCount)],
  ["Followers", num(u.followers.totalCount)],
];
let body = `<text class="h" x="28" y="40">GitHub activity</text><text class="k" x="452" y="40" text-anchor="end" font-weight="500">last 12 months</text>`;
tiles.forEach(([k, v], i) => {
  const x = 28 + (i % 3) * 150, y = 92 + Math.floor(i / 3) * 78;
  body += `<g class="f" style="animation-delay:${i * 0.08}s"><text class="v" x="${x}" y="${y}">${esc(v)}</text><text class="k" x="${x}" y="${y + 22}">${esc(k)}</text></g>`;
});
// streak ring
const R = 62, C = 2 * Math.PI * R, ratio = best ? Math.min(cur / best, 1) : 0;
body += `<line x1="482" y1="30" x2="482" y2="210" stroke="#fff" stroke-opacity=".08"/>
<g transform="translate(600 118)">
<circle r="${R}" fill="none" stroke="#1E293B" stroke-width="10"/>
<circle r="${R}" fill="none" stroke="url(#acc)" stroke-width="10" stroke-linecap="round" transform="rotate(-90)"
 stroke-dasharray="${(C * ratio).toFixed(1)} ${C.toFixed(1)}" class="g" style="--len:${(C * ratio).toFixed(1)}"/>
<text y="6" text-anchor="middle" fill="#F1F5F9" font-size="34" font-weight="800">${cur}</text>
<text y="30" text-anchor="middle" class="k">day streak</text></g>
<text x="600" y="214" text-anchor="middle" class="k">Longest: ${best} days</text>`;
mkdirSync(OUT, { recursive: true });
writeFileSync(`${OUT}/stats.svg`, frame(720, 240, body));

// --- languages card ---
let lb = `<text class="h" x="28" y="40">Most used languages</text><text class="k" x="452" y="40" text-anchor="end" font-weight="500">across ${u.repositories.totalCount} repos</text><g transform="translate(28 62)">`;
let x = 0; const W = 424;
top.forEach(l => { const w = (l.pct / 100) * W; lb += `<rect x="${x.toFixed(1)}" width="${Math.max(w, 2).toFixed(1)}" height="10" fill="${l.color}"/>`; x += w; });
lb += `</g>`;
top.forEach((l, i) => {
  const cx = 34 + (i % 2) * 215, cy = 108 + Math.floor(i / 2) * 36;
  lb += `<g class="f" style="animation-delay:${i * 0.08}s"><circle cx="${cx}" cy="${cy - 5}" r="6" fill="${l.color}"/>
<text x="${cx + 14}" y="${cy}" fill="#E2E8F0" font-size="14" font-weight="600">${esc(l.name)} <tspan fill="#94A3B8">${l.pct.toFixed(1)}%</tspan></text></g>`;
});
writeFileSync(`${OUT}/languages.svg`, frame(480, 240, lb));
// --- activity graph: last 31 days ---
{
  const last = days.slice(-31), W = 1100, H = 300, L = 60, R = 30, T = 70, B = 50;
  const max = Math.max(5, ...last.map(d => d.contributionCount));
  const step = Math.ceil(max / 5 / 5) * 5 || 5, top = step * 5;
  const X = i => L + (i * (W - L - R)) / (last.length - 1);
  const Y = v => T + (1 - v / top) * (H - T - B);
  const pts = last.map((d, i) => [X(i), Y(d.contributionCount)]);
  // smooth curve (Catmull-Rom to Bezier), clamped so it never dips below zero
  let path = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, Math.min(Y(0), p1[1] + (p2[1] - p0[1]) / 6)];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, Math.min(Y(0), p2[1] - (p3[1] - p1[1]) / 6)];
    path += ` C${c1.map(n => n.toFixed(1))} ${c2.map(n => n.toFixed(1))} ${p2.map(n => n.toFixed(1))}`;
  }
  const sum = last.reduce((a, d) => a + d.contributionCount, 0);
  let g = `<defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A78BFA" stop-opacity=".45"/><stop offset="1" stop-color="#A78BFA" stop-opacity="0"/></linearGradient></defs>
<text class="h" x="28" y="40">Contributions, last 31 days</text><text class="k" x="${W - 28}" y="40" text-anchor="end" font-weight="500">${num(sum)} in total</text>`;
  for (let v = 0; v <= top; v += step) g += `<line x1="${L}" x2="${W - R}" y1="${Y(v)}" y2="${Y(v)}" stroke="#fff" stroke-opacity=".06"/><text x="${L - 12}" y="${Y(v) + 4}" text-anchor="end" fill="#64748B" font-size="11">${v}</text>`;
  last.forEach((d, i) => { if (i % 3 === 0 || i === last.length - 1) g += `<text x="${X(i)}" y="${H - 22}" text-anchor="middle" fill="#64748B" font-size="11">${d.date.slice(8)}/${d.date.slice(5, 7)}</text>`; });
  g += `<path d="${path} L${X(last.length - 1)},${Y(0)} L${L},${Y(0)} Z" fill="url(#area)"/>`;
  g += `<path d="${path}" fill="none" stroke="url(#acc)" stroke-width="3" stroke-linecap="round" pathLength="1" stroke-dasharray="1" class="draw"/>`;
  pts.forEach(([x, y], i) => { if (last[i].contributionCount) g += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5" fill="#0B1020" stroke="#C4B5FD" stroke-width="2"><title>${last[i].date}: ${last[i].contributionCount}</title></circle>`; });
  g += `<style>.draw{animation:draw 1.8s ease-out backwards}@keyframes draw{from{stroke-dashoffset:1}}</style>`;
  writeFileSync(`${OUT}/activity.svg`, frame(W, H, g));
}
console.log({ cur, best, activeDays, total: cal.totalContributions, top: top.map(t => t.name) });
