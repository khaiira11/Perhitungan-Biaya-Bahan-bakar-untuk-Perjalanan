function hitungBiaya() {
    let jarak = parseFloat(document.getElementById("jarak").value);
    let kecepatan = parseFloat(document.getElementById("kecepatan").value);
    let harga = parseFloat(document.getElementById("harga").value);

    if (isNaN(jarak) || isNaN(kecepatan) || isNaN(harga) || jarak <= 0 || kecepatan <= 0 || harga <= 0) {
        alert("Harap masukkan nilai yang valid!");
        return;
    }

    // Fungsi konsumsi bahan bakar: f(v) = ln(v) + 5v
    let konsumsiBbm = Math.log(Math.abs(kecepatan)) + 5 * kecepatan;
    let totalBbm = konsumsiBbm * jarak / 100;
    let totalBiaya = totalBbm * harga;

    document.getElementById("hasil").innerHTML = `Total bahan bakar: ${totalBbm.toFixed(2)} liter<br>Total biaya: Rp${totalBiaya.toFixed(2)}`;
    buatGrafik();
     // Tampilkan penjelasan grafik
    document.getElementById("penjelasanGrafik").style.display = "block";
}

function buatGrafik() {
    let ctx = document.getElementById("grafik").getContext("2d");

    let dataKecepatan = [];
    let dataKonsumsi = [];
    for (let v = 40; v <= 120; v += 10) {
        let konsumsi = Math.log(Math.abs(v)) + 5 * v;
        dataKecepatan.push(v);
        dataKonsumsi.push(konsumsi);
    }

    // Hapus grafik lama jika ada
    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: dataKecepatan,
            datasets: [{
                label: "Konsumsi Bahan Bakar (liter per 100 km)",
                data: dataKonsumsi,
                borderColor: "blue",
                fill: false,
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Kecepatan (km/jam)"
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Konsumsi Bahan Bakar (liter per 100 km)"
                    },
                    suggestedMin: 0,
                    suggestedMax: Math.max(...dataKonsumsi) + 50
                }
            }
        }
    });
}

function toggleInfo() {
    const modal = document.getElementById("infoModal");
    modal.style.display = (modal.style.display === "block") ? "none" : "block";
}

window.onclick = function(event) {
    const modal = document.getElementById("infoModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
