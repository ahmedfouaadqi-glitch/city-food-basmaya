import "./style.css";

(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) s(a);
  new MutationObserver((a) => {
    for (const n of a)
      if (n.type === "childList")
        for (const l of n.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && s(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(a) {
    const n = {};
    return (
      a.integrity && (n.integrity = a.integrity),
      a.referrerPolicy && (n.referrerPolicy = a.referrerPolicy),
      a.crossOrigin === "use-credentials"
        ? (n.credentials = "include")
        : a.crossOrigin === "anonymous"
          ? (n.credentials = "omit")
          : (n.credentials = "same-origin"),
      n
    );
  }
  function s(a) {
    if (a.ep) return;
    a.ep = !0;
    const n = o(a);
    fetch(a.href, n);
  }
})();
const C = "https://jzecwobqowyuthqlhxuf.supabase.co",
  z = "sb_publishable_mu3zYBoBLcgjGcSQR7SX7g_o9PKCFHF",
  f = window.supabase.createClient(C, z),
  F = C + "/functions/v1/city-food-api",
  d = (e) => document.querySelector(e),
  u = (e) => new Intl.NumberFormat("en-US").format(Number(e) || 0) + " د.ع",
  r = (e) =>
    String(e ?? "").replace(
      /[&<>"']/g,
      (t) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[t],
    ),
  i = {
    cats: [],
    products: [],
    active: "all",
    query: "",
    cart: [],
    session: null,
    orders: JSON.parse(localStorage.getItem("cityfood-orders") || "[]"),
    address: JSON.parse(localStorage.getItem("cityfood-address") || "null"),
    settings: {},
    notifications: [],
  },
  y = {
    pending: "جديد",
    confirmed: "تم القبول",
    modified: "بانتظار موافقتك",
    preparing: "قيد التحضير",
    out_for_delivery: "خرج للتوصيل",
    delivered: "تم التسليم",
...[truncated]
    n = await a.json().catch(() => ({}));
  if (!a.ok) throw Error(n.error || "تعذر إكمال العملية");
  return n;
}
function c(e) {
  const t = d("#toast");
  t &&
    ((t.textContent = e),
    t.classList.add("show"),
    clearTimeout(c.t),
    (c.t = setTimeout(() => t.classList.remove("show"), 3200)));
}
const T = () =>
    '<a class="brand" href="/"><img src="/icon.svg" alt="ستي فود"><span><b>ستي فود</b><small>CITY FOOD · BASMAYA</small></span></a>',
  H = (e) => {
    var t;
    return (
      e.image_path ||
      h[(t = e.categories) == null ? void 0 : t.slug] ||
      h[e.category_slug] ||
      h.sandwiches
    );
  };
async function G() {
  const [e, t] = await Promise.all([
    f.from("categories").select("*").eq("is_active", !0).order("sort_order"),
    f
      .from("products")
      .select("*,categories(name_ar,slug)")
      .eq("is_available", !0)
      .order("sort_order"),
  ]);
  if (e.error || t.error) throw Error("تعذر تحميل قائمة الطعام");
  ((i.cats = e.data || []), (i.products = t.data || []));
}
const L = () => i.cart.reduce((e, t) => e + t.price * t.qty, 0),
  w = () => Number(i.settings.delivery_fee_iqd ?? 1e3);
function _() {
  const e = i.cart.reduce((o, s) => o + s.qty, 0),
    t = d("#cart-count");
  t && (t.textContent = e);
}
function J(e) {
  var s;
  const t = ((s = e.categories) == null ? void 0 : s.slug) || "",
    o = H(e);
  return (
    '<article class="food-card"><div class="food-photo"><img src="' +
    r(o) +
    '" alt="' +
    r(e.name_ar) +
    `" loading="lazy" onerror="this.src='` +
    h.sandwiches +
    `'"><span class="photo-tag">` +
    (S[t] || "✦") +
    '</span></div><div class="food-info"><div class="food-title">' +
    r(e.name_ar) +
    '</div><div class="food-price"><b>' +
    u(e.price_iqd) +
    "</b>" +
    (e.large_price_iqd
      ? "<small>كبير " + u(e.large_price_iqd) + "</small>"
      : "") +
    '</div><div class="food-actions">' +
    (e.large_price_iqd
      ? '<button data-add="' +
        e.id +
        '" data-size="regular">عادي +</button><button class="secondary" data-add="' +
        e.id +
        '" data-size="large">كبير +</button>'
      : '<button data-add="' +
        e.id +
        '" data-size="regular">أضف للسلة +</button>') +
    "</div></div></article>"
  );
}
function O() {
  const e = d("#categories");
  if (!e) return;
  e.innerHTML =
    '<button class="cat-pill ' +
    (i.active === "all" ? "active" : "") +
    '" data-cat="all">الكل</button>' +
    i.cats
      .map(
        (o) =>
          '<button class="cat-pill ' +
          (i.active === o.slug ? "active" : "") +
          '" data-cat="' +
          r(o.slug) +
          '">' +
          (S[o.slug] || "•") +
          " " +
          r(o.name_ar) +
          "</button>",
    ...[truncated]      .map(
        (t) =>
          "<option " +
          (e.letter === t ? "selected" : "") +
          ">" +
          t +
          "</option>",
      )
      .join("") +
    '</select></div><div class="field"><label>رقم العمارة</label><input name="building" required value="' +
    r(e.building || "") +
    '" placeholder="12"></div><div class="field"><label>رقم الشقة</label><input name="apartment" required value="' +
    r(e.apartment || "") +
    '" placeholder="304"></div></div><label class="save-address"><input type="checkbox" name="remember" ' +
    (e.remember ? "checked" : "") +
    '><span><b>حفظ هذا العنوان كعنوان ثابت</b><small>سيظهر تلقائياً في طلباتك القادمة على هذا الجهاز</small></span><i>★</i></label><div class="field"><label>ملاحظة للمطعم (اختياري)</label><textarea name="note" rows="2" placeholder="علامة مميزة أو تفاصيل إضافية"></textarea></div><div class="checkout-total"><span>الإجمالي شامل التوصيل</span><b>' +
    u(L() + w()) +
    '</b></div><button class="solid-btn full" type="submit">تأكيد الطلب <span>✓</span></button><p class="modal-hint">الدفع عند الاستلام · سيتم إشعارك بكل تحديث على طلبك.</p></form></section></div>';
}
function B(e) {
  const t = { orderNumber: e.orderNumber, trackingToken: e.trackingToken };
  ((i.orders = [
    t,
    ...i.orders.filter((o) => o.orderNumber !== t.orderNumber),
  ].slice(0, 20)),
    localStorage.setItem("cityfood-orders", JSON.stringify(i.orders)),
    (d("#modal-root").innerHTML =
      '<div class="modal-backdrop"><section class="modal success"><div class="success-icon">✓</div><span class="eyebrow red-eye">تم استلام طلبك</span><h2>شكراً لاختيارك ستي فود</h2><p>طلبك رقم <b>#' +
      e.orderNumber +
      '</b> وصل إلى المطعم. سنرسل لك التحديثات عند تغيّر الحالة.</p><div class="checkout-total"><span>إجمالي الطلب</span><b>' +
      u(e.total) +
      '</b></div><button class="solid-btn full" id="track-order">متابعة الطلب</button><button class="text-btn" id="close-success">العودة للقائمة</button></secti...[truncated]    ({
      orders: "إدارة الطلبات",
      products: "الأصناف والأسعار",
      categories: "تصنيفات القائمة",
      notifications: "مركز الإشعارات",
      settings: "إعدادات المطعم",
    }[location.pathname.split("/")[2]] || "لوحة الإدارة") +
    '</h1></div><div class="admin-header-actions"><span class="live-dot">متصل</span><button class="outline-btn" id="logout">تسجيل الخروج</button></div></header><div id="admin-content"><div class="empty">جارٍ التحميل...</div></div></main></div><div id="modal-root"></div><div id="toast"></div>'
  );
}
function j(e = "") {
  ((d("#app").innerHTML =
    '<div class="login-screen"><section class="login-box"><img src="/icon.svg"><span class="eyebrow red-eye">CITY FOOD · ADMIN</span><h1>دخول الإدارة</h1><p>أدخل بيانات حساب المالك للوصول إلى لوحة التحكم.</p>' +
    (e ? '<div class="notice">' + r(e) + "</div>" : "") +
    '<form id="login-form"><div class="field"><label>البريد الإلكتروني</label><input name="email" type="email" required autocomplete="username"></div><div class="field"><label>كلمة المرور</label><input name="password" type="password" required autocomplete="current-password"></div><button class="solid-btn full">دخول آمن ←</button></form><small>الدخول متاح لحساب الإدارة المعتمد فقط.</small></section></div><div id="toast"></div>'),
    (d("#login-form").onsubmit = async (t) => {
      t.preventDefault();
      const o = new FormData(t.target);
      try {
        const s = await f.auth.signInWithPassword({
          email: o.get("email"),
          password: o.get("password"),
        });
        if (s.error) throw s.error;
        ((i.session = s.data.session),
          await m("admin/bootstrap", {}),
          location.reload());
      } catch (s) {
        c(s.message);
      }
    }));
}
async function Q() {
  const e = await f.auth.getSession();
  if (((i.session = e.data.session), !i.session)) {
    j();
    return;
  }
  try {
    await m("admin/bootstrap", {});
  } catch (t) {
    (await f.auth.signOut(), j(t.messa...[truncated]            ")</button>" +
            Object.entries(y)
              .map(
                ([a, n]) =>
                  '<button class="filter" data-filter="' +
                  a +
                  '">' +
                  n +
                  " (" +
                  i.adminOrders.filter((l) => l.status === a).length +
                  ")</button>",
              )
              .join("") +
            '</div><div id="orders-table">' +
            k(i.adminOrders) +
            "</div></section>"),
          t.querySelectorAll("[data-filter]").forEach(
            (a) =>
              (a.onclick = () => {
                (t
                  .querySelectorAll("[data-filter]")
                  .forEach((n) => n.classList.remove("active")),
                  a.classList.add("active"),
                  (d("#orders-table").innerHTML = k(
                    a.dataset.filter === "all"
                      ? i.adminOrders
                      : i.adminOrders.filter(
                          (n) => n.status === a.dataset.filter,
                        ),
                  )),
                  E());
              }),
          ),
          (d("#refresh-orders").onclick = v)),
      E());
    return;
  }
  if (e === "/admin/products") {
    const [o, s] = await Promise.all([
      m("admin/products", null, "GET"),
      m("admin/categories", null, "GET"),
    ]);
    ((i.products = o.products),
      (i.cats = s.categories),
      (t.innerHTML =
        '<section class="admin-panel"><div class="panel-title"><div><h2>قائمة الأصناف</h2><p>' +
        i.products.length +
        ' صنفاً مسجلاً · تحديث الأسعار والصور والتوفر</p></div><button class="solid-btn" id="new-product">+ إضافة صنف</button></div><div class="table-wrap"><table><thead><tr><th>الصنف</th><th>التصنيف</th><th>السعر</th><th>الحجم الكبير</th><th>التوفر</th><th></th></tr></thead><tbody>' +
        i.products
          .map((a) => {
            var n;
            return (
              '<tr><td><div ...[truncated]      s = await m("admin/settings", null, "GET");
    ((t.innerHTML =
      '<section class="admin-panel"><div class="panel-title"><div><h2>إشعارات الطلبات</h2><p>إشعارات الإدارة والعملاء حسب مرحلة الطلب</p></div><button class="outline-btn" id="refresh-notifs">تحديث</button></div><div class="notification-settings">' +
      s.notifications
        .map(
          (a) =>
            '<div class="notify-setting"><div><b>' +
            r(x[a.event_key] || a.event_key) +
            "</b><small>" +
            r(a.event_key) +
            '</small></div><label><input type="checkbox" data-event="' +
            a.event_key +
            '" data-field="customer_enabled" ' +
            (a.customer_enabled ? "checked" : "") +
            '> العميل</label><label><input type="checkbox" data-event="' +
            a.event_key +
            '" data-field="admin_enabled" ' +
            (a.admin_enabled ? "checked" : "") +
            '> الإدارة</label><label><input type="checkbox" data-event="' +
            a.event_key +
            '" data-field="channel_in_app" ' +
            (a.channel_in_app ? "checked" : "") +
            "> داخل التطبيق</label></div>",
        )
        .join("") +
      '</div><h3 class="subheading">آخر إشعارات الإدارة</h3><div class="admin-notifications">' +
      (o.notifications || [])
        .map(
          (a) =>
            "<div><b>" +
            r(a.title_ar) +
            "</b><p>" +
            r(a.body_ar) +
            "</p><small>" +
            new Date(a.created_at).toLocaleString("ar-IQ") +
            "</small>" +
            (a.is_read
              ? ""
              : '<button class="outline-btn mini" data-read="' +
                a.id +
                '">تمت القراءة</button>') +
            "</div>",
        )
        .join("") +
      "</div></section>"),
      (d("#refresh-notifs").onclick = v),
      t.querySelectorAll("[data-read]").forEach(
        (a) =>
          (a.onclick = async () => {
            (await m(
       ...[truncated]" data-qty="' +
          a.product_id +
          '"></div>',
      )
      .join("") +
    '</div><div class="field"><label>إضافة صنف</label><select id="add-mod-item"><option value="">اختر صنفاً</option>' +
    i.products
      .filter((a) => a.is_available)
      .map((a) => '<option value="' + a.id + '">' + r(a.name_ar) + "</option>")
      .join("") +
    '</select></div><div class="field"><label>سبب التعديل / ملاحظة</label><textarea id="mod-note" rows="2"></textarea></div><button class="solid-btn full" id="send-mod">إرسال التعديل للعميل</button></section></div>';
  let s = o.map((a) => ({
    productId: a.product_id,
    quantity: a.quantity,
    size: a.size_label === "كبير" ? "large" : "regular",
  }));
  ((d("#add-mod-item").onchange = (a) => {
    a.target.value &&
      (s.push({ productId: a.target.value, quantity: 1, size: "regular" }),
      (a.target.value = ""),
      c("أضيف الصنف للمقترح"));
  }),
    (d("#send-mod").onclick = async () => {
      s = s.map((a) => {
        const n = d('[data-qty="' + a.productId + '"]');
        return n ? { ...a, quantity: Number(n.value) } : a;
      });
      try {
        (await m(
          "admin/orders",
          {
            orderId: e,
            status: "modified",
            note: d("#mod-note").value,
            modification: { items: s },
          },
          "PATCH",
        ),
          c("تم إرسال التعديل للعميل"),
          (d("#modal-root").innerHTML = ""),
          await v());
      } catch (a) {
        c(a.message);
      }
    }));
}
function A(e = null) {
  const t = !!e;
  ((d("#modal-root").innerHTML =
    '<div class="modal-backdrop"><section class="modal"><div class="modal-heading"><h2>' +
    (t ? "تعديل صنف" : "إضافة صنف") +
    '</h2><button class="close-btn" id="close-modal">×</button></div><form id="product-form"><div class="field"><label>اسم الصنف</label><input name="name_ar" required value="' +
    r((e == null ? void 0 : e.name_ar) || "") +
    '"></div><div class="field"><label>التصنيف</label><select name="category_id" required>' +
    i.cats
      .map(
        (o) =>
          '<option value="' +
          o.id +
          '" ' +
          ((e == null ? void 0 : e.category_id) === o.id ? "selected" : "") +
          ">" +
          r(o.name_ar) +
          "</option>",
      )
      .join("") +
    '</select></div><div class="two-fields"><div class="field"><label>السعر العادي</label><input name="price_iqd" type="number" min="0" required value="' +
    ((e == null ? void 0 : e.price_iqd) ?? "") +
    '"></div><div class="field"><label>سعر الكبير</label><input name="large_price_iqd" type="number" min="0" value="' +
    ((e == null ? void 0 : e.large_price_iqd) ?? "") +
    '"></div></div><div class="field"><label>صورة الصنف</label><input name="image" type="file" accept="image/png,image/jpeg,image/webp"><input name="image_path" value="' +
    r((e == null ? void 0 : e.image_path) || "") +
    '" placeholder="رابط الصورة (اختياري)"></div><label class="save-address"><input name="is_available" type="checkbox" ' +
    ((e == null ? void 0 : e.is_available) !== !1 ? "checked" : "") +
    '><span><b>متاح للطلب</b></span></label><button class="solid-btn full">حفظ الصنف</button></form></section></div>'),
    (d("#product-form").onsubmit = async (o) => {
      o.preventDefault();
      const s = new FormData(o.target),
       ...[truncated]        (e.target.closest("#my-orders") ||
          e.target.closest("#my-orders-mobile")) &&
          K(),
        (e.target.closest("#customer-notifications") ||
          e.target.closest("#customer-notifications-mobile")) &&
          (i.orders[0] ? g(i.orders[0]) : c("لا توجد إشعارات أو طلبات بعد")),
        e.target.closest("#banner-order") &&
          document
            .querySelector("#menu")
            .scrollIntoView({ behavior: "smooth" }));
      const s = e.target.closest("[data-track]");
      if (s) {
        const l = i.orders.find(
          (p) => String(p.orderNumber) === s.dataset.track,
        );
        l && g(l);
      }
      const a = e.target.closest("[data-inc]"),
        n = e.target.closest("[data-dec]");
      if (a || n) {
        const l = (a || n).dataset.inc || (a || n).dataset.dec,
          p = i.cart.find((b) => b.key === l);
        p &&
          ((p.qty += a ? 1 : -1),
          p.qty < 1 && (i.cart = i.cart.filter((b) => b.key !== l)),
          N(),
          _());
      }
      if (e.target.closest("#approve-mod") || e.target.closest("#reject-mod")) {
        const l = !!e.target.closest("#approve-mod"),
          p = JSON.parse(d("#modal-root").dataset.order || "{}");
        try {
          (await m("respond-modification", { ...p, approve: l }),
            c(l ? "تم قبول التعديل" : "تم رفض التعديل"),
            g(p));
        } catch (b) {
          c(b.message);
        }
      }
    }),
    document.addEventListener("submit", async (e) => {
      if (e.target.id !== "checkout-form") return;
      e.preventDefault();
      const t = new FormData(e.target),
        o = {
          buildingLetter: t.get("letter"),
          buildingNumber: t.get("building"),
          apartmentNumber: t.get("apartment"),
        };
      t.get("remember")
        ? ((i.address = {
            name: t.get("name"),
            phone: t.get("phone"),
            letter: t.get("letter"),
            building: t.get("building"),
      ...[truncated]