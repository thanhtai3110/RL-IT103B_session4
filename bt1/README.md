# 1. Phân tích lỗi

## Lỗi 1: Lỗi Off-by-one trong vòng lặp `for`

Dòng code bị lỗi:

```javascript
for (let cupIndex = 1; cupIndex < orderQuantity; cupIndex++) {
```

Với:

```javascript
const orderQuantity = 3;
```

Điều kiện `cupIndex < orderQuantity` khiến vòng lặp chỉ thực hiện khi:

* `cupIndex = 1` → tính ly thứ 1
* `cupIndex = 2` → tính ly thứ 2
* `cupIndex = 3` → điều kiện `3 < 3` sai → dừng vòng lặp

Do đó, chương trình chỉ tính **2 ly thay vì 3 ly**.

### Nguyên nhân kỹ thuật

Đây là lỗi **Off-by-one Error**, xảy ra do điều kiện giới hạn của vòng lặp bị thiếu một lần lặp.

### Cách sửa

Đổi:

```javascript
cupIndex < orderQuantity
```

thành:

```javascript
cupIndex <= orderQuantity
```

Khi đó vòng lặp sẽ thực hiện đủ 3 lần tương ứng với 3 ly.

---

## Lỗi 2: Áp dụng chiết khấu nhiều lần

Đoạn code bị lỗi:

```javascript
for (let cupIndex = 1; cupIndex < orderQuantity; cupIndex++) {
  totalBill += singleCupPrice;

  if (isGoldMember) {
    totalBill = totalBill * 0.9;
  }
}
```

Điều kiện giảm giá được đặt **bên trong vòng lặp**.

Với khách hàng Gold mua 3 ly, chương trình tính:

```text
Lần 1:
0 + 51.000 = 51.000
51.000 × 90% = 45.900

Lần 2:
45.900 + 51.000 = 96.900
96.900 × 90% = 87.210
```

Như vậy, khoản giảm 10% được áp dụng **nhiều lần**, thay vì chỉ giảm 10% trên tổng hóa đơn.

### Nguyên nhân kỹ thuật

Phạm vi xử lý chiết khấu được đặt sai. Vòng lặp có nhiệm vụ tính tổng tiền các ly, còn chiết khấu phải được tính **sau khi đã hoàn thành việc cộng tổng tiền**.

### Cách sửa

Đưa phần giảm giá ra ngoài vòng lặp:

```javascript
for (let cupIndex = 1; cupIndex <= orderQuantity; cupIndex++) {
  totalBill += singleCupPrice;
}

if (isGoldMember) {
  totalBill = totalBill * 0.9;
}
```

Khi đó, toàn bộ hóa đơn chỉ được giảm **10% đúng một lần**.

---

# 2. Bảng Test Cases đối chứng

| Trường hợp kiểm thử               | Dữ liệu đầu vào                                                                      |                                Kết quả sai thực tế | Kết quả đúng mong đợi |
| --------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------: | --------------------: |
| TC01 – Thành viên Gold mua 3 ly   | `orderQuantity = 3`, `isGoldMember = true`, `drinkSize = "M"`, `toppingsPerCup = 2`  | `87.210 VNĐ` – chỉ tính 2 ly và giảm giá nhiều lần |         `137.700 VNĐ` |
| TC02 – Khách hàng thường mua 3 ly | `orderQuantity = 3`, `isGoldMember = false`, `drinkSize = "M"`, `toppingsPerCup = 2` |                      `102.000 VNĐ` – chỉ tính 2 ly |         `153.000 VNĐ` |

## Cơ sở tính toán

Giá một ly:

```text
Giá cơ bản = 29.000 VNĐ
Phụ thu size M = 6.000 VNĐ
2 topping = 2 × 8.000 = 16.000 VNĐ

Giá 1 ly = 29.000 + 6.000 + 16.000
         = 51.000 VNĐ
```

Với 3 ly:

```text
51.000 × 3 = 153.000 VNĐ
```

Với thành viên Gold:

```text
153.000 × 90% = 137.700 VNĐ
```

Vì vậy:

* **TC01:** kết quả đúng là `137.700 VNĐ`.
* **TC02:** kết quả đúng là `153.000 VNĐ`.
