import React, { useState, useEffect } from "react";
import {
  Trash2,
  Plus,
  Minus,
  Download,
  CheckCircle,
  Edit2,
  Save,
  X,
  Settings,
  Calendar,
} from "lucide-react";

const App = () => {
  const [lang, setLang] = useState("sv");
  const [page, setPage] = useState("menu");
  const [adminTab, setAdminTab] = useState("orders");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedCampsite, setSelectedCampsite] = useState("all");
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({
    bread: [
      {
        id: 1,
        nameSv: "Frallor",
        nameEn: "Rolls",
        nameDe: "Brötchen",
        price: 5,
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCBmaWxsPSIjZjU5ZTBiIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI0MCIgZm9udC13ZWlnaHQ9ImJvbGQiPkZyYWxsb3I8L3RleHQ+PC9zdmc+",
        allergens: ["Gluten", "Mjölk"],
      },
      {
        id: 2,
        nameSv: "Surdegsbröd",
        nameEn: "Sourdough",
        nameDe: "Sauerteig",
        price: 45,
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCBmaWxsPSIjOTI0MDBlIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIzMiIgZm9udC13ZWlnaHQ9ImJvbGQiPlN1cmRlZ3NicsO2ZDwvdGV4dD48L3N2Zz4=",
        allergens: ["Gluten"],
      },
    ],
    sandwiches: [
      {
        id: 4,
        nameSv: "Skinksmörgås",
        nameEn: "Ham",
        nameDe: "Schinken",
        price: 45,
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCBmaWxsPSIjMTBiOTgxIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyOCIgZm9udC13ZWlnaHQ9ImJvbGQiPlNraW5rc23DtnJnw6VzPC90ZXh0Pjwvc3ZnPg==",
        allergens: ["Gluten", "Mjölk"],
      },
    ],
    drinks: [
      {
        id: 8,
        nameSv: "Juice",
        nameEn: "Juice",
        nameDe: "Saft",
        price: 25,
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCBmaWxsPSIjZjk3MzE2IiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI0OCIgZm9udC13ZWlnaHQ9ImJvbGQiPkp1aWNlPC90ZXh0Pjwvc3ZnPg==",
        allergens: [],
      },
    ],
    extras: [
      {
        id: 11,
        nameSv: "Smör",
        nameEn: "Butter",
        nameDe: "Butter",
        price: 10,
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCBmaWxsPSIjZmJiZjI0IiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI0OCIgZm9udC13ZWlnaHQ9ImJvbGQiPlNtw7ZyPC90ZXh0Pjwvc3ZnPg==",
        allergens: ["Mjölk"],
      },
    ],
  });
  const [campsites, setCampsites] = useState([
    { name: "Östra Husbilsområdet", time: "07:30", active: true },
    { name: "Västra Husbilsområdet", time: "08:30", active: true },
  ]);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [editProd, setEditProd] = useState(null);
  const [editCamp, setEditCamp] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [statsView, setStatsView] = useState("day");
  const [statsData, setStatsData] = useState({ data: [], total: 0 });
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    campsite: "",
    pitch: "",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    time: "",
    payment: "card",
  });

  const t = {
    sv: "Beställ färsk frukost",
    en: "Order fresh breakfast",
    de: "Frühstück bestellen",
  };
  const cats = {
    bread: { sv: "Bröd", en: "Bread", de: "Brot" },
    sandwiches: { sv: "Smörgåsar", en: "Sandwiches", de: "Sandwiches" },
    drinks: { sv: "Drycker", en: "Drinks", de: "Getränke" },
    extras: { sv: "Tillbehör", en: "Extras", de: "Extras" },
  };

  const [orderCache, setOrderCache] = useState({});
  const [lastLoadedDate, setLastLoadedDate] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedDate !== lastLoadedDate) {
      loadOrders();
    }
  }, [selectedDate]);

  useEffect(() => {
    if (adminTab === "stats") {
      loadStats();
    }
  }, [statsView, adminTab]);

  const getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  };

  const loadStats = async () => {
    try {
      const allKeys = await window.storage.list("order-", false);
      if (!allKeys?.keys) {
        setStatsData({ data: [], total: 0 });
        return;
      }

      const allOrders = [];
      for (const k of allKeys.keys) {
        try {
          const ord = await window.storage.get(k, false);
          if (ord?.value) allOrders.push(JSON.parse(ord.value));
        } catch (e) {
          console.error("Error loading order for stats:", e);
        }
      }

      const now = new Date();
      let data = [];
      let total = 0;

      if (statsView === "day") {
        for (let i = 6; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(d.getDate() - i);
          const dateStr = d.toISOString().split("T")[0];
          const dayOrders = allOrders.filter(
            (o) => (o.customer?.date || o.date) === dateStr
          );
          const sum = dayOrders.reduce((s, o) => s + o.total, 0);
          data.push({
            label: d.toLocaleDateString("sv-SE", {
              month: "short",
              day: "numeric",
            }),
            value: sum,
            count: dayOrders.length,
          });
          total += sum;
        }
      } else if (statsView === "week") {
        for (let i = 7; i >= 0; i--) {
          const weekStart = new Date(now);
          weekStart.setDate(weekStart.getDate() - weekStart.getDay() - i * 7);
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekEnd.getDate() + 6);

          const weekOrders = allOrders.filter((o) => {
            const orderDate = new Date(o.customer?.date || o.date);
            return orderDate >= weekStart && orderDate <= weekEnd;
          });
          const sum = weekOrders.reduce((s, o) => s + o.total, 0);
          data.push({
            label: `V${getWeekNumber(weekStart)}`,
            value: sum,
            count: weekOrders.length,
          });
          total += sum;
        }
      } else {
        for (let i = 11; i >= 0; i--) {
          const d = new Date(now);
          d.setMonth(d.getMonth() - i);
          const year = d.getFullYear();
          const month = d.getMonth() + 1;

          const monthOrders = allOrders.filter((o) => {
            const orderDate = new Date(o.customer?.date || o.date);
            return (
              orderDate.getFullYear() === year &&
              orderDate.getMonth() + 1 === month
            );
          });
          const sum = monthOrders.reduce((s, o) => s + o.total, 0);
          data.push({
            label: d.toLocaleDateString("sv-SE", { month: "short" }),
            value: sum,
            count: monthOrders.length,
          });
          total += sum;
        }
      }

      setStatsData({ data, total });
    } catch (e) {
      console.error("Error loading stats:", e);
      setStatsData({ data: [], total: 0 });
    }
  };

  const loadInitialData = async () => {
    try {
      try {
        const p = await window.storage.get("products", false);
        if (p?.value) {
          setProducts(JSON.parse(p.value));
        }
      } catch (e) {
        console.log("No saved products");
      }

      try {
        const c = await window.storage.get("campsites", false);
        if (c?.value) {
          setCampsites(JSON.parse(c.value));
        } else {
          await window.storage.set(
            "campsites",
            JSON.stringify(campsites),
            false
          );
        }
      } catch (e) {
        console.log("No saved campsites");
      }

      await loadOrders();
    } catch (e) {
      console.error("Initial load error:", e);
    } finally {
      setInitialLoading(false);
    }
  };

  const loadOrders = async () => {
    if (loadingOrders) return;

    setLoadingOrders(true);
    try {
      if (orderCache[selectedDate]) {
        setOrders(orderCache[selectedDate]);
        setLastLoadedDate(selectedDate);
        setLoadingOrders(false);
        return;
      }

      const o = await window.storage.list("order-", false);

      if (o?.keys && o.keys.length > 0) {
        const all = [];
        const allOrdersByDate = {};

        for (const k of o.keys) {
          try {
            const ord = await window.storage.get(k, false);
            if (ord?.value) {
              const d = JSON.parse(ord.value);
              const orderDate = d.customer?.date || d.date;

              if (!allOrdersByDate[orderDate]) {
                allOrdersByDate[orderDate] = [];
              }
              allOrdersByDate[orderDate].push(d);

              if (orderDate === selectedDate) all.push(d);
            }
          } catch (e) {
            console.error("Error loading order:", k, e);
          }
        }

        setOrderCache(allOrdersByDate);

        const sorted = all.sort((a, b) =>
          (a.customer?.time || "").localeCompare(b.customer?.time || "")
        );
        setOrders(sorted);
      } else {
        setOrders([]);
      }

      setLastLoadedDate(selectedDate);
    } catch (e) {
      console.log("Could not load orders:", e.message);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  const order = async () => {
    if (
      !form.name ||
      !form.phone ||
      !form.email ||
      !form.campsite ||
      !form.pitch ||
      !form.time ||
      cart.length === 0
    ) {
      alert("❌ Fyll i alla fält och lägg till produkter");
      return;
    }

    setLoading(true);
    try {
      const num = "ORD" + Date.now();
      const ord = {
        num,
        date: new Date().toISOString().split("T")[0],
        timestamp: new Date().toLocaleTimeString("sv-SE"),
        customer: { ...form, date: form.date },
        items: cart,
        total: cart.reduce((s, i) => s + i.price * i.quantity, 0),
      };

      const result = await window.storage.set(
        "order-" + num,
        JSON.stringify(ord),
        false
      );

      if (result) {
        const orderDate = ord.customer.date;
        setOrderCache((prev) => ({
          ...prev,
          [orderDate]: [...(prev[orderDate] || []), ord].sort((a, b) =>
            (a.customer?.time || "").localeCompare(b.customer?.time || "")
          ),
        }));

        if (orderDate === selectedDate) {
          setOrders((prev) =>
            [...prev, ord].sort((a, b) =>
              (a.customer?.time || "").localeCompare(b.customer?.time || "")
            )
          );
        }

        setLastOrder(ord);
        setOrderSuccess(true);
        setCart([]);
        setForm({
          name: "",
          phone: "",
          email: "",
          campsite: "",
          pitch: "",
          date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
          time: "",
          payment: "card",
        });
      } else {
        alert("Kunde inte spara beställningen. Försök igen.");
      }
    } catch (e) {
      console.error("Order error:", e);
      alert("Ett fel uppstod: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const saveProduct = async (category, product) => {
    try {
      const newProducts = { ...products };
      const categoryProducts = newProducts[category];
      const index = categoryProducts.findIndex((p) => p.id === product.id);

      if (index >= 0) {
        categoryProducts[index] = product;
      }

      await window.storage.set("products", JSON.stringify(newProducts), false);
      setProducts(newProducts);
      setEditProd(null);
    } catch (e) {
      console.error("Save product error:", e);
      alert("Kunde inte spara produkten");
    }
  };

  const deleteProduct = async (category, productId) => {
    try {
      const newProducts = { ...products };
      newProducts[category] = newProducts[category].filter(
        (p) => p.id !== productId
      );

      await window.storage.set("products", JSON.stringify(newProducts), false);
      setProducts(newProducts);
      setEditProd(null);
      setConfirmDelete(null);
    } catch (e) {
      console.error("Delete error:", e);
      alert("Kunde inte ta bort produkten: " + e.message);
      setConfirmDelete(null);
    }
  };

  const deleteOrder = async (orderNum) => {
    try {
      await window.storage.delete("order-" + orderNum, false);
      setOrderCache((prev) => {
        const updated = { ...prev };
        if (updated[selectedDate]) {
          updated[selectedDate] = updated[selectedDate].filter(
            (ord) => ord.num !== orderNum
          );
        }
        return updated;
      });
      setConfirmDelete(null);
      loadOrders();
    } catch (e) {
      console.error("Delete order error:", e);
      setConfirmDelete(null);
    }
  };

  const deleteCampsite = async (index) => {
    try {
      const n = campsites.filter((_, ix) => ix !== index);
      await window.storage.set("campsites", JSON.stringify(n), false);
      setCampsites(n);
      setEditCamp(null);
      setConfirmDelete(null);
    } catch (e) {
      console.error("Delete campsite error:", e);
      setConfirmDelete(null);
    }
  };

  const generatePDF = (type) => {
    try {
      const filteredOrders = orders.filter(
        (o) =>
          selectedCampsite === "all" || o.customer.campsite === selectedCampsite
      );

      let content = "";
      let filename = "";

      if (type === "orders") {
        content = `ORDERLISTA - ${selectedDate}\n`;
        content += selectedCampsite !== "all" ? `${selectedCampsite}\n` : "";
        content += "=".repeat(60) + "\n\n";

        filteredOrders.forEach((o) => {
          content += `Order: ${o.num}\n`;
          content += `Tid: ${o.timestamp}\n`;
          content += `Kund: ${o.customer.name}\n`;
          content += `Telefon: ${o.customer.phone}\n`;
          content += `E-post: ${o.customer.email}\n`;
          content += `Ställplats: ${o.customer.campsite} #${o.customer.pitch}\n`;
          content += `Leverans: ${o.customer.date} kl ${o.customer.time}\n\n`;
          content += `Produkter:\n`;
          o.items.forEach((i) => {
            content += `  ${i.nameSv} x${i.quantity} - ${
              i.price * i.quantity
            } kr\n`;
          });
          content += `\nTotalt: ${o.total} kr\n`;
          content += `Betalning: ${
            o.customer.payment === "card" ? "Kort" : "Swish"
          }\n`;
          content += "\n" + "-".repeat(60) + "\n\n";
        });

        content += `\nTotalt antal ordrar: ${filteredOrders.length}\n`;
        content += `Total intäkt: ${filteredOrders.reduce(
          (sum, o) => sum + o.total,
          0
        )} kr`;

        filename = `orderlista-${selectedDate}${
          selectedCampsite !== "all" ? "-" + selectedCampsite : ""
        }.txt`;
      } else if (type === "delivery") {
        const sorted = [...filteredOrders].sort((a, b) => {
          if (a.customer.campsite !== b.customer.campsite) {
            return a.customer.campsite.localeCompare(b.customer.campsite);
          }
          return (a.customer.pitch || "").localeCompare(b.customer.pitch || "");
        });

        content = `LEVERANSLISTA - ${selectedDate}\n`;
        content += "=".repeat(80) + "\n\n";

        sorted.forEach((o) => {
          const campsite = o.customer.campsite.padEnd(30);
          const pitch = `#${(o.customer.pitch || "").padEnd(5)}`;
          const name = o.customer.name.padEnd(20);
          const phone = o.customer.phone.padEnd(15);

          content += `${campsite} ${pitch} ${name} ${phone}\n`;
          content += `${" ".repeat(37)}${o.customer.email}\n`;
          content += `${" ".repeat(37)}Tid: ${o.customer.time}\n`;
          content += `${" ".repeat(37)}Produkter: ${o.items
            .map((i) => `${i.nameSv} (${i.quantity}st)`)
            .join(", ")}\n`;
          content += "\n";
        });

        content += "=".repeat(80) + "\n";
        content += `Totalt: ${sorted.length} leveranser`;

        filename = `leveranslista-${selectedDate}${
          selectedCampsite !== "all" ? "-" + selectedCampsite : ""
        }.txt`;
      }

      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF generation error:", e);
      alert("Kunde inte skapa filen. Försök igen.");
    }
  };

  const addProduct = async (category) => {
    try {
      const newProducts = { ...products };
      const maxId = Math.max(
        ...Object.values(newProducts)
          .flat()
          .map((p) => p.id),
        0
      );
      const newProduct = {
        id: maxId + 1,
        nameSv: "Ny produkt",
        nameEn: "New product",
        nameDe: "Neues Produkt",
        price: 0,
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCBmaWxsPSIjNmI3MjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIzMiIgZm9udC13ZWlnaHQ9ImJvbGQiPk55IHByb2R1a3Q8L3RleHQ+PC9zdmc+",
        allergens: [],
      };

      newProducts[category].push(newProduct);
      await window.storage.set("products", JSON.stringify(newProducts), false);
      setProducts(newProducts);
      setEditProd({ category, product: newProduct });
    } catch (e) {
      console.error("Add product error:", e);
      setMessage({ type: "error", text: "Kunde inte skapa produkten" });
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const resetProducts = async () => {
    const defaultProducts = {
      bread: [
        {
          id: 1,
          nameSv: "Frallor",
          nameEn: "Rolls",
          nameDe: "Brötchen",
          price: 5,
          image:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCBmaWxsPSIjZjU5ZTBiIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI0MCIgZm9udC13ZWlnaHQ9ImJvbGQiPkZyYWxsb3I8L3RleHQ+PC9zdmc+",
          allergens: ["Gluten", "Mjölk"],
        },
        {
          id: 2,
          nameSv: "Surdegsbröd",
          nameEn: "Sourdough",
          nameDe: "Sauerteig",
          price: 45,
          image:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCBmaWxsPSIjOTI0MDBlIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIzMiIgZm9udC13ZWlnaHQ9ImJvbGQiPlN1cmRlZ3NicsO2ZDwvdGV4dD48L3N2Zz4=",
          allergens: ["Gluten"],
        },
      ],
      sandwiches: [
        {
          id: 4,
          nameSv: "Skinksmörgås",
          nameEn: "Ham",
          nameDe: "Schinken",
          price: 45,
          image:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCBmaWxsPSIjMTBiOTgxIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyOCIgZm9udC13ZWlnaHQ9ImJvbGQiPlNraW5rc23DtnJnw6VzPC90ZXh0Pjwvc3ZnPg==",
          allergens: ["Gluten", "Mjölk"],
        },
      ],
      drinks: [
        {
          id: 8,
          nameSv: "Juice",
          nameEn: "Juice",
          nameDe: "Saft",
          price: 25,
          image:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCBmaWxsPSIjZjk3MzE2IiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI0OCIgZm9udC13ZWlnaHQ9ImJvbGQiPkp1aWNlPC90ZXh0Pjwvc3ZnPg==",
          allergens: [],
        },
      ],
      extras: [
        {
          id: 11,
          nameSv: "Smör",
          nameEn: "Butter",
          nameDe: "Butter",
          price: 10,
          image:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCBmaWxsPSIjZmJiZjI0IiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI0OCIgZm9udC13ZWlnaHQ9ImJvbGQiPlNtw7ZyPC90ZXh0Pjwvc3ZnPg==",
          allergens: ["Mjölk"],
        },
      ],
    };

    await window.storage.set(
      "products",
      JSON.stringify(defaultProducts),
      false
    );
    setProducts(defaultProducts);
    setMessage({ type: "success", text: "✅ Produkter återställda!" });
    setTimeout(() => setMessage(null), 5000);
  };

  const getName = (p) =>
    lang === "en" ? p.nameEn : lang === "de" ? p.nameDe : p.nameSv;

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-orange-500 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800">
            Laddar frukostbeställning...
          </h2>
          <p className="text-gray-600 mt-2">Vänligen vänta</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-100 to-green-50"
      }`}
    >
      <div
        className={`${
          darkMode
            ? "bg-gray-800 border-orange-400"
            : "bg-white border-orange-500"
        } shadow-xl border-b-8 mb-8`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <h1
              className={`text-5xl font-bold ${
                darkMode ? "text-orange-400" : "text-orange-600"
              } text-center flex-1`}
            >
              🚐 Husbilsfrukost
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-2 rounded-lg font-bold ${
                darkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
          <p
            className={`text-center ${
              darkMode ? "text-gray-300" : "text-gray-600"
            } mb-6`}
          >
            {t[lang]}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <button
              onClick={() => setPage("menu")}
              className={`px-8 py-4 rounded-xl font-bold text-xl shadow-lg ${
                page === "menu" ? "bg-orange-500 text-white" : "bg-gray-200"
              }`}
            >
              📋 Meny
            </button>
            <button
              onClick={() => setPage("cart")}
              className={`px-8 py-4 rounded-xl font-bold text-xl shadow-lg relative ${
                page === "cart" ? "bg-orange-500 text-white" : "bg-gray-200"
              }`}
            >
              🛒 Korg
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </button>
          </div>
          {page !== "admin" && (
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setLang("sv")}
                className={`px-6 py-3 rounded-lg font-bold ${
                  lang === "sv" ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                🇸🇪 SV
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-6 py-3 rounded-lg font-bold ${
                  lang === "en" ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                🇬🇧 EN
              </button>
              <button
                onClick={() => setLang("de")}
                className={`px-6 py-3 rounded-lg font-bold ${
                  lang === "de" ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                🇩🇪 DE
              </button>
            </div>
          )}
        </div>
      </div>

      <main className="pb-12 px-4">
        {message && (
          <div
            className={`max-w-6xl mx-auto mb-6 p-4 rounded-xl font-bold text-center ${
              message.type === "success"
                ? "bg-green-100 text-green-800 border-2 border-green-500"
                : "bg-red-100 text-red-800 border-2 border-red-500"
            }`}
          >
            {message.text}
          </div>
        )}

        {page === "menu" && (
          <div className="max-w-6xl mx-auto">
            {Object.entries(products).map(([cat, items]) => (
              <div key={cat} className="mb-10">
                <h2
                  className={`text-3xl md:text-4xl font-bold mb-6 ${
                    darkMode
                      ? "text-gray-100 border-orange-400"
                      : "text-gray-800 border-orange-400"
                  } border-b-4 pb-2`}
                >
                  {cats[cat][lang]}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {items.map((p) => (
                    <div
                      key={p.id}
                      className={`${
                        darkMode ? "bg-gray-800 text-white" : "bg-white"
                      } rounded-2xl shadow-xl p-4 md:p-6 flex flex-col`}
                    >
                      <div
                        className="w-full mb-4 rounded-lg overflow-hidden bg-gray-200"
                        style={{ height: "200px" }}
                      >
                        <img
                          src={p.image}
                          alt={getName(p)}
                          className="w-full h-full object-cover"
                          style={{ display: "block", maxHeight: "200px" }}
                        />
                      </div>
                      <h3 className="font-bold text-lg md:text-xl mb-2 text-center">
                        {getName(p)}
                      </h3>
                      {p.allergens && p.allergens.length > 0 && (
                        <div className="mb-3">
                          <p
                            className={`text-xs ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            } mb-1`}
                          >
                            Allergener:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {p.allergens.map((a, i) => (
                              <span
                                key={i}
                                className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded"
                              >
                                {a}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-xl md:text-2xl font-bold text-green-600">
                          {p.price} kr
                        </span>
                        <button
                          onClick={() => {
                            const e = cart.find((i) => i.id === p.id);
                            e
                              ? setCart(
                                  cart.map((i) =>
                                    i.id === p.id
                                      ? { ...i, quantity: i.quantity + 1 }
                                      : i
                                  )
                                )
                              : setCart([...cart, { ...p, quantity: 1 }]);
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg flex items-center gap-2 font-bold text-sm md:text-base"
                        >
                          <Plus size={16} className="md:w-5 md:h-5" />
                          <span className="hidden sm:inline">
                            {lang === "sv"
                              ? "Lägg till"
                              : lang === "en"
                              ? "Add"
                              : "Hinzufügen"}
                          </span>
                          <span className="sm:hidden">+</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 &&
          page !== "admin" &&
          page !== "checkout" &&
          page !== "cart" && (
            <div
              className={`mt-12 max-w-6xl mx-auto ${
                darkMode ? "bg-gray-800" : "bg-white"
              } rounded-2xl shadow-2xl p-6 md:p-8`}
            >
              <h3
                className={`text-2xl md:text-3xl font-bold mb-4 flex items-center justify-between ${
                  darkMode ? "text-white" : ""
                }`}
              >
                <span>
                  🛒{" "}
                  {lang === "sv"
                    ? "Din varukorg"
                    : lang === "en"
                    ? "Your cart"
                    : "Ihr Warenkorb"}
                </span>
                <button
                  onClick={() => setPage("cart")}
                  className="text-sm md:text-lg text-blue-600 underline"
                >
                  {lang === "sv"
                    ? "Visa alla"
                    : lang === "en"
                    ? "View all"
                    : "Alle anzeigen"}
                </button>
              </h3>
              <div className="space-y-2 max-h-48 md:max-h-64 overflow-y-auto">
                {cart.slice(0, 3).map((i) => (
                  <div
                    key={i.id}
                    className={`flex justify-between items-center ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    } p-3 rounded-lg`}
                  >
                    <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                      <img
                        src={i.image}
                        alt={getName(i)}
                        className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4
                          className={`font-bold text-sm md:text-base truncate ${
                            darkMode ? "text-white" : ""
                          }`}
                        >
                          {getName(i)}
                        </h4>
                        <p
                          className={`text-xs md:text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {i.price} kr × {i.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                      <button
                        onClick={() =>
                          setCart(
                            cart
                              .map((x) =>
                                x.id === i.id
                                  ? {
                                      ...x,
                                      quantity: Math.max(0, x.quantity - 1),
                                    }
                                  : x
                              )
                              .filter((x) => x.quantity > 0)
                          )
                        }
                        className={`${
                          darkMode
                            ? "bg-gray-600 hover:bg-gray-500"
                            : "bg-gray-300 hover:bg-gray-400"
                        } p-1 md:p-2 rounded-lg`}
                      >
                        <Minus
                          size={14}
                          className={darkMode ? "text-white" : "text-gray-800"}
                        />
                      </button>
                      <span
                        className={`font-bold text-sm md:text-xl w-6 md:w-8 text-center ${
                          darkMode ? "text-white" : ""
                        }`}
                      >
                        {i.quantity}
                      </span>
                      <button
                        onClick={() =>
                          setCart(
                            cart.map((x) =>
                              x.id === i.id
                                ? { ...x, quantity: x.quantity + 1 }
                                : x
                            )
                          )
                        }
                        className={`${
                          darkMode
                            ? "bg-gray-600 hover:bg-gray-500"
                            : "bg-gray-300 hover:bg-gray-400"
                        } p-1 md:p-2 rounded-lg`}
                      >
                        <Plus
                          size={14}
                          className={darkMode ? "text-white" : "text-gray-800"}
                        />
                      </button>
                    </div>
                  </div>
                ))}
                {cart.length > 3 && (
                  <p
                    className={`text-center text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    } py-2`}
                  >
                    + {cart.length - 3} fler{" "}
                    {cart.length - 3 === 1 ? "produkt" : "produkter"}
                  </p>
                )}
              </div>
              <div
                className={`border-t ${
                  darkMode ? "border-gray-600" : ""
                } mt-4 pt-4`}
              >
                <div
                  className={`flex justify-between text-xl md:text-2xl font-bold mb-3 ${
                    darkMode ? "text-white" : ""
                  }`}
                >
                  <span>
                    {lang === "sv"
                      ? "Totalt:"
                      : lang === "en"
                      ? "Total:"
                      : "Gesamt:"}
                  </span>
                  <span className="text-green-600">
                    {cart.reduce((s, i) => s + i.price * i.quantity, 0)} kr
                  </span>
                </div>
                <button
                  onClick={() => setPage("checkout")}
                  className="w-full bg-green-500 text-white py-3 md:py-4 rounded-xl font-bold text-lg md:text-xl hover:bg-green-600"
                >
                  ✅{" "}
                  {lang === "sv"
                    ? "Till kassan"
                    : lang === "en"
                    ? "Checkout"
                    : "Zur Kasse"}
                </button>
              </div>
            </div>
          )}

        {page === "cart" && (
          <div className="max-w-4xl mx-auto">
            <h2
              className={`text-4xl font-bold mb-8 text-center ${
                darkMode ? "text-white" : ""
              }`}
            >
              🛒{" "}
              {lang === "sv"
                ? "Varukorg"
                : lang === "en"
                ? "Cart"
                : "Warenkorb"}
            </h2>
            {cart.length === 0 ? (
              <div
                className={`${
                  darkMode ? "bg-gray-800" : "bg-white"
                } rounded-2xl shadow-xl p-12 text-center`}
              >
                <p
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  } text-2xl`}
                >
                  Tom
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-8">
                  {cart.map((i) => (
                    <div
                      key={i.id}
                      className={`${
                        darkMode ? "bg-gray-800" : "bg-white"
                      } rounded-xl shadow-lg p-6 flex justify-between items-center`}
                    >
                      <div className="flex items-center gap-6">
                        <img
                          src={i.image}
                          alt={getName(i)}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div>
                          <h3
                            className={`font-bold text-xl ${
                              darkMode ? "text-white" : ""
                            }`}
                          >
                            {getName(i)}
                          </h3>
                          <p
                            className={`${
                              darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {i.price} kr
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() =>
                            setCart(
                              cart
                                .map((x) =>
                                  x.id === i.id
                                    ? {
                                        ...x,
                                        quantity: Math.max(0, x.quantity - 1),
                                      }
                                    : x
                                )
                                .filter((x) => x.quantity > 0)
                            )
                          }
                          className={`${
                            darkMode
                              ? "bg-gray-700 hover:bg-gray-600"
                              : "bg-gray-200 hover:bg-gray-300"
                          } p-3 rounded-lg`}
                        >
                          <Minus
                            size={20}
                            className={
                              darkMode ? "text-white" : "text-gray-800"
                            }
                          />
                        </button>
                        <span
                          className={`font-bold text-2xl w-12 text-center ${
                            darkMode ? "text-white" : ""
                          }`}
                        >
                          {i.quantity}
                        </span>
                        <button
                          onClick={() =>
                            setCart(
                              cart.map((x) =>
                                x.id === i.id
                                  ? { ...x, quantity: x.quantity + 1 }
                                  : x
                              )
                            )
                          }
                          className={`${
                            darkMode
                              ? "bg-gray-700 hover:bg-gray-600"
                              : "bg-gray-200 hover:bg-gray-300"
                          } p-3 rounded-lg`}
                        >
                          <Plus
                            size={20}
                            className={
                              darkMode ? "text-white" : "text-gray-800"
                            }
                          />
                        </button>
                        <button
                          onClick={() =>
                            setCart(cart.filter((x) => x.id !== i.id))
                          }
                          className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } rounded-xl shadow-xl p-8`}
                >
                  <div
                    className={`flex justify-between text-3xl font-bold mb-6 ${
                      darkMode ? "text-white" : ""
                    }`}
                  >
                    <span>Total:</span>
                    <span className="text-green-600">
                      {cart.reduce((s, i) => s + i.price * i.quantity, 0)} kr
                    </span>
                  </div>
                  <button
                    onClick={() => setPage("checkout")}
                    className="w-full bg-green-500 text-white py-6 rounded-xl font-bold text-2xl hover:bg-green-600"
                  >
                    ✅ {lang === "sv" ? "Till kassan" : "Checkout"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {page === "checkout" && (
          <div className="max-w-3xl mx-auto">
            {orderSuccess ? (
              <div className="bg-green-100 border-4 border-green-500 rounded-2xl p-12 text-center">
                <CheckCircle
                  size={80}
                  className="mx-auto text-green-600 mb-6"
                />
                <h3 className="text-3xl font-bold text-green-800 mb-4">
                  🎉 Tack!
                </h3>
                <p className="text-xl mb-4">
                  Order: <strong>{lastOrder?.num}</strong>
                </p>
                <div className="bg-white p-6 rounded-lg mb-6 text-left">
                  <p>
                    <strong>📧:</strong> {lastOrder?.customer.email}
                  </p>
                  <p>
                    <strong>📱:</strong> {lastOrder?.customer.phone}
                  </p>
                  <p>
                    <strong>📍:</strong> {lastOrder?.customer.campsite} #
                    {lastOrder?.customer.pitch}
                  </p>
                  <p>
                    <strong>🚚:</strong> {lastOrder?.customer.date} kl{" "}
                    {lastOrder?.customer.time}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setOrderSuccess(false);
                    setPage("menu");
                  }}
                  className="bg-blue-500 text-white px-10 py-4 rounded-xl text-xl font-bold"
                >
                  Tillbaka
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold mb-6">Beställning</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Namn *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-4 border-2 rounded-xl"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Telefon *"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full p-4 border-2 rounded-xl"
                    required
                  />
                  <input
                    type="email"
                    placeholder="E-post *"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full p-4 border-2 rounded-xl"
                    required
                  />
                  <select
                    value={form.campsite}
                    onChange={(e) => {
                      const selected = campsites.find(
                        (c) => c.name === e.target.value
                      );
                      setForm({
                        ...form,
                        campsite: e.target.value,
                        time: selected ? selected.time : "",
                      });
                    }}
                    className="w-full p-4 border-2 rounded-xl"
                    required
                  >
                    <option value="">Välj ställplats *</option>
                    {campsites
                      .filter((c) => c.active !== false)
                      .map((s, i) => (
                        <option key={i} value={s.name}>
                          {s.name} (leverans kl {s.time})
                        </option>
                      ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Platsnummer *"
                    value={form.pitch}
                    onChange={(e) =>
                      setForm({ ...form, pitch: e.target.value })
                    }
                    className="w-full p-4 border-2 rounded-xl"
                    required
                  />
                  <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-2">Leveransdatum:</p>
                    <p className="font-bold text-xl">
                      {new Date(Date.now() + 86400000).toLocaleDateString(
                        "sv-SE",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                    {form.campsite && (
                      <p className="text-green-600 font-bold mt-2">
                        Leveranstid: {form.time}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setForm({ ...form, payment: "card" })}
                      className={`flex-1 p-5 rounded-xl border-4 font-bold ${
                        form.payment === "card"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                      }`}
                    >
                      💳 Kort
                    </button>
                    <button
                      onClick={() => setForm({ ...form, payment: "swish" })}
                      className={`flex-1 p-5 rounded-xl border-4 font-bold ${
                        form.payment === "swish"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                      }`}
                    >
                      📱 Swish
                    </button>
                  </div>
                  <button
                    onClick={order}
                    disabled={
                      !form.name ||
                      !form.phone ||
                      !form.email ||
                      !form.campsite ||
                      !form.pitch ||
                      !form.time ||
                      loading
                    }
                    className="w-full bg-green-500 text-white py-6 rounded-xl font-bold text-2xl disabled:bg-gray-400 flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                        Sparar beställning...
                      </>
                    ) : (
                      "Beställ"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {page === "admin" && (
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-4 mb-8 flex-wrap">
              <button
                onClick={() => setAdminTab("orders")}
                className={`px-6 py-3 rounded-lg font-bold ${
                  adminTab === "orders"
                    ? "bg-orange-500 text-white"
                    : darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200"
                }`}
              >
                📦 Ordrar
              </button>
              <button
                onClick={() => setAdminTab("stats")}
                className={`px-6 py-3 rounded-lg font-bold ${
                  adminTab === "stats"
                    ? "bg-orange-500 text-white"
                    : darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200"
                }`}
              >
                📊 Statistik
              </button>
              <button
                onClick={() => setAdminTab("menu")}
                className={`px-6 py-3 rounded-lg font-bold ${
                  adminTab === "menu"
                    ? "bg-orange-500 text-white"
                    : darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200"
                }`}
              >
                📝 Meny
              </button>
              <button
                onClick={() => setAdminTab("settings")}
                className={`px-6 py-3 rounded-lg font-bold ${
                  adminTab === "settings"
                    ? "bg-orange-500 text-white"
                    : darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200"
                }`}
              >
                <Settings size={20} className="inline mr-2" /> Inställningar
              </button>
            </div>

            {adminTab === "stats" && (
              <div>
                <div
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } rounded-xl p-6 mb-6`}
                >
                  <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <h3
                      className={`text-2xl font-bold ${
                        darkMode ? "text-white" : ""
                      }`}
                    >
                      📊 Intäktsstatistik
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setStatsView("day")}
                        className={`px-4 py-2 rounded-lg font-bold ${
                          statsView === "day"
                            ? "bg-orange-500 text-white"
                            : darkMode
                            ? "bg-gray-700 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        Dag
                      </button>
                      <button
                        onClick={() => setStatsView("week")}
                        className={`px-4 py-2 rounded-lg font-bold ${
                          statsView === "week"
                            ? "bg-orange-500 text-white"
                            : darkMode
                            ? "bg-gray-700 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        Vecka
                      </button>
                      <button
                        onClick={() => setStatsView("year")}
                        className={`px-4 py-2 rounded-lg font-bold ${
                          statsView === "year"
                            ? "bg-orange-500 text-white"
                            : darkMode
                            ? "bg-gray-700 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        År
                      </button>
                    </div>
                  </div>

                  {statsData.data.length === 0 ? (
                    <p
                      className={`text-center py-8 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Inga ordrar att visa statistik för
                    </p>
                  ) : (
                    <>
                      <div className="space-y-3 mb-6">
                        {statsData.data.map((item, i) => {
                          const maxValue = Math.max(
                            ...statsData.data.map((d) => d.value),
                            1
                          );
                          return (
                            <div key={i} className="flex items-center gap-4">
                              <span
                                className={`w-16 text-sm font-bold ${
                                  darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                              >
                                {item.label}
                              </span>
                              <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                                  style={{
                                    width: `${(item.value / maxValue) * 100}%`,
                                  }}
                                >
                                  {item.value > 0 && (
                                    <span className="text-white font-bold text-sm">
                                      {item.value} kr
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span
                                className={`w-20 text-sm ${
                                  darkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                ({item.count} st)
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div
                        className={`border-t ${
                          darkMode ? "border-gray-600" : "border-gray-300"
                        } pt-4`}
                      >
                        <div className="flex justify-between items-center">
                          <span
                            className={`text-xl font-bold ${
                              darkMode ? "text-white" : ""
                            }`}
                          >
                            Total intäkt:
                          </span>
                          <span className="text-2xl font-bold text-green-600">
                            {statsData.total} kr
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } rounded-xl p-6`}
                >
                  <h3
                    className={`text-2xl font-bold mb-6 ${
                      darkMode ? "text-white" : ""
                    }`}
                  >
                    🏆 Populäraste produkter ({selectedDate})
                  </h3>
                  {(() => {
                    const productStats = {};
                    orders.forEach((o) => {
                      o.items.forEach((item) => {
                        if (!productStats[item.nameSv]) {
                          productStats[item.nameSv] = { count: 0, revenue: 0 };
                        }
                        productStats[item.nameSv].count += item.quantity;
                        productStats[item.nameSv].revenue +=
                          item.price * item.quantity;
                      });
                    });

                    const sorted = Object.entries(productStats)
                      .sort((a, b) => b[1].count - a[1].count)
                      .slice(0, 10);

                    if (sorted.length === 0) {
                      return (
                        <p
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                        >
                          Inga ordrar för valt datum
                        </p>
                      );
                    }

                    return (
                      <div className="space-y-3">
                        {sorted.map(([name, stats], i) => (
                          <div
                            key={i}
                            className={`flex justify-between items-center p-3 rounded-lg ${
                              darkMode ? "bg-gray-700" : "bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`text-2xl font-bold ${
                                  darkMode ? "text-gray-400" : "text-gray-400"
                                }`}
                              >
                                #{i + 1}
                              </span>
                              <div>
                                <p
                                  className={`font-bold ${
                                    darkMode ? "text-white" : ""
                                  }`}
                                >
                                  {name}
                                </p>
                                <p
                                  className={`text-sm ${
                                    darkMode ? "text-gray-400" : "text-gray-600"
                                  }`}
                                >
                                  {stats.count} st sålda
                                </p>
                              </div>
                            </div>
                            <span className="font-bold text-green-600">
                              {stats.revenue} kr
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {adminTab === "orders" && (
              <div>
                <div className="flex justify-between mb-6 items-center flex-wrap gap-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Calendar
                        size={24}
                        className={darkMode ? "text-white" : ""}
                      />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className={`p-3 border-2 rounded-lg text-lg font-bold ${
                          darkMode
                            ? "bg-gray-700 text-white border-gray-600"
                            : ""
                        }`}
                      />
                    </div>
                    <select
                      value={selectedCampsite}
                      onChange={(e) => setSelectedCampsite(e.target.value)}
                      className={`p-3 border-2 rounded-lg text-lg font-bold ${
                        darkMode ? "bg-gray-700 text-white border-gray-600" : ""
                      }`}
                    >
                      <option value="all">Alla ställplatser</option>
                      {campsites
                        .filter((c) => c.active !== false)
                        .map((c, i) => (
                          <option key={i} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                    </select>
                    <span
                      className={`text-2xl font-bold ${
                        darkMode ? "text-white" : ""
                      }`}
                    >
                      (
                      {
                        orders.filter(
                          (o) =>
                            selectedCampsite === "all" ||
                            o.customer.campsite === selectedCampsite
                        ).length
                      }
                      )
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => generatePDF("orders")}
                      className={`${
                        darkMode ? "bg-blue-600" : "bg-blue-500"
                      } text-white px-4 md:px-6 py-3 rounded-xl flex items-center gap-2 font-bold hover:bg-blue-600`}
                    >
                      <Download size={20} /> Orderlista
                    </button>
                    <button
                      onClick={() => generatePDF("delivery")}
                      className={`${
                        darkMode ? "bg-green-600" : "bg-green-500"
                      } text-white px-4 md:px-6 py-3 rounded-xl flex items-center gap-2 font-bold hover:bg-green-600`}
                    >
                      <Download size={20} /> Leveranslista
                    </button>
                  </div>
                </div>
                {orders.filter(
                  (o) =>
                    selectedCampsite === "all" ||
                    o.customer.campsite === selectedCampsite
                ).length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center">
                    {loadingOrders ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500"></div>
                        <p className="text-gray-500 text-xl">
                          Laddar ordrar...
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        Inga ordrar {selectedDate}
                      </p>
                    )}
                  </div>
                ) : loadingOrders ? (
                  <div className="bg-white rounded-2xl p-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500"></div>
                      <p className="text-gray-500 text-xl">
                        Uppdaterar ordrar...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders
                      .filter(
                        (o) =>
                          selectedCampsite === "all" ||
                          o.customer.campsite === selectedCampsite
                      )
                      .map((o, i) => (
                        <div key={i} className="bg-white rounded-xl p-6">
                          {editOrder?.num === o.num ? (
                            <div className="space-y-4">
                              <input
                                type="text"
                                value={editOrder.customer.name}
                                onChange={(e) =>
                                  setEditOrder({
                                    ...editOrder,
                                    customer: {
                                      ...editOrder.customer,
                                      name: e.target.value,
                                    },
                                  })
                                }
                                className="w-full p-3 border-2 rounded-lg"
                              />
                              <input
                                type="tel"
                                value={editOrder.customer.phone}
                                onChange={(e) =>
                                  setEditOrder({
                                    ...editOrder,
                                    customer: {
                                      ...editOrder.customer,
                                      phone: e.target.value,
                                    },
                                  })
                                }
                                className="w-full p-3 border-2 rounded-lg"
                              />
                              <input
                                type="text"
                                value={editOrder.customer.pitch}
                                onChange={(e) =>
                                  setEditOrder({
                                    ...editOrder,
                                    customer: {
                                      ...editOrder.customer,
                                      pitch: e.target.value,
                                    },
                                  })
                                }
                                className="w-full p-3 border-2 rounded-lg"
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={async () => {
                                    await window.storage.set(
                                      "order-" + editOrder.num,
                                      JSON.stringify(editOrder),
                                      false
                                    );
                                    setOrderCache((prev) => {
                                      const updated = { ...prev };
                                      const orderDate = editOrder.customer.date;
                                      if (updated[orderDate]) {
                                        updated[orderDate] = updated[
                                          orderDate
                                        ].map((ord) =>
                                          ord.num === editOrder.num
                                            ? editOrder
                                            : ord
                                        );
                                      }
                                      return updated;
                                    });
                                    setEditOrder(null);
                                    loadOrders();
                                  }}
                                  className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center gap-2"
                                >
                                  <Save size={20} /> Spara
                                </button>
                                <button
                                  onClick={() => setEditOrder(null)}
                                  className="bg-gray-300 px-6 py-3 rounded-lg"
                                >
                                  <X size={20} /> Avbryt
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="font-bold text-xl text-orange-600">
                                    {o.num}
                                  </p>
                                  <p className="text-gray-600">{o.timestamp}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold">{o.customer.name}</p>
                                  <p>{o.customer.phone}</p>
                                  <p className="text-blue-600 font-bold">
                                    {o.customer.campsite} #{o.customer.pitch}
                                  </p>
                                  <p className="text-green-600 font-bold">
                                    🚚 {o.customer.date} {o.customer.time}
                                  </p>
                                </div>
                              </div>
                              <div className="border-t pt-4">
                                {o.items.map((x, ix) => (
                                  <div
                                    key={ix}
                                    className="flex justify-between py-2"
                                  >
                                    <span>
                                      {x.nameSv} x{x.quantity}
                                    </span>
                                    <span className="font-bold">
                                      {x.price * x.quantity} kr
                                    </span>
                                  </div>
                                ))}
                                <div className="border-t mt-2 pt-2 flex justify-between font-bold text-xl">
                                  <span>Totalt:</span>
                                  <span className="text-green-600">
                                    {o.total} kr
                                  </span>
                                </div>
                                <div className="flex gap-2 mt-4">
                                  <button
                                    onClick={() => setEditOrder(o)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                  >
                                    <Edit2 size={18} /> Redigera
                                  </button>
                                  <button
                                    onClick={() =>
                                      setConfirmDelete({
                                        type: "order",
                                        num: o.num,
                                      })
                                    }
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                  >
                                    <Trash2 size={18} /> Ta bort
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {adminTab === "menu" && (
              <div>
                <div className="bg-yellow-100 border-2 border-yellow-500 rounded-xl p-6 mb-6">
                  <h4 className="font-bold text-lg mb-2">
                    ⚠️ Problem med bilder?
                  </h4>
                  <p className="mb-4">
                    Om bilder inte syns kan det bero på att produkterna använder
                    för stora bilder.
                    <br />
                    <br />
                    <strong>Lösning:</strong> Återställ produkterna med färgade
                    placeholders, sedan ladda upp egna små bilder (.jpg, .png)
                    för varje produkt.
                  </p>
                  <button
                    onClick={resetProducts}
                    className="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600"
                  >
                    🔄 Återställ med placeholders
                  </button>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <h3
                    className={`text-2xl font-bold ${
                      darkMode ? "text-white" : ""
                    }`}
                  >
                    Redigera meny
                  </h3>
                </div>
                {Object.entries(products).map(([cat, items]) => (
                  <div key={cat} className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h4
                        className={`text-xl font-bold ${
                          darkMode ? "text-white" : ""
                        }`}
                      >
                        {cats[cat].sv}
                      </h4>
                      <button
                        onClick={() => addProduct(cat)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                      >
                        <Plus size={18} /> Lägg till produkt
                      </button>
                    </div>
                    <div className="space-y-4">
                      {items.map((p) => (
                        <div
                          key={p.id}
                          className={`${
                            darkMode
                              ? "bg-gray-800 border-gray-600"
                              : "bg-white"
                          } rounded-xl p-6 border-2`}
                        >
                          {editProd?.product.id === p.id ? (
                            <div className="space-y-4">
                              <div className="grid grid-cols-3 gap-4">
                                <input
                                  type="text"
                                  placeholder="Namn (Svenska)"
                                  value={editProd.product.nameSv}
                                  onChange={(e) =>
                                    setEditProd({
                                      ...editProd,
                                      product: {
                                        ...editProd.product,
                                        nameSv: e.target.value,
                                      },
                                    })
                                  }
                                  className={`p-3 border-2 rounded-lg ${
                                    darkMode
                                      ? "bg-gray-700 text-white border-gray-600"
                                      : ""
                                  }`}
                                />
                                <input
                                  type="text"
                                  placeholder="Name (English)"
                                  value={editProd.product.nameEn}
                                  onChange={(e) =>
                                    setEditProd({
                                      ...editProd,
                                      product: {
                                        ...editProd.product,
                                        nameEn: e.target.value,
                                      },
                                    })
                                  }
                                  className={`p-3 border-2 rounded-lg ${
                                    darkMode
                                      ? "bg-gray-700 text-white border-gray-600"
                                      : ""
                                  }`}
                                />
                                <input
                                  type="text"
                                  placeholder="Name (Deutsch)"
                                  value={editProd.product.nameDe}
                                  onChange={(e) =>
                                    setEditProd({
                                      ...editProd,
                                      product: {
                                        ...editProd.product,
                                        nameDe: e.target.value,
                                      },
                                    })
                                  }
                                  className={`p-3 border-2 rounded-lg ${
                                    darkMode
                                      ? "bg-gray-700 text-white border-gray-600"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <input
                                  type="number"
                                  placeholder="Pris"
                                  value={editProd.product.price}
                                  onChange={(e) =>
                                    setEditProd({
                                      ...editProd,
                                      product: {
                                        ...editProd.product,
                                        price: Number(e.target.value),
                                      },
                                    })
                                  }
                                  className={`p-3 border-2 rounded-lg ${
                                    darkMode
                                      ? "bg-gray-700 text-white border-gray-600"
                                      : ""
                                  }`}
                                />
                                <input
                                  type="text"
                                  placeholder="Bild-URL (eller ladda upp nedan)"
                                  value={editProd.product.image}
                                  onChange={(e) =>
                                    setEditProd({
                                      ...editProd,
                                      product: {
                                        ...editProd.product,
                                        image: e.target.value,
                                      },
                                    })
                                  }
                                  className={`p-3 border-2 rounded-lg ${
                                    darkMode
                                      ? "bg-gray-700 text-white border-gray-600"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                className={`border-2 rounded-lg p-4 ${
                                  darkMode ? "border-gray-600" : ""
                                }`}
                              >
                                <label
                                  className={`block mb-2 font-bold ${
                                    darkMode ? "text-white" : ""
                                  }`}
                                >
                                  Allergener (separera med kommatecken):
                                </label>
                                <input
                                  type="text"
                                  placeholder="T.ex. Gluten, Mjölk, Ägg"
                                  value={(
                                    editProd.product.allergens || []
                                  ).join(", ")}
                                  onChange={(e) =>
                                    setEditProd({
                                      ...editProd,
                                      product: {
                                        ...editProd.product,
                                        allergens: e.target.value
                                          .split(",")
                                          .map((a) => a.trim())
                                          .filter((a) => a),
                                      },
                                    })
                                  }
                                  className={`w-full p-3 border-2 rounded-lg ${
                                    darkMode
                                      ? "bg-gray-700 text-white border-gray-600"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                className={`border-2 border-dashed rounded-lg p-4 ${
                                  darkMode
                                    ? "border-gray-600"
                                    : "border-gray-300"
                                }`}
                              >
                                <label
                                  className={`block mb-2 font-bold ${
                                    darkMode ? "text-white" : "text-gray-700"
                                  }`}
                                >
                                  Eller ladda upp en bild (.jpg, .jpeg, .png):
                                </label>
                                <input
                                  type="file"
                                  accept=".jpg,.jpeg,.png,.webp,.gif"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        setEditProd({
                                          ...editProd,
                                          product: {
                                            ...editProd.product,
                                            image: event.target.result,
                                          },
                                        });
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  className={`w-full p-2 border-2 rounded-lg ${
                                    darkMode
                                      ? "bg-gray-700 text-white border-gray-600"
                                      : ""
                                  }`}
                                />
                                <p
                                  className={`text-sm mt-2 ${
                                    darkMode ? "text-gray-400" : "text-gray-500"
                                  }`}
                                >
                                  Bilden kommer sparas direkt i appen
                                  (base64-format)
                                </p>
                              </div>
                              {editProd.product.image && (
                                <div
                                  className={`border-2 rounded-lg p-4 ${
                                    darkMode ? "border-gray-600" : ""
                                  }`}
                                >
                                  <p
                                    className={`font-bold mb-2 ${
                                      darkMode ? "text-white" : ""
                                    }`}
                                  >
                                    Förhandsvisning:
                                  </p>
                                  <div className="relative w-full pb-[75%] overflow-hidden rounded-lg bg-gray-200">
                                    <img
                                      src={editProd.product.image}
                                      alt="Preview"
                                      className="absolute top-0 left-0 w-full h-full object-cover"
                                    />
                                  </div>
                                </div>
                              )}
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    saveProduct(cat, editProd.product)
                                  }
                                  className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center gap-2"
                                >
                                  <Save size={18} /> Spara
                                </button>
                                <button
                                  onClick={() => setEditProd(null)}
                                  className="bg-gray-300 px-6 py-3 rounded-lg flex items-center gap-2"
                                >
                                  <X size={18} /> Avbryt
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-4">
                                <img
                                  src={p.image}
                                  alt={p.nameSv}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div>
                                  <h5
                                    className={`font-bold text-lg ${
                                      darkMode ? "text-white" : ""
                                    }`}
                                  >
                                    {p.nameSv}
                                  </h5>
                                  <p
                                    className={`${
                                      darkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    {p.nameEn} / {p.nameDe}
                                  </p>
                                  <p className="text-green-600 font-bold">
                                    {p.price} kr
                                  </p>
                                  {p.allergens && p.allergens.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {p.allergens.map((a, idx) => (
                                        <span
                                          key={idx}
                                          className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded"
                                        >
                                          {a}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    setEditProd({
                                      category: cat,
                                      product: { ...p },
                                    })
                                  }
                                  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                >
                                  <Edit2 size={18} /> Redigera
                                </button>
                                <button
                                  onClick={() =>
                                    setConfirmDelete({
                                      type: "product",
                                      category: cat,
                                      id: p.id,
                                      name: p.nameSv,
                                    })
                                  }
                                  className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                >
                                  <Trash2 size={18} /> Ta bort
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {adminTab === "settings" && (
              <div
                className={`${
                  darkMode ? "bg-gray-800" : "bg-white"
                } rounded-xl p-6`}
              >
                <h3
                  className={`text-2xl font-bold mb-4 ${
                    darkMode ? "text-white" : ""
                  }`}
                >
                  Ställplatser & Leveranstider
                </h3>
                {campsites.map((c, i) => (
                  <div
                    key={i}
                    className={`mb-6 p-4 border-2 rounded-lg ${
                      darkMode ? "border-gray-600" : ""
                    }`}
                  >
                    {editCamp === i ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={c.name}
                          onChange={(e) => {
                            const n = [...campsites];
                            n[i].name = e.target.value;
                            setCampsites(n);
                          }}
                          className={`w-full p-3 border-2 rounded-lg font-bold ${
                            darkMode
                              ? "bg-gray-700 text-white border-gray-600"
                              : ""
                          }`}
                          placeholder="Namn på ställplats"
                        />
                        <div className="flex gap-2 items-center">
                          <label
                            className={`font-bold ${
                              darkMode ? "text-white" : ""
                            }`}
                          >
                            Leveranstid:
                          </label>
                          <input
                            type="time"
                            value={c.time}
                            onChange={(e) => {
                              const n = [...campsites];
                              n[i].time = e.target.value;
                              setCampsites(n);
                            }}
                            className={`flex-1 p-3 border-2 rounded-lg ${
                              darkMode
                                ? "bg-gray-700 text-white border-gray-600"
                                : ""
                            }`}
                          />
                        </div>
                        <div className="flex gap-3 items-center p-3 bg-blue-50 rounded-lg">
                          <input
                            type="checkbox"
                            id={`active-${i}`}
                            checked={c.active !== false}
                            onChange={(e) => {
                              const n = [...campsites];
                              n[i].active = e.target.checked;
                              setCampsites(n);
                            }}
                            className="w-5 h-5 cursor-pointer"
                          />
                          <label
                            htmlFor={`active-${i}`}
                            className={`font-bold cursor-pointer ${
                              darkMode ? "text-white" : ""
                            }`}
                          >
                            Aktiv (tillgänglig för bokning)
                          </label>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={async () => {
                              await window.storage.set(
                                "campsites",
                                JSON.stringify(campsites),
                                false
                              );
                              setEditCamp(null);
                            }}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                          >
                            <Save size={18} /> Spara
                          </button>
                          <button
                            onClick={() => {
                              setEditCamp(null);
                              loadInitialData();
                            }}
                            className="bg-gray-300 px-4 py-2 rounded-lg"
                          >
                            <X size={18} /> Avbryt
                          </button>
                          <button
                            onClick={() =>
                              setConfirmDelete({
                                type: "campsite",
                                index: i,
                                name: c.name,
                              })
                            }
                            className="bg-red-500 text-white px-4 py-2 rounded-lg ml-auto"
                          >
                            <Trash2 size={18} /> Ta bort
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <h4
                              className={`font-bold text-xl ${
                                darkMode ? "text-white" : ""
                              }`}
                            >
                              {c.name}
                            </h4>
                            {c.active === false && (
                              <span className="inline-block mt-1 bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-bold">
                                INAKTIV
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => setEditCamp(i)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                          >
                            <Edit2 size={18} />
                          </button>
                        </div>
                        <div
                          className={`${
                            c.active === false
                              ? "bg-gray-200 text-gray-600"
                              : "bg-green-100 text-green-800"
                          } px-4 py-2 rounded-lg font-bold inline-block`}
                        >
                          Leveranstid: {c.time}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={async () => {
                    const n = [
                      ...campsites,
                      { name: "Ny ställplats", time: "08:00", active: true },
                    ];
                    await window.storage.set(
                      "campsites",
                      JSON.stringify(n),
                      false
                    );
                    setCampsites(n);
                  }}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-bold"
                >
                  <Plus size={20} /> Lägg till ställplats
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {page !== "admin" && (
        <footer
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border-t-2 py-8 mt-12`}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h4
              className={`font-bold text-lg mb-3 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              ⚠️ Viktig information
            </h4>
            <div
              className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              } space-y-2`}
            >
              <p>
                • Alla produkter kan innehålla spår av allergener även om de
                inte är markerade.
              </p>
              <p>
                • Kontakta oss direkt om du har allvarliga allergier eller
                dietbehov.
              </p>
              <p>
                • Beställningar måste göras senast kl 20:00 dagen innan
                leverans.
              </p>
              <p>• Priserna kan ändras utan förvarning.</p>
              <p>• Vid avbokning inom 12 timmar kan avgift tillkomma.</p>
            </div>
            <p
              className={`mt-6 text-xs ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              © 2026 Husbilsfrukost - Alla rättigheter förbehållna
            </p>
            <button
              onClick={() => setPage("admin")}
              className={`mt-6 text-xs opacity-20 hover:opacity-60 transition-opacity duration-300 ${
                darkMode ? "text-gray-600" : "text-gray-400"
              }`}
            >
              • • •
            </button>
          </div>
        </footer>
      )}

      {confirmDelete && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setConfirmDelete(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4 text-red-600">
              ⚠️ Bekräfta borttagning
            </h3>
            <p className="text-lg mb-6">
              {confirmDelete.type === "product" &&
                `Vill du verkligen ta bort "${confirmDelete.name}"?`}
              {confirmDelete.type === "order" &&
                `Vill du verkligen ta bort order ${confirmDelete.num}?`}
              {confirmDelete.type === "campsite" &&
                `Vill du verkligen ta bort ställplatsen "${confirmDelete.name}"?`}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (confirmDelete.type === "product") {
                    deleteProduct(confirmDelete.category, confirmDelete.id);
                  } else if (confirmDelete.type === "order") {
                    deleteOrder(confirmDelete.num);
                  } else if (confirmDelete.type === "campsite") {
                    deleteCampsite(confirmDelete.index);
                  }
                }}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600"
              >
                Ja, ta bort
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 bg-gray-300 py-3 rounded-lg font-bold hover:bg-gray-400"
              >
                Avbryt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
