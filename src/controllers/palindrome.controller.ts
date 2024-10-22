import { RequestHandler } from "express";

// Fungsi untuk memeriksa apakah x adalah palindrome
function isPalindrome(x: number): boolean {
  if (x < 0) return false;
  const str = x.toString();
  const reversedStr = str.split("").reverse().join("");
  return str === reversedStr;
}

export const index: RequestHandler = (req, res) => {
  // Ambil parameter query `x`
  const { x } = req.query;

  // Validasi apakah x ada dan bisa dikonversi ke angka
  if (x === undefined || isNaN(Number(x))) {
    res.status(400).json({ error: "Parameter `x` harus berupa angka." });
  }

  // Konversi x ke number dan periksa apakah palindrome
  const num = Number(x);
  const result = isPalindrome(num);

  // Kembalikan hasilnya
  res.json({
    angka: x,
    palindrome: result
  });
};
