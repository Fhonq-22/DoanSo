document.addEventListener("DOMContentLoaded", function () {
    const mucTieu = taoMucTieu();
    const soLanDoanMAX = 10;

    const soDoanInput = document.querySelector("#so_doan_input");
    const soDoanSubmit = document.querySelector("#so_doan_submit");
    const lichSuDoanTextarea = document.querySelector("#lichsu_doan");
    let lichSuDoan = "";
    let doanCount = 0;

    const soVuongs = document.querySelectorAll(".so_vuong");

    soVuongs.forEach((soVuong) => {
        soVuong.addEventListener("click", () => {
            if (doanCount >= soLanDoanMAX) {
                alert("Bạn đã hoàn thành "+soLanDoanMAX+" lần đoán.");
                return;
            }
            const so = soVuong.textContent;
            soDoanInput.value += so;
            soVuong.style.pointerEvents = "none";
            soVuong.disabled = true;
            soVuong.classList.add("disabled");
        });
    });

    soDoanSubmit.addEventListener("click", (event) => {
        if (doanCount >= soLanDoanMAX) {
            alert("Bạn đã hoàn thành "+soLanDoanMAX+" lần đoán.");
            soDoanSubmit.disabled = true;
            return;
        }

        const soDoan = soDoanInput.value;
        if (soDoan.length !== 4) {
            alert("Số đoán phải có 4 chữ số!");
            LamMoi();
            return;
        }

        doanCount++;

        var soChuSoDung = ChuSoDung(soDoan, mucTieu);
        var soChuSoDungViTri = ChuSoDungViTri(soDoan, mucTieu);

        lichSuDoan += `[${doanCount}]  ${soDoan} | ${soChuSoDung} | ${soChuSoDungViTri}\n`;
        lichSuDoanTextarea.value = lichSuDoan;

        document.getElementById("so_chu_so_dung").innerHTML = `<span>${soChuSoDung}</span>`;
        document.getElementById("so_chu_so_dung_vi_tri").innerHTML = `<span>${soChuSoDungViTri}</span>`;

        if (soChuSoDungViTri === 4) {
            document.getElementById("ket_qua").innerHTML = `<span style="color: green;">Bingo! Mục tiêu là: ${mucTieu}</span>`;
            soDoanSubmit.disabled = true;
        } else if (doanCount >= soLanDoanMAX) {
            document.getElementById("ket_qua").innerHTML = `<span style="color: red;">Bạn đã hết lượt đoán. Mục tiêu là: ${mucTieu}</span>`;
            soDoanSubmit.disabled = true;
        }

        LamMoi();
    });

    const xoaSoButton = document.querySelector("#xoa_so");
    xoaSoButton.addEventListener("click", () => {
        const currentInput = soDoanInput.value;
        
        // Kiểm tra xem có chữ số để xoá hay không
        if (currentInput.length > 0) {
            // Lấy chữ số cuối cùng và loại bỏ nó khỏi chuỗi
            const lastChar = currentInput.charAt(currentInput.length - 1);
            const updatedInput = currentInput.slice(0, -1);

            // Khôi phục phím tương ứng
            const correspondingButton = document.getElementById(`so_${lastChar}`);
            correspondingButton.style.pointerEvents = "auto";
            correspondingButton.disabled = false;
            correspondingButton.classList.remove("disabled");

            // Cập nhật giá trị trên input
            soDoanInput.value = updatedInput;
        }
    });


    function taoMucTieu() {
        let mucTieu;
        do {
            mucTieu = Math.floor(Math.random() * 9000 + 1000);
            const soChuSo = mucTieu.toString().split('');
            if (new Set(soChuSo).size === 4) {
                break;
            }
        } while (true);
        return mucTieu;
    }

    function ChuSoDung(soDoan, mucTieu) {
        const soChuSoDungStr = soDoan.split("");
        var soChuSoDung = 0;
        for (const so of soChuSoDungStr) {
            if (mucTieu.toString().includes(so)) {
                soChuSoDung++;
            }
        }
        return soChuSoDung;
    }

    function ChuSoDungViTri(soDoan, mucTieu) {
        var soChuSoDungViTri = 0;
        for (let i = 0; i < 4; i++) {
            if (soDoan[i] === mucTieu.toString()[i]) {
                soChuSoDungViTri++;
            }
        }
        return soChuSoDungViTri;
    }

    function LamMoi() {
        soVuongs.forEach((soVuong) => {
            soVuong.style.pointerEvents = "auto";
            soVuong.disabled = false;
            soVuong.classList.remove("disabled");
        });

        soDoanInput.value = "";
    }
});
