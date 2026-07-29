# 🚀 aidevs.uz - O'zbekistonning Eng Yirik AI va Dasturchilar Hamjamiyati

Aidevs.uz — bu mahalliy dasturchilar, sun'iy intellekt ixlosmandlari va IT mutaxassislari uchun yaratilgan eng zamonaviy (Hyper-Modern) ijtimoiy tarmoq va vositalar platformasi. Loyiha jahon standartlaridagi **Vercel, Supabase, Linear** kabi kompaniyalarning "Developer Tools" vizual dizayn qoidalari asosida qurilgan.

---

## 🎨 Dizayn va UI/UX Arxitekturasi (Design Language)

Loyiha butunlay "Dark Mode First" (Faqat tungi rejim) falsafasida yaratilgan bo'lib, quyidagi ilg'or vizual effektlarni o'z ichiga oladi:

- **Glassmorphism (Shishasimon effekt):** Barcha kartalar, formalar va panellar yarim shaffof (translucent), orqasi xiralashtirilgan (backdrop-blur) va nozik oq hoshiyalar (white/10 border) bilan ishlangan.
- **Bento Grid Layout:** Xususiyatlar va imkoniyatlar bir xil zerikarli qutilarda emas, balki Apple uslubidagi turli o'lchamdagi "Bento Box" larda joylashtirilgan.
- **Hyper-Modern Animations (Framer Motion):**
  - **Sichqoncha kuzatuvi (Cursor Glow):** Foydalanuvchi kursori harakatiga qarab yorishadigan (Radial gradient) orqa fon effektlari.
  - **Parallax 3D & Floating Elements:** Sahifani skroll qilganda turli tezlikda harakatlanuvchi fonga singib ketgan 3D elementlar va yorug'lik sharlari.
  - **Animated Shiny Text:** Tugmalar va sarlavhalarda uzluksiz yaltirab o'tuvchi gradient (Gradient-X) nurlari.
- **Premium Typografiya:** Inter (asosiy matnlar) va JetBrains Mono (kod va terminal qismlari) shriftlari kombinatsiyasi.

---

## ✨ Asosiy Funksiyalar va Sahifalar (Features)

### 1. 🏠 Bosh Sahifa (Home Page - `/`)
- **Interaktiv Hero:** Matnlar yonida vizual "Kod Redaktor" terminali bo'lib, unda go'yoki haqiqiy vaqtda kod yozilayotgan (Typing Effect) animatsiyasi ishlaydi.
- **Texnologiyalar Oqimi (Marquee):** Loyiha integratsiya qilingan yoki qo'llab-quvvatlaydigan mashhur texnologiyalar (React, Next.js, Python va h.k.) logotiplari qatorlashib harakatlanib turadi.
- **Lenta (Feed) Preview:** Hamjamiyatdagi so'nggi postlar, kod snippetlari va yangiliklar ko'rinib turadigan chiroyli qism.

### 2. 🔐 Avtorizatsiya va Navbar (Auth System)
- **Sessiyani boshqarish (Supabase Auth):** Foydalanuvchi tizimga kirgan yoki kirmaganiga qarab Navbar avtomatik moslashadi.
- **Profil Dropdown:** Tizimga kirgan foydalanuvchilar "Kirish" tugmasi o'rniga o'zlarining avatarlarini (Profil rasmini) ko'radilar.

### 3. 👤 Premium Profil Sahifasi (`/profile/[username]`)
- **Cover Banner & Overlap:** Profil tepasida chiroyli yaltiroq fon (Banner) va uning ustiga chiqib turadigan Avatar (GitHub/Twitter uslubi).
- **Yutuqlar va Ko'nikmalar (Badges):** Foydalanuvchi erishgan yutuqlarga sichqoncha olib borilganda (hover) 3D ko'tarilish va neon yorug'lik taratish effekti.
- **Faollik tarixi:** Foydalanuvchining so'nggi postlari, yechgan muammolari va ulashgan promptlari tarixi.

### 4. ⚙️ Profilni Tahrirlash (`/profile/edit`)
- **Yangi avlod shakllari (Next-gen Forms):** To'liq Glassmorphism uslubidagi katta, foydalanishga qulay formalar.
- Asosiy ma'lumotlar, bio va ijtimoiy tarmoqlar (GitHub, LinkedIn, Portfolio) havolalarini yangilash imkoniyati.
- "Hover" qilinganda rasmni almashtirishni so'rovchi interaktiv Avatar hududi.

### 5. 💬 Hamjamiyat / Chat (`/community`)
- **Discord/Slack uslubi:** Dasturchilar real vaqt rejimida suhbatlashishi uchun boyitilgan interfeys.
- **Aqlli Textarea:** Xabar yozish maydoni yozilgan matn hajmiga qarab o'z-o'zidan moslashadi (Auto-resize) va Markdown formatini qo'llab-quvvatlaydi.
- **Onlayn Indikatorlar:** Foydalanuvchilar rasmida tarmoqda ekanligini bildiruvchi yashil nuqta (Online Status).

### 6. 💼 Karyera va Vakansiyalar (`/jobs`)
- **Split-pane Arxitekturasi (Otta/Wellfound uslubi):** Ekran ikki qismga bo'lingan. Chap tomonda ish o'rinlari (vakansiyalar) ro'yxati, o'ng tomonda esa tanlangan ishning to'liq ma'lumotlari. Sahifani yangilamasdan barcha ma'lumotlarni o'qish mumkin.
- Ish qidirish qutisi (Search) filtrlari va chiroyli piktogrammalar.

---

## 🛠️ Texnologiyalar Steki (Tech Stack)

* **Asosiy Framework:** Next.js 15 (App Router)
* **Kutubxona:** React 19
* **Dasturlash tili:** TypeScript
* **Stillashtirish:** Tailwind CSS v4
* **UI Komponentlar:** Shadcn UI + Lucide Icons
* **Animatsiyalar:** Framer Motion
* **Ma'lumotlar bazasi va Backend:** Supabase (Auth, DB)

---

## 🚀 Qanday ishga tushiriladi?

Loyihani o'z kompyuteringizda sinab ko'rish uchun quyidagi buyruqlarni ishlating:

\`\`\`bash
# 1. Loyihani yuklab oling yoki oching
cd aidevs

# 2. Paketlarni o'rnating
npm install

# 3. Dasturni ishlab chiquvchi rejimida (dev) ishga tushiring
npm run dev
\`\`\`

Brauzeringizda `http://localhost:3000` manziliga kiring va sehrdan bahramand bo'ling!
