AUTO LOT — LOCAL TYCOON + SYNOXCLOUD NPC AI

ISI PAKET
- index.html: game tycoon lokal, katalog mobil populer Indonesia, save localStorage, pasar bertahap, dan halaman AI NPC.
- api/npc.js: Vercel Serverless Function; mencoba Unlimited AI, Gemma AI, Asynt AI, lalu Algolia.
- vercel.json: konfigurasi fungsi Vercel.

KATALOG MOBIL
Berisi model populer seperti Toyota Agya/Avanza/Calya/Rush/Raize/Innova/Fortuner, Honda Brio/HR-V/CR-V/Jazz/Civic, Daihatsu Ayla/Xenia/Sigra/Terios/Rocky, Mitsubishi Xpander/Pajero Sport, Suzuki Ertiga/XL7, Hyundai Stargazer, Wuling Confero, Mazda CX-5, dan lainnya.
Harga adalah estimasi acuan mobil bekas di Indonesia, bukan harga resmi real-time. Tahun, varian, kilometer, lokasi, pajak, riwayat, dan kondisi unit dapat mengubah harga secara signifikan. Setiap penawaran memiliki variasi harga dan kondisi.

PASAR BERTAHAP
- Pasar menampilkan maksimal 6 penawaran mobil sekaligus.
- Daftar penawaran berganti ketika hari permainan berakhir.
- Tombol Refresh menambahkan penawaran secara bertahap, bukan memenuhi pasar dengan semua model sekaligus.
- Saat game dibuka dengan save versi katalog fiksi lama, katalog pasar dan mobil awal fiksi dimigrasikan ke mobil Indonesia; saldo dan progres dealer tetap dipertahankan.

CARA JALANKAN GAME LOKAL
Buka index.html di browser. Save tersimpan di browser/perangkat ini.

CARA AKTIFKAN AI NPC
Fitur AI NPC memerlukan hosting yang menjalankan fungsi server (misalnya Vercel). Upload isi folder ini ke repository GitHub dan deploy ke Vercel. Halaman akan memanggil /api/npc.
Opsional: set environment variable SYNOXCLOUD_API_KEY di Vercel. Bila endpoint mengizinkan kunci FREE sesuai dokumentasi, variabel bisa tidak diisi.

CATATAN
- Endpoint menggunakan format yang user kirim; respons API belum diverifikasi langsung. Parser mencoba beberapa field umum.
- Empat endpoint percakapan diintegrasikan: Unlimited AI, Gemma AI, Asynt AI, Algolia. Bible AI tidak dipakai karena khusus topik Alkitab; AI Ranking bukan endpoint chat.
- AI menghasilkan dialog saja. Transaksi dan perubahan saldo tetap divalidasi oleh kode game.
