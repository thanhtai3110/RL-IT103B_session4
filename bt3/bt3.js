// Bảng giá
const prices = {
    S: 35000,
    M: 42000,
    L: 48000,
    T: 10000,
    X: 0
};

// Chuỗi món ăn của từng bàn
const tables = [
    "MLT",   // Bàn 1
    "SSX",   // Bàn 2
    "LLTT"   // Bàn 3
];

let totalRevenue = 0;

// Vòng lặp ngoài: duyệt từng bàn
for (let i = 0; i < tables.length; i++) {

    let tableTotal = 0;
    const order = tables[i];

    console.log(`\n===== HÓA ĐƠN BÀN ${i + 1} =====`);

    // Vòng lặp trong: duyệt từng món
    for (let j = 0; j < order.length; j++) {

        const item = order[j];

        // Bỏ qua món hủy
        if (item === "X") {
            continue;
        }

        tableTotal += prices[item];

        console.log(
            `Món ${item}: ${prices[item].toLocaleString()} VNĐ`
        );
    }

    // Giảm 10% nếu hóa đơn trên 100.000
    let discount = 0;

    if (tableTotal > 100000) {
        discount = tableTotal * 0.1;
    }

    const finalTotal = tableTotal - discount;

    console.log(`Tạm tính: ${tableTotal.toLocaleString()} VNĐ`);
    console.log(`Giảm giá: ${discount.toLocaleString()} VNĐ`);
    console.log(`Thực thu: ${finalTotal.toLocaleString()} VNĐ`);

    // Cộng doanh thu bàn vào tổng doanh thu
    totalRevenue += finalTotal;
}

// Tổng doanh thu cuối ca
console.log("\n===== TỔNG KẾT CUỐI CA =====");
console.log(
    `Tổng doanh thu: ${totalRevenue.toLocaleString()} VNĐ`
);