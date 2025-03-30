// Mini Quadrantes (Taufic)

const miniQuadrantes = {
    1: [1, 2, 11, 12],
    2: [3, 4, 13, 14],
    3: [5, 6, 15, 16],
    4: [7, 8, 17, 18],
    5: [9, 10, 19, 20],
    6: [21, 22, 31, 32],
    7: [23, 24, 33, 34],
    8: [25, 26, 35, 36],
    9: [27, 28, 37, 38],
    10: [29, 30, 39, 40],
    11: [41, 42, 51, 52],
    12: [43, 44, 53, 54],
    13: [45, 46, 55, 56],
    14: [47, 48, 57, 58],
    15: [49, 50, 59, 60]
};

function exibirMiniQuadrantes() {
    const container = document.getElementById('miniQuadrantes');
    
    for (let i = 1; i <= 15; i++) {
        const div = document.createElement('div');
        div.classList.add('miniQuadrante');
        div.innerHTML = `<h3>Mini Quadrante ${i}</h3><p>Dezenas: ${miniQuadrantes[i].join(', ')}</p>`;
        container.appendChild(div);
    }
}

exibirMiniQuadrantes();

