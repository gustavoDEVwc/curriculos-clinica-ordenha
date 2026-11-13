// Área do gestor: dashboard em pizza e visitas dos vendedores
// ===== Área do gestor =====
const COL = [
  "#103d82",
  "#2f8fbf",
  "#e0a030",
  "#c9553d",
  "#7a5cb5",
  "#4cb58a",
  "#8a97a0",
  "#d97aa5",
  "#5d7f2e",
  "#0e6b52",
  "#b0803a",
  "#2a9d9d",
];
const fsel = (id, l, o, v) =>
  `<label>${l}<select id="${id}"><option value="">Todos</option>${o.map((x) => `<option${x == v ? " selected" : ""}>${esc(x)}</option>`).join("")}</select></label>`;
const pairs = (a, f) =>
  Object.entries(grp(a, f))
    .map(([k, v]) => [k, v.length])
    .sort((x, y) => y[1] - x[1]);
const topN = (p, n = 11) =>
  p.length > n
    ? [...p.slice(0, n), ["Outras", sum(p.slice(n), (x) => x[1])]]
    : p;
let pn = 0;
function pbox(t, p) {
  if (!p.length || !sum(p, (x) => x[1]))
    return box(t, '<p class="m">Sem dados.</p>');
  const id = "pc" + pn++;
  jobs.push(() =>
    charts.push(
      new Chart($("#" + id), {
        type: "pie",
        data: {
          labels: p.map((x) => x[0]),
          datasets: [
            {
              data: p.map((x) => x[1]),
              backgroundColor: p.map((_, i) => COL[i % COL.length]),
              borderWidth: 1,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom" },
            tooltip: {
              callbacks: {
                label: (c) => {
                  const T = c.dataset.data.reduce((a, b) => a + b, 0);
                  return `${c.label}: ${fmt(c.parsed)} (${Math.round((100 * c.parsed) / T)}%)`;
                },
              },
            },
          },
        },
      }),
    ),
  );
  return box(
    t,
    `<div style="position:relative;height:270px"><canvas id="${id}"></canvas></div>`,
  );
}
function gestor() {
  if (!Auth.gestor)
    return box(
      "Acesso restrito",
      '<p class="m">Esta área é exclusiva do gestor.</p>',
    );
  const cid = [
    ...new Set(DB.clientes.map((c) => c.cidade).filter(Boolean)),
  ].sort();
  const F =
    gt == "dash"
      ? fsel("gfv", "Vendedor", VEND, gf.v) +
        fsel("gfc", "Cidade", cid, gf.c) +
        fsel("gfi", "InService", YN, gf.i) +
        fsel("gfp", "Prioridade", ["A", "B", "C", "D"], gf.p)
      : gt == "orc"
        ? ofiltros()
        : fsel("gvv", "Vendedor", VEND, gv.v) +
          `<label>De<input type="date" id="gde" value="${gv.de}"></label><label>Até<input type="date" id="gate" value="${gv.ate}"></label>`;
  return `<div class="bar2">${[
    ["dash", "Dashboard"],
    ["vis", "Visitas dos vendedores"],
    ["orc", "Orçamentos"],
  ]
    .map(
      ([k, l]) =>
        `<button class="${gt == k ? "pri" : ""}" data-gt="${k}">${l}</button>`,
    )
    .join(
      "",
    )}</div><div class="box"><div class="g" id="gf">${F}</div></div><div id="gbody"></div>`;
}
function gdraw() {
  charts.forEach((c) => c.destroy());
  charts = [];
  jobs = [];
  pn = 0;
  if (typeof Chart == "undefined") {
    $("#gbody").innerHTML =
      '<p class="m">Os gráficos não carregaram. Conecte-se à internet e recarregue a página.</p>';
    return;
  }
  Chart.defaults.color = getComputedStyle(document.body).color;
  $("#gbody").innerHTML =
    gt == "dash" ? gdash() : gt == "orc" ? gorc() : gvis();
  jobs.forEach((j) => j());
}
function gdash() {
  const C = DB.clientes.filter(
    (c) =>
      (!gf.v || c.vendedor == gf.v) &&
      (!gf.c || c.cidade == gf.c) &&
      (!gf.i || c.inservice == gf.i) &&
      (!gf.p || c.prioridade == gf.p),
  );
  if (!C.length) return '<p class="m">Nenhum cliente com esses filtros.</p>';
  const cap = (c) => sum(c.resfriadores || [], (r) => r.capacidade_l),
    kpi = (l, v) =>
      `<div class="kpi"><b>${fmt(v)}</b><small>${l}</small></div>`;
  const by = (f, v) =>
      topN(
        Object.entries(grp(C, f))
          .map(([k, a]) => [k, sum(a, v)])
          .sort((x, y) => y[1] - x[1]),
      ),
    reg = (c) => c.regiao || c.cidade;
  const prod = PROD.map(([k, l]) => {
    const a = C.filter((c) => c["p_" + k + "_marca"]);
    return pbox(
      `${l} (${a.filter((c) => c["p_" + k + "_nos"] == "Sim").length} de ${a.length} compram de nós)`,
      pairs(a, (c) => c["p_" + k + "_marca"]),
    );
  }).join("");
  const ret = C.map((c) => {
    const x = (c.visitas || [])
      .filter((x) => x.data || x.retorno)
      .sort((a, b) => ((a.data || "") < (b.data || "") ? -1 : 1))
      .pop();
    return x && x.retorno && [x.retorno, c.nome, c.cidade, c.vendedor];
  })
    .filter(Boolean)
    .sort();
  return (
    `<div class="kpis">${kpi("clientes", C.length)}${kpi(
      "vacas em ordenha",
      sum(C, (c) => c.animais_ordenha),
    )}${kpi(
      "conjuntos de ordenha",
      sum(C, (c) => c.unidades_ordenha),
    )}${kpi(
      "litros por dia",
      sum(C, (c) => c.producao_dia),
    )}${kpi("litros de resfriamento", sum(C, cap))}</div>` +
    `<div class="two">${pbox(
      "Marcas de ordenha",
      pairs(C, (c) => c.ord_marca),
    )}${pbox(
      "Vacas em ordenha por região",
      by(reg, (c) => c.animais_ordenha),
    )}${pbox(
      "Litros por dia por região",
      by(reg, (c) => c.producao_dia),
    )}${pbox("Resfriamento instalado (L) por região", by(reg, cap))}${pbox(
      "Clientes por vendedor",
      pairs(C, (c) => c.vendedor),
    )}${pbox(
      "Prioridade",
      pairs(C, (c) => c.prioridade),
    )}${pbox(
      "InService",
      pairs(C, (c) => c.inservice),
    )}${pbox(
      "Perfil",
      pairs(C, (c) => c.perfil),
    )}${pbox(
      "Tipo de barracão",
      pairs(C, (c) => c.tipo_barracao),
    )}${pbox(
      "Tipo de equipamento",
      pairs(C, (c) => c.tipo_equipamento),
    )}${pbox(
      "Marcas de resfriador",
      pairs(
        C.flatMap((c) => c.resfriadores || []),
        (r) => r.marca,
      ),
    )}${pbox(
      "Marca do conjunto de ordenha",
      pairs(C, (c) => c.conjunto_marca),
    )}${prod}</div>` +
    box(
      "Retornos agendados",
      ret.length
        ? tbl(
            ["Retorno", "Cliente", "Cidade", "Vendedor"],
            ret.map((r) => [
              (r[0] < hoje() ? "⚠ atrasado · " : "") + br(r[0]),
              esc(r[1]),
              esc(r[2]),
              esc(r[3]),
            ]),
          )
        : '<p class="m">Nenhum retorno agendado.</p>',
    )
  );
}
function gvis() {
  const { v, de, ate } = gv;
  if (!de || !ate || de > ate)
    return '<p class="m">Informe um período válido (data inicial até data final).</p>';
  const days = [];
  for (
    const d = new Date(de + "T12:00"), e = new Date(ate + "T12:00");
    d <= e && days.length < 93;
    d.setDate(d.getDate() + 1)
  )
    days.push(d.toISOString().slice(0, 10));
  const by = Object.fromEntries(days.map((d) => [d, []])),
    WD = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  DB.clientes.forEach((c) =>
    (c.visitas || []).forEach((x) => {
      const w = x.vendedor || c.vendedor || "";
      if (by[x.data] && (!v || w == v))
        by[x.data].push(`${c.nome} (${c.cidade})` + (v || !w ? "" : " · " + w));
    }),
  );
  jobs.push(() =>
    charts.push(
      new Chart($("#vc"), {
        type: "bar",
        data: {
          labels: days.map(
            (d) =>
              WD[new Date(d + "T12:00").getDay()] + " " + br(d).slice(0, 5),
          ),
          datasets: [
            {
              label: "Visitas",
              data: days.map((d) => by[d].length),
              backgroundColor: COL[0],
              borderRadius: 4,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          interaction: { mode: "index", intersect: false },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { precision: 0 },
              title: { display: true, text: "Visitas" },
            },
            x: { title: { display: true, text: "Data" } },
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: (i) => br(days[i[0].dataIndex]),
                label: (c) =>
                  c.parsed.y + (c.parsed.y == 1 ? " visita" : " visitas"),
                afterBody: (i) => by[days[i[0].dataIndex]],
              },
            },
          },
        },
      }),
    ),
  );
  return box(
    `Visitas${v ? " – " + esc(v) : ""}: ${sum(days, (d) => by[d].length)} no período`,
    `<div style="position:relative;height:340px"><canvas id="vc"></canvas></div><p class="m">Passe o mouse (ou toque) em uma barra para ver os clientes visitados no dia. Visita sem vendedor informado conta para o vendedor responsável pelo cliente.</p>`,
  );
}
