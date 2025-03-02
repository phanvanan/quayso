document.addEventListener("DOMContentLoaded", function() {
    let excludedNumbers = [348, 58, 197, 297, 118, 34, 304];
    let usedNumbers = JSON.parse(localStorage.getItem("usedNumbers")) || [];
    let numbers = Array.from({ length: 365 }, (_, i) => i + 1)
                       .filter(n => !excludedNumbers.includes(n) && !usedNumbers.includes(n));

    function hasDuplicates(array) {
        return new Set(array).size !== array.length;
    }

    if (hasDuplicates(excludedNumbers)) {
        alert("Danh sách loại trừ có số trùng lặp!");
    }

    const usedNumbersElem = document.getElementById("usedNumbers");
    const countElem = document.getElementById("count");
    const excludedNumbersElem = document.getElementById("excludedNumbers");
    const totalRollsElem = document.getElementById("totalRolls");

    if (!usedNumbersElem || !countElem || !excludedNumbersElem || !totalRollsElem) {
        console.error("Một hoặc nhiều phần tử DOM không tồn tại.");
        return;
    }

    usedNumbersElem.innerHTML = usedNumbers.join(", ");
    countElem.innerText = usedNumbers.length;
    excludedNumbersElem.innerHTML = excludedNumbers.join(", ");
    totalRollsElem.innerText = usedNumbers.length + excludedNumbers.length;

    function rollNumber() {
        if (numbers.length === 0) {
            alert("Tất cả các số hợp lệ đã được quay!");
            return;
        }

        let randomIndex = Math.floor(Math.random() * numbers.length);
        let randomNumber = numbers[randomIndex];

        // Kiểm tra và quay số mới nếu trùng lặp
        while (usedNumbers.includes(randomNumber) || excludedNumbers.includes(randomNumber)) {
            randomIndex = Math.floor(Math.random() * numbers.length);
            randomNumber = numbers[randomIndex];
        }

        document.getElementById("result").innerHTML = `Số được chọn: <span>${randomNumber}</span>`;
        usedNumbers.push(randomNumber);
        numbers = numbers.filter(num => num !== randomNumber);

        localStorage.setItem("usedNumbers", JSON.stringify(usedNumbers));
        usedNumbersElem.innerHTML = usedNumbers.join(", ");
        countElem.innerText = usedNumbers.length;
        totalRollsElem.innerText = usedNumbers.length + excludedNumbers.length;
    }

    document.getElementById("rollButton").addEventListener("click", rollNumber);

    document.getElementById("resetButton").addEventListener("click", function() {
        usedNumbers = [];
        localStorage.setItem("usedNumbers", JSON.stringify(usedNumbers));
        numbers = Array.from({ length: 365 }, (_, i) => i + 1)
                       .filter(n => !excludedNumbers.includes(n));

        document.getElementById("result").innerHTML = "Số được chọn: <span>-</span>";
        usedNumbersElem.innerHTML = "";
        countElem.innerText = usedNumbers.length;
        totalRollsElem.innerText = usedNumbers.length + excludedNumbers.length;
    });
});
