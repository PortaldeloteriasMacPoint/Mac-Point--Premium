const resultados = [
  { concurso: 2862, dezenas: [2, 4, 14, 18, 22, 44] },
  { concurso: 2861, dezenas: [2, 21, 27, 46, 51, 53] },
  { concurso: 2860, dezenas: [2, 5, 17, 24, 38, 57] },
  { concurso: 2859, dezenas: [7, 8, 15, 17, 20, 51] },
  { concurso: 2858, dezenas: [8, 18, 27, 28, 48, 52] },
  { concurso: 2857, dezenas: [2, 18, 28, 38, 41, 50] },
  { concurso: 2856, dezenas: [3, 5, 10, 27, 38, 48] },
  { concurso: 2855, dezenas: [12, 16, 24, 31, 51, 55] },
  { concurso: 2854, dezenas: [2, 13, 16, 31, 44, 55] },
  { concurso: 2853, dezenas: [4, 18, 23, 48, 53, 56] }
];

function analisar() {
  const qtd = parseInt(document.getElementById('quantidade').value);
  const tipo = document.getElementById('tipo').value;
  const selecionados = resultados.slice(0, qtd);

  document.getElementById("loading").style.display = "block";
  document.getElementById("resultado").style.display = "none";

  setTimeout(() => {
    const analise = gerarAnalise(selecionados, tipo);
    document.getElementById("loading").style.display = "none";
    document.getElementById("resultado").innerHTML = analise;
    document.getElementById("resultado").style.display = "block";
  }, 1000);
}

function gerarAnalise(concursos, tipo) {
  const grupos = {
    linhas: [
      [1, 10],
      [11, 20],
      [21, 30],
      [31, 40],
      [41, 50],
      [51, 60]
    ],
    semilinhas: [
      [1, 5],
      [6, 10],
      [11, 15],
      [16, 20],
      [21, 25],
      [26, 30],
      [31, 35],
      [36, 40],
      [41, 45],
      [46, 50],
      [51, 55],
      [56, 60]
    ]
  };

  const atraso = Array(grupos[tipo].length).fill(0);
  const frequencia = Array(grupos[tipo].length).fill(0);
  const ultimasSaidas = Array(grupos[tipo].length).fill(null);

  for (let i = 0; i < concursos.length; i++) {
    const dezenas = concursos[i].dezenas;
    grupos[tipo].forEach((faixa, index) => {
      if (dezenas.some(d => d >= faixa[0] && d <= faixa[1])) {
        frequencia[index]++;
        if (!ultimasSaidas[index]) {
          ultimasSaidas[index] = concursos[i].concurso;
        }
      } else if (!ultimasSaidas[index]) {
        atraso[index]++;
      }
    });
  }

  let html = `<h2>Relatório de ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h2>`;
  html += `<table style="width:100%; text-align:left;">`;
  html += `<tr><th>Grupo</th><th>Atraso</th><th>Frequência</th><th>Última Saída</th></tr>`;
  grupos[tipo].forEach((faixa, i) => {
    html += `<tr>
      <td>${faixa[0]} a ${faixa[1]}</td>
      <td>${atraso[i]}</td>
      <td>${frequencia[i]}</td>
      <td>${ultimasSaidas[i] || 'Sem saída'}</td>
    </tr>`;
  });
  html += `</table>`;
  return html;
}
