## 1. Phân tích lỗi

### Lỗi logic

Lỗi nằm ở đoạn mã:

```javascript
if (currentDrinkSize === "X") {
  break;
}
```

Trong nghiệp vụ của hệ thống, ký tự `"X"` đại diện cho **một ly nước bị hủy**. Khi gặp `"X"`, chương trình chỉ cần bỏ qua ly nước đó và tiếp tục kiểm tra các ly tiếp theo.

Tuy nhiên, từ khóa `break` lại có tác dụng **dừng hoàn toàn vòng lặp**. Vì vậy, khi chương trình quét đến `"X"`, toàn bộ các phần tử phía sau `"X"` sẽ không được xử lý.

### Nguyên nhân kỹ thuật

Với dữ liệu:

```javascript
const orderSizes = "MLXSM";
```

Chương trình xử lý theo thứ tự:

```text
M → tính tiền
L → tính tiền
X → gặp break → dừng vòng lặp
S → không được xử lý
M → không được xử lý
```

Điều này dẫn đến việc hệ thống bỏ sót các ly `"S"` và `"M"` phía sau mã hủy `"X"`, làm tổng tiền hóa đơn bị tính thiếu.

Để xử lý đúng nghiệp vụ, cần thay `break` bằng `continue`.

* `break`: dừng toàn bộ vòng lặp.
* `continue`: bỏ qua phần tử hiện tại và tiếp tục vòng lặp với phần tử tiếp theo.

Do đó, `"X"` chỉ làm bỏ qua ly nước hiện tại, không làm dừng quá trình quét hóa đơn.

---

## 2. Bảng Test Cases đối chứng

| Trường hợp kiểm thử          | Dữ liệu đầu vào        | Kết quả sai thực tế                                              | Kết quả đúng mong đợi                                                                      |
| ---------------------------- | ---------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| TC01 - Mã hủy nằm giữa chuỗi | `orderSizes = "MLXSM"` | Gặp `X` → `break` → chỉ xử lý `M`, `L`; bỏ sót `S`, `M` phía sau | Gặp `X` → bỏ qua ly bị hủy → tiếp tục xử lý `S`, `M`. Tổng tiền hóa đơn: **160.200 VNĐ**   |
| TC02 - Mã hủy nằm cuối chuỗi | `orderSizes = "MLSX"`  | Gặp `X` → `break` → dừng vòng lặp                                | X bị bỏ qua, các ly `M`, `L`, `S` đã được xử lý đầy đủ. Tổng tiền hóa đơn: **142.200 VNĐ** |

## 3. Kết luận

Nguyên nhân gây ra lỗi thất thoát doanh thu là sử dụng `break` không đúng với nghiệp vụ. `break` khiến vòng lặp dừng hoàn toàn khi gặp mã `"X"`.

Giải pháp là sử dụng `continue` để bỏ qua ly bị hủy và tiếp tục quét các ly còn lại trong chuỗi `orderSizes`.

Sau khi sửa, chương trình có thể xử lý đầy đủ các ly hợp lệ phía sau mã `"X"` và tính tổng hóa đơn chính xác.
