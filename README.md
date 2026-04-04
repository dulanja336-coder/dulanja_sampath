# 🚀 W.M. Dulanja Samapath — Portfolio

A clean, animated personal portfolio website built with pure HTML, CSS & JavaScript.

---

## 📁 File Structure

```
portfolio/
├── index.html          ← Main page
├── css/
│   └── style.css       ← All styles
├── js/
│   ├── data.js         ← ✏️  EDIT THIS to update your info
│   └── main.js         ← Logic (no need to touch)
└── README.md
```

---

## ✏️ How to Update Your Portfolio

**Just edit `js/data.js`** — everything (name, skills, projects, links) is in one place.

```js
const PORTFOLIO_DATA = {
  name: "W.M. Dulanja Samapath",
  github: "https://github.com/YOUR-USERNAME",   // ← Change this
  email:  "your@email.com",                     // ← Change this
  skills: [ ... ],                              // ← Add/remove skills
  projects: [ ... ],                            // ← Add/remove projects
};
```

---

## 🌐 How to Publish on GitHub Pages (Free Hosting)

### Step 1 — Create a GitHub account
Go to https://github.com and sign up (free).

### Step 2 — Create a new repository
1. Click the **+** button → **New repository**
2. Name it: `your-username.github.io`  *(replace with your actual GitHub username)*
3. Set to **Public**
4. Click **Create repository**

### Step 3 — Upload your files
1. In the repo page, click **Add file → Upload files**
2. Drag & drop ALL files:
   - `index.html`
   - `css/style.css`
   - `js/data.js`
   - `js/main.js`
3. Scroll down → Click **Commit changes**

### Step 4 — Enable GitHub Pages
1. Go to **Settings** tab of your repo
2. Scroll to **Pages** (left sidebar)
3. Under **Source** → Select **Deploy from a branch**
4. Branch: **main** → Folder: **/ (root)**
5. Click **Save**

### Step 5 — Done! 🎉
Your portfolio will be live at:  
**`https://your-username.github.io`**

*(Takes about 1–2 minutes to go live after enabling)*

---

## 💡 Tips

- Replace the `DS` avatar with your actual photo by adding an `<img>` tag in `index.html`
- Add more projects in `data.js` — they auto-generate on the page
- The contact form opens your email client automatically (works offline!)

---

Built with ❤ by W.M. Dulanja Samapath
