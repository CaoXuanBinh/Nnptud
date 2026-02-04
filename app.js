// ===== Câu 1: Constructor Product =====
function Product(id, name, price, quantity, category, isAvailable) {
  this.id = id;
  this.name = name;
  this.price = Number(price);
  this.quantity = Number(quantity);
  this.category = category;
  this.isAvailable = Boolean(isAvailable);
}

// ===== State =====
let products = [];

// ===== DOM =====
const tbody = document.getElementById("tbody");
const resultEl = document.getElementById("result");

const form = document.getElementById("productForm");
const resetBtn = document.getElementById("resetBtn");
const seedBtn = document.getElementById("seedBtn");
const clearProductsBtn = document.getElementById("clearProducts");
const clearOutBtn = document.getElementById("clearOut");

// Inputs
const idEl = document.getElementById("id");
const nameEl = document.getElementById("name");
const priceEl = document.getElementById("price");
const quantityEl = document.getElementById("quantity");
const categoryEl = document.getElementById("category");
const isAvailableEl = document.getElementById("isAvailable");

// ===== Helpers =====
function money(v) {
  return Number(v).toLocaleString("vi-VN");
}

function log(title, data) {
  const text = typeof data === "string" ? data : JSON.stringify(data, null, 2);
  resultEl.textContent = `👉 ${title}\n\n${text}`;
}

function render() {
  tbody.innerHTML = "";
  products.forEach((p, idx) => {
    const tr = document.createElement("tr");

    const badge = p.isAvailable
      ? `<span class="badge ok">true</span>`
      : `<span class="badge no">false</span>`;

    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${money(p.price)}</td>
      <td>${p.quantity}</td>
      <td>${p.category}</td>
      <td>${badge}</td>
      <td>
        <button class="btn small danger" data-del="${p.id}">Xoá</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // bind delete
  tbody.querySelectorAll("button[data-del]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-del");
      products = products.filter(p => p.id !== id);
      render();
      log("Đã xoá sản phẩm", { id, total: products.length });
    });
  });
}

// ===== Câu 2: Seed data (>=6, >=2 danh mục) =====
function seedData() {
  products = [
    new Product("P001", "iPhone 15 Pro Max", 34990000, 5, "Phone", true),
    new Product("P002", "Samsung S24 Ultra", 32990000, 0, "Phone", true),
    new Product("P003", "MacBook Pro M3", 45990000, 3, "Laptop", true),
    new Product("P004", "AirPods Pro 2", 5990000, 20, "Accessories", true),
    new Product("P005", "Sạc Anker 65W", 890000, 0, "Accessories", false),
    new Product("P006", "Dell XPS 13", 38990000, 2, "Laptop", true),
  ];
  render();
  log("Đã nạp dữ liệu mẫu (Câu 2)", products);
}

// ===== Events =====
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = idEl.value.trim();
  const name = nameEl.value.trim();
  const price = Number(priceEl.value);
  const quantity = Number(quantityEl.value);
  const category = categoryEl.value;
  const isAvailable = isAvailableEl.value === "true";

  // check trùng id
  if (products.some(p => p.id === id)) {
    log("Lỗi", "ID bị trùng. Vui lòng nhập id khác!");
    return;
  }

  const p = new Product(id, name, price, quantity, category, isAvailable);
  products.push(p);

  render();
  log("Đã thêm sản phẩm", p);
  form.reset();
  categoryEl.value = "Phone";
  isAvailableEl.value = "true";
});

resetBtn.addEventListener("click", () => {
  form.reset();
  categoryEl.value = "Phone";
  isAvailableEl.value = "true";
});

seedBtn.addEventListener("click", seedData);

clearProductsBtn.addEventListener("click", () => {
  products = [];
  render();
  log("Đã xoá tất cả sản phẩm", { total: 0 });
});

clearOutBtn.addEventListener("click", () => {
  resultEl.textContent = "";
});

// ===== Buttons for Q3-Q10 =====
document.querySelectorAll("button[data-action]").forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.getAttribute("data-action");

    if (products.length === 0) {
      log("Thông báo", "Chưa có sản phẩm. Bấm 'Nạp dữ liệu mẫu' hoặc thêm sản phẩm trước.");
      return;
    }

    switch (action) {
      // Câu 3
      case "q3": {
        const arr = products.map(p => ({ name: p.name, price: p.price }));
        log("Câu 3: Mảng mới chỉ chứa name, price", arr);
        break;
      }

      // Câu 4
      case "q4": {
        const arr = products.filter(p => p.quantity > 0);
        log("Câu 4: Sản phẩm còn hàng (quantity > 0)", arr);
        break;
      }

      // Câu 5
      case "q5": {
        const ok = products.some(p => p.price > 30000000);
        log("Câu 5: Có ít nhất 1 sản phẩm giá > 30.000.000?", ok);
        break;
      }

      // Câu 6
      case "q6": {
        const accessories = products.filter(p => p.category === "Accessories");
        const ok = accessories.length > 0 && accessories.every(p => p.isAvailable === true);
        log("Câu 6: Tất cả Accessories có isAvailable=true?", {
          accessoriesCount: accessories.length,
          result: ok
        });
        break;
      }

      // Câu 7
      case "q7": {
        const total = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
        log("Câu 7: Tổng giá trị kho (price * quantity)", `${money(total)} VND`);
        break;
      }

      // Câu 8
      case "q8": {
        const lines = [];
        for (const p of products) {
          const status = p.isAvailable ? "Đang bán" : "Ngừng bán";
          lines.push(`${p.name} - ${p.category} - ${status}`);
        }
        log("Câu 8: for...of in Tên - Danh mục - Trạng thái", lines.join("\n"));
        break;
      }

      // Câu 9
      case "q9": {
        const obj = products[0];
        const lines = [];
        for (const key in obj) {
          lines.push(`${key}: ${obj[key]}`);
        }
        log("Câu 9: for...in (in tên thuộc tính + giá trị) - sản phẩm đầu", lines.join("\n"));
        break;
      }

      // Câu 10
      case "q10": {
        const names = products
          .filter(p => p.isAvailable === true && p.quantity > 0)
          .map(p => p.name);
        log("Câu 10: Tên sản phẩm đang bán và còn hàng", names);
        break;
      }

      default:
        log("Lỗi", "Không xác định hành động");
    }
  });
});

// Init
seedData();
