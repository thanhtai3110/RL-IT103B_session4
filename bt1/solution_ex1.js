
// ==========================================
// SỬA 2 LỖI LOGIC
// ==========================================
//
// Lỗi 1: Điều kiện vòng lặp dùng cupIndex < orderQuantity
// khiến chương trình chỉ tính 2 ly khi khách mua 3 ly.
// Sửa thành cupIndex <= orderQuantity để tính đủ số lượng.
//
// Lỗi 2: Giảm giá được đặt bên trong vòng lặp khiến hóa đơn
// bị giảm 10% nhiều lần. Đưa phần giảm giá ra ngoài vòng lặp
// để chỉ áp dụng một lần cho tổng hóa đơn.
// ==========================================

// He thong POS quay thu ngan Highlands Coffee
const drinkName = "Phin Sữa Đá";
const basePrice = 29000;
const drinkSize = "M";
const toppingsPerCup = 2;
const orderQuantity = 3;
const isGoldMember = true;
const toppingPrice = 8000;

let sizeUpcharge = 0;

if (drinkSize === "M") {
    sizeUpcharge = 6000;
} else if (drinkSize === "L") {
    sizeUpcharge = 10000;
}

// Tính tiền 1 ly hoàn chỉnh
const singleCupPrice = basePrice + sizeUpcharge + (toppingsPerCup * toppingPrice);

let totalBill = 0;

// Tính đủ số lượng ly trong đơn hàng
for (let cupIndex = 1; cupIndex <= orderQuantity; cupIndex++) {
    totalBill += singleCupPrice;
}

// Áp dụng giảm giá Gold một lần cho toàn bộ hóa đơn
if (isGoldMember) {
    totalBill = totalBill * 0.9;
}

console.log("Tên đồ uống:", drinkName);
console.log("Số lượng:", orderQuantity);
console.log("Giá 1 ly:", singleCupPrice, "VNĐ");
console.log("Tổng thanh toán:", totalBill, "VNĐ");

