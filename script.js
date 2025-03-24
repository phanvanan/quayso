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

// Kiểm tra xem đã có dữ liệu trong localStorage chưa
let storedNumbers = localStorage.getItem('numbersGiven');
let storedTotal = localStorage.getItem('updatedTotal');

// Nếu có, khôi phục từ localStorage
let updatedNumbers = storedNumbers ? JSON.parse(storedNumbers) : Array.from(new Set(numbersGiven.concat(newNumbers)));
let updatedTotal = storedTotal ? parseInt(storedTotal) : updatedNumbers.reduce((sum, num) => sum + num, 0);

// Cập nhật giao diện
function updateUsedNumbersDisplay() {
    const usedNumbersDiv = document.getElementById('usedNumbers');
    usedNumbersDiv.innerHTML = updatedNumbers.join(', ');
}

function updateStats() {
    const excludedNumbers = [...Array(365).keys()].map(n => n + 1).filter(n => !updatedNumbers.includes(n));

    document.getElementById('count').textContent = updatedNumbers.length;
    document.getElementById('excludedNumbers').innerHTML = excludedNumbers.join(', ');
    document.getElementById('totalRolls').textContent = updatedNumbers.length;

    const totalInVND = (updatedTotal * 1000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    document.getElementById('totalSum').textContent = totalInVND;
}

window.onload = function() {
    updateUsedNumbersDisplay();
    updateStats();
};

// Xử lý quay số
document.getElementById('rollButton').addEventListener('click', function() {
    let rolledNumber;

    do {
        rolledNumber = Math.floor(Math.random() * 365) + 1;
    } while (updatedNumbers.includes(rolledNumber));

    document.getElementById('result').innerHTML = `Số được chọn: <span>${rolledNumber}</span>`;

    updatedNumbers.push(rolledNumber);
    updatedTotal += rolledNumber;

    // Lưu lại vào localStorage
    localStorage.setItem('numbersGiven', JSON.stringify(updatedNumbers));
    localStorage.setItem('updatedTotal', updatedTotal);

    updateUsedNumbersDisplay();
    updateStats();
});

// Nút "Reset"
document.getElementById('resetButton').addEventListener('click', function() {
    updatedNumbers = Array.from(new Set(numbersGiven.concat(newNumbers)));
    updatedTotal = updatedNumbers.reduce((sum, num) => sum + num, 0);

    // Xóa localStorage
    localStorage.removeItem('numbersGiven');
    localStorage.removeItem('updatedTotal');

    updateUsedNumbersDisplay();
    updateStats();
    document.getElementById('result').innerHTML = 'Số được chọn: <span>-</span>';
});
