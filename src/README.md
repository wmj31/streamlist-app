# 🎬 StreamList - EZTechMovie App

StreamList is a React-based web application that allows users to search, save, and track movies using the [TMDB API](https://www.themoviedb.org/documentation/api). Users can create accounts, build a personal movie cart, move titles to a streaming list, and mark movies as watched — all while preserving their preferences using Local Storage.

---

## 🚀 Features

- 🔍 **Search Movies** via TMDB API
- 🎞️ View posters, titles, and metadata on a modern interface
- 🛒 **Add to Cart** functionality
- 🎬 **Move to StreamList** from Cart
- ✅ **Mark as Watched / Unwatched**
- 🗑️ **Delete** movies from StreamList
- 🔐 **Create Account / Login** system
- 💾 Data stored in **Local Storage** (persists after page refresh)
- ⚡ Clean, mobile-friendly, Netflix-style UI

---

## 🛠️ Technologies Used

- **React.js**
- **React Router**
- **TMDB API**
- **Local Storage**
- **React Toastify** (for notifications)
- **Font Awesome** (icons)
- **Custom CSS** (Netflix-style layout)

---

## 📸 Screenshots

![Login](./screenshots/login.png)
![Movies](./screenshots/movies.png)
![Cart](./screenshots/cart.png)
![StreamList](./screenshots/streamlist.png)

> *(Optional: include screenshots or animated GIFs to demo flow)*

---

## 📂 How It Works

1. User creates an account or logs in.
2. User can browse movies (fetched from TMDB API).
3. Movies can be added to a Cart.
4. Cart items can be moved to a StreamList.
5. On the StreamList page, users can:
   - Mark items as Watched ✅
   - Delete items 🗑️
6. All actions are persisted in localStorage tied to the user.

---

## 🧪 Getting Started

1. Clone the repo  
   ```bash
   git clone https://github.com/wmj31/streamlist-app