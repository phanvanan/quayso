// Dãy số đã quay hiện tại
let numbersGiven = [
    20, 28, 32, 34, 36, 44, 84, 87, 89, 97, 99, 115, 130, 133, 135, 140, 147, 157, 158,
    162, 166, 174, 175, 187, 194, 203, 204, 209, 212, 223, 228, 231, 233, 238, 254, 255, 265, 271,
    283, 287, 290, 299, 300, 306, 311, 314, 317, 326, 327, 350, 362, 365
];

// Dãy số mới cần thêm vào
const newNumbers = [
    20, 28, 32, 34, 36, 44, 84, 87, 89, 97, 99, 115, 130, 133, 135, 140, 147, 157, 158,
    162, 166, 174, 175, 187, 194, 203, 204, 209, 212, 223, 228, 231, 233, 238, 254, 255, 265, 271,
    283, 287, 290, 299, 300, 306, 311, 314, 317, 326, 327, 350, 362, 365
];

// Kết hợp số đã quay và số mới, sau đó loại bỏ các số trùng
let updatedNumbers = Array.from(new Set(numbersGiven.concat(newNumbers)));

// Tính tổng các số sau khi thêm mới (chỉ tính các số đã quay mà không nhân với 1000)
let updatedTotal = updatedNumbers.reduce((sum, num) => sum + num, 0);

// Cập nhật giao diện
function updateUsedNumbersDisplay() {
    const usedNumbersDiv = document.getElementById('usedNumbers');
    // Hiển thị các số đã quay
    usedNumbersDiv.innerHTML = updatedNumbers.join(', ');
}

function updateStats() {
    const excludedNumbers = [...Array(365).keys()].map(n => n + 1).filter(n => !updatedNumbers.includes(n));

    document.getElementById('count').textContent = updatedNumbers.length;
    document.getElementById('excludedNumbers').innerHTML = excludedNumbers.join(', ');
    document.getElementById('totalRolls').textContent = updatedNumbers.length;

    // Tính tổng các số đã quay mà không nhân với 1000
    const totalInVND = (updatedTotal * 1000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    document.getElementById('totalSum').textContent = totalInVND;
}

// Cập nhật giao diện khi trang tải
window.onload = function() {
    updateUsedNumbersDisplay();
    updateStats();
};

// Xử lý quay số
document.getElementById('rollButton').addEventListener('click', function() {
    let rolledNumber;
    
    // Quay số cho đến khi không trùng
    do {
        rolledNumber = Math.floor(Math.random() * 365) + 1;
    } while (updatedNumbers.includes(rolledNumber)); // Kiểm tra số đã quay

    document.getElementById('result').innerHTML = `Số được chọn: <span>${rolledNumber}</span>`;

    // Lưu số đã quay vào danh sách
    updatedNumbers.push(rolledNumber);
    updatedTotal += rolledNumber; // Cộng số mới vào tổng

    // Cập nhật giao diện
    updateUsedNumbersDisplay();
    updateStats();
});

// Nút "Reset"
document.getElementById('resetButton').addEventListener('click', function() {
    updatedNumbers = Array.from(new Set(numbersGiven.concat(newNumbers))); // Khôi phục lại danh sách ban đầu
    updatedTotal = updatedNumbers.reduce((sum, num) => sum + num, 0); // Cập nhật lại tổng
    updateUsedNumbersDisplay();
    updateStats();
    document.getElementById('result').innerHTML = 'Số được chọn: <span>-</span>';
});
