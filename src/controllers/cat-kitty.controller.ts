import { RequestHandler } from "express";

// Menyimpan aturan dinamis
const rules: { angka: number; output: string }[] = [];

// Fungsi untuk menambah aturan
const addRule = (angka: number, output: string) => {
  rules.push({ angka, output });
};

// Fungsi utama catKitty yang mengembalikan hasil
const catKittyWithRules = (n: number) => {
  const result: (string | number)[] = [];

  for (let i = 1; i <= n; i++) {
    let printed = false;

    for (const rule of rules) {
      if (i === rule.angka) {
        result.push(rule.output);
        printed = true;
        break;
      }
    }

    if (!printed) {
      if (i % 3 === 0 && i % 5 === 0) {
        result.push("catKitty");
      } else if (i % 3 === 0) {
        result.push("cat");
      } else if (i % 5 === 0) {
        result.push("kitty");
      } else {
        result.push(i);
      }
    }
  }

  return result;
};

// Method untuk menambahkan aturan baru
export const addRules: RequestHandler = (req, res) => {
  const { angka, output } = req.query;

  // Validasi input
  if (!angka || !output || isNaN(Number(angka))) {
    res.status(400).json({ error: "Parameter angka dan output harus valid" });
  }

  addRule(Number(angka), output as string);
  res.json({ message: `Rule added: ${angka} -> ${output}` });
};

// Method untuk menjalankan catKitty dengan aturan
export const catKitty: RequestHandler = (req, res) => {
  const { n } = req.query;

  // Validasi input
  if (!n || isNaN(Number(n))) {
    res.status(400).json({ error: "Parameter n harus berupa angka" });
  }

  const result = catKittyWithRules(Number(n));
  res.json({ result });
};
