AUTO LOT — LOCAL TYCOON + SYN OXCLOUD NPC AI

ISI PAKET
- index.html: game tycoon lokal dengan save localStorage dan halaman AI NPC.
- api/npc.js: Vercel Serverless Function; mencoba Unlimited AI, Gemma AI, Asynt AI, lalu Algolia.
- vercel.json: konfigurasi fungsi Vercel.

CARA JALANKAN GAME LOKAL
Buka index.html di browser untuk fitur game dasar. Save disimpan di browser/perangkat.

CARA AKTIFKAN AI NPC
Fitur AI NPC memerlukan hosting yang menjalankan fungsi server (misalnya Vercel). Upload isi folder ini ke repository GitHub dan deploy ke Vercel. Setelah deploy, halaman akan memanggil /api/npc.
Opsional: set environment variable SYNOXCLOUD_API_KEY di Vercel. Bila endpoint mengizinkan kunci FREE sesuai dokumentasi, variabel bisa tidak diisi.

CATATAN PENTING
- Endpoint memakai format yang user kirim; response JSON belum diverifikasi di lingkungan ini. Parser mencoba beberapa field umum. Bila provider mengembalikan format lain, sesuaikan extractText() di api/npc.js.
- Bible AI tidak dipakai untuk NPC karena domainnya khusus Alkitab. AI Ranking bukan endpoint chat. Empat endpoint percakapan diintegrasikan: Unlimited AI, Gemma AI, Asynt AI, Algolia.
- AI hanya membuat dialog. Game tidak otomatis melakukan transaksi berdasarkan teks AI.
- Tanpa deploy backend, game lokal tetap bisa dimainkan tetapi chat NPC jatuh ke mode lokal.
