// Danh sách từ 1 đến 365, loại bỏ các số đã cho
let excludedNumbers = [348, 58, 197, 297, 118, 34, 304];

let numbers = Array.from({ length: 365 }, (_, i) => i + 1)
                   .filter(n => !excludedNumbers.includes(n));

let usedNumbers = JSON.parse(localStorage.getItem("usedNumbers")) || [];

// Cập nhật danh sách khi load trang
document.getElementById("usedNumbers").innerHTML = usedNumbers.join(", ");
document.getElementById("count").innerText = usedNumbers.length;
document.getElementById("excludedNumbers").innerHTML = excludedNumbers.join(", ");
document.getElementById("excludedCount").innerText = excludedNumbers.length;
document.getElementById("totalRolls").innerText = usedNumbers.length + excludedNumbers.length;

document.getElementById("rollButton").addEventListener("click", function() {
    if (numbers.length === 0) {
        alert("Tất cả các số hợp lệ đã được quay!");
        return;
    }

    // Lấy số ngẫu nhiên từ danh sách hợp lệ
    let randomIndex = Math.floor(Math.random() * numbers.length);
    let randomNumber = numbers[randomIndex];

    // Hiển thị kết quả
    document.getElementById("result").innerHTML = `Số được chọn: <span>${randomNumber}</span>`;

    // Di chuyển số đã quay vào danh sách đã sử dụng
    usedNumbers.push(randomNumber);
    numbers.splice(randomIndex, 1);

    // Lưu vào localStorage
    localStorage.setItem("usedNumbers", JSON.stringify(usedNumbers));

    document.getElementById("usedNumbers").innerHTML = usedNumbers.join(", ");
    document.getElementById("count").innerText = usedNumbers.length;
    document.getElementById("totalRolls").innerText = usedNumbers.length + excludedNumbers.length;
});

document.getElementById("resetButton").addEventListener("click", function() {
    numbers = Array.from({ length: 365 }, (_, i) => i + 1)
                   .filter(n => !excludedNumbers.includes(n));
    usedNumbers = [];
    localStorage.setItem("usedNumbers", JSON.stringify(usedNumbers));

    document.getElementById("result").innerHTML = "Số được chọn: <span>-</span>";
    document.getElementById("usedNumbers").innerHTML = "";
    document.getElementById("count").innerText = usedNumbers.length;
    document.getElementById("totalRolls").innerText = usedNumbers.length + excludedNumbers.length;
});
