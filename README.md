# Tools4Genz Telegram Mini App (TMA) 🚀

Tools4Genz ka official Telegram Mini App, specially designed for Gen-Z creators, developers, aur students ke liye.

---

## ✨ Features Included

1. **🔥 ₹19 Instant Portfolio Deal:**
   - Interactive Portfolio Builder with Live Preview.
   - Collects Name, Role, Bio, Skills, GitHub & Subdomain choice (`naam.tools4genz.com`).
   - Multiple themes (Cyberpunk Neon, Hacker CLI, Dark Studio).
   - Instant UPI payment QR code (`upi://pay?pa=tools4genz@upi&am=19`).
   - 1-click **"Send Order to Telegram"** button (pre-fills structured order details into Telegram chat).

2. **💼 Custom Website & App Orders:**
   - Order intake for Portfolios, Landing Pages, Full-stack SaaS, E-commerce, Telegram Bots, and Cloud POS.
   - Budget selection (₹999 - ₹10,000+) & Timeline selector.
   - Direct dispatch to Telegram DM.

3. **🛠 In-App Pocket Dev Tools:**
   - **Smart QR Code Generator:** Custom colors, live rendering, instant download.
   - **Ultra-Strong Password Generator:** Customizable length, symbols, numbers, 1-tap copy.
   - **Dev Case & Slug Converter:** kebab-case, camelCase, snake_case with 1-click copy.
   - Direct launcher for full Tools4Genz web utilities (PDF, ATS Resume Builder, Audit AI, Deepfake detector).

4. **📁 Showcase & Live Projects:**
   - Tools4Genz Flagship SaaS: **Audit AI**, **ContactMeQR**, **Cloud POS & Billing**, **FriendsClub**, **ATS Resume Builder**.
   - Live Client Portfolios showcase: Alok Modanwal, Omkar Dev, Parbat Tech, Urvashi Studio.

5. **👤 Telegram Native Integration:**
   - Auto-reads user Telegram profile (`first_name`, `username`, `id`, avatar) via `Telegram.WebApp.initDataUnsafe`.
   - Native Haptic Feedback on button taps (`impactOccurred`, `notificationOccurred`).
   - Share Mini App link generator (`t.me/share/url`).
   - Full dark-mode cyberpunk glassmorphism UI.

---

## 💻 Local Development

```bash
cd tools4genz-telegram-miniapp
npm install
npm run dev
```

Build for production:
```bash
npm run build
```
Output directory: `dist/` (includes `_headers` and `_redirects` preconfigured for Cloudflare Pages and Telegram iframes).

---

## 🌐 tools4genz.com se Connect & Deploy Kaise Karein

### Step 1: Cloudflare Pages par Deploy
1. Is repository ko GitHub par push karein:
   ```bash
   git init
   git add .
   git commit -m "feat: tools4genz telegram mini app"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Cloudflare Dashboard me jayein -> **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Settings:
   - **Framework Preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Click **Save and Deploy**.

### Step 2: Custom Domain Attach (`tma.tools4genz.com`)
1. Cloudflare Pages project ke **Custom domains** tab me jayein.
2. **Set up a custom domain** par click karein aur enter karein:
   `tma.tools4genz.com` (ya `telegram.tools4genz.com`).
3. Cloudflare automatically DNS CNAME create aur SSL certificate issue kar dega!

---

## 🤖 Telegram Bot & BotFather se Attach Kaise Karein

1. Telegram par `@BotFather` open karein.
2. Bot banayein (agar pehle se nahi hai):
   ```
   /newbot
   Name: Tools4Genz App
   Username: Tools4GenzBot
   ```
3. Mini App attach karein:
   ```
   /newapp
   ```
   - Apna bot select karein (`@Tools4GenzBot`).
   - Title: `Tools4Genz`
   - Short description: `Build ₹19 Portfolios, Order Custom Websites & Dev Tools`
   - Upload 640x360 image/photo.
   - **Web App URL:** `https://tma.tools4genz.com`
   - Short name: `app` (Aapka link ban jayega: `t.me/Tools4GenzBot/app`).
4. Bottom Menu Button set karein (taaki chat me permanent button dikhe):
   ```
   /setmenubutton
   ```
   - Bot select karein -> Enter button text: `Launch App` -> Enter URL: `https://tma.tools4genz.com`.
