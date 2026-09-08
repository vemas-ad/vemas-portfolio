# Deploy Portfolio Vemas — GitHub + Vercel + Subdomain DomaiNesia

## Tujuan
Setelah deploy, portfolio berjalan 24/7 di server Vercel. Laptop tidak perlu hidup dan VS Code/Python tidak perlu dijalankan lagi.

## A. Upload ke GitHub tanpa command line
1. Ekstrak file `Vemas_Portfolio_GITHUB_VERCEL_READY_FINAL.zip`.
2. Login ke https://github.com.
3. Klik **New repository**.
4. Nama repo yang disarankan: `vemas-portfolio`.
5. Pilih **Private** atau **Public**. Vercel dapat mengimpor repository GitHub setelah diberi izin.
6. Setelah repository dibuat, klik **Add file → Upload files**.
7. Upload seluruh isi folder hasil ekstrak. Pastikan `index.html`, `login.html`, `project.html`, folder `assets`, `css`, `js`, dan `docs` langsung berada di root repository, bukan di dalam folder tambahan.
8. Klik **Commit changes**.

## B. Hubungkan GitHub ke Vercel
1. Buka https://vercel.com dan login menggunakan GitHub.
2. Klik **Add New → Project**.
3. Pilih repository `vemas-portfolio`, lalu **Import**.
4. Framework Preset: **Other**.
5. Root Directory: `./`.
6. Build Command: kosong / tidak perlu.
7. Output Directory: kosong / tidak perlu.
8. Klik **Deploy**.
9. Setelah selesai, Vercel memberi URL seperti `https://vemas-portfolio.vercel.app`.
10. Tes dari HP menggunakan jaringan seluler dan pastikan login, halaman project, gambar, video, CV, dan dokumen dapat dibuka.

## C. Hubungkan subdomain DomaiNesia ke Vercel
Contoh: jika domain utama masjid adalah `contoh.com`, gunakan `portfolio.contoh.com` atau `vemas.contoh.com`.

1. Di Vercel: buka Project → **Settings → Domains**.
2. Tambahkan `portfolio.domainanda.com`.
3. Vercel akan menampilkan DNS record yang harus dibuat. Untuk subdomain biasanya berupa CNAME. **Gunakan target yang ditampilkan Vercel; jangan menebak targetnya.**
4. Login MyDomaiNesia → pilih domain → **DNS Management**.
5. Pastikan DNS authoritative domain memang dikelola di DomaiNesia. Jika nameserver domain memakai Cloudflare/provider lain, record harus dibuat di provider tersebut, bukan di DomaiNesia.
6. Tambahkan record sesuai instruksi Vercel. Umumnya:
   - Host/Name: `portfolio`
   - Type: `CNAME`
   - Target/Value: nilai persis yang diberikan Vercel
   - TTL: Default/Auto
7. Pastikan tidak ada A/AAAA/CNAME lain dengan host `portfolio` yang bentrok. Jika sebelumnya membuat subdomain lewat cPanel dan terbentuk A record otomatis, hapus record yang konflik sebelum memakai CNAME Vercel.
8. Tunggu propagasi DNS. Setelah terverifikasi, Vercel akan menyediakan HTTPS/SSL untuk domain tersebut.
9. Tes `https://portfolio.domainanda.com` dari HP/incognito.

## D. Update portfolio di masa depan
1. Edit source di folder `site_src`/`portfolio_data.json`, lalu jalankan `python build.py` untuk membentuk folder `public` baru.
2. Upload/commit perubahan folder deploy-ready ke GitHub.
3. Vercel otomatis melakukan redeploy setiap kali branch yang terhubung mendapat commit baru.

## Login portfolio
- Email: `vemasardiyan@student.ppns.ac.id`
- Password: `akubisa`

Catatan keamanan: login versi ini bersifat client-side access gate, bukan autentikasi server untuk data rahasia. Jangan menaruh password, API key, token, NIK, scan identitas sensitif, atau secret project pada website.
