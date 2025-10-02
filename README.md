# React Movie App 🎬

This project is a responsive, React-based movie application that connects to the FM-DB API — a public, user-contributed movie database — to allow users to search for movies and view basic information like titles, posters, release years, and overviews.

This is a **demo project** created as part of my personal development portfolio to reinforce key React, TypeScript, and API integration concepts.

🔗 [Live Site] (https://react-typescript-movie-app.onrender.com)

---

## 🚀 Features

- 🔎 **Movie Search**: Users can search by title (e.g., "Deadpool", "Inception")
- 📈 **Trending Section**: Displays default movies on homepage using hardcoded keywords (dev choice due to limited API features)
- ❤️ **Favorites**: Users can save/remove favorite movies, persisted in `localStorage`
- 🎬 **Watch Trailers**: Fetches and plays movie trailers in a modal (with graceful fallback)
- ⚙️ **State Management**: Favorites managed globally using `React Context + useReducer`
- 🔁 **Routing**: Client-side routing via `React Router` (`Home` and `Favorites`)
- 🧼 **Sanitization**: User input is sanitized before making API calls
- ⚠️ **Error Handling**: Displays fallback UI if API calls fail or no results are found

---

## 🧠 What I Learned

- Structuring a React + TypeScript application from scratch
- Creating and consuming a global context with custom hooks
- Working with 3rd-party public APIs using Axios
- Reusable and composable component design (`MovieCard`, `Modal`, `Form`, etc.)
- LocalStorage for persistent state across page reloads
- Handling async operations with loading states and error boundaries
- Accessibility practices like semantic HTML, alt text, focus outlines, and ARIA roles
- Building responsive UIs using utility-first CSS (Tailwind)

---

## 🛠️ Technologies Used

- **React** & **TypeScript** (with Vite)
- **Tailwind CSS** for styling
- **React Router DOM** for routing
- **Axios** for HTTP requests
- **Context API** for global state
- **localStorage API** for persistence
- **FM-DB API** (free, user-contributed movie data)

---

## ⚠️ Disclaimer

> **Disclaimer**
>
> This application uses the [FM-DB API](https://fm-db.com), a free, user-maintained movie database that serves data and images contributed by its users.
>
> The data is used in compliance with the [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.html), which applies to all content served by FM-DB.
>
> This project is **strictly non-commercial** and created solely for **educational and personal portfolio purposes**.
>
> No media is stored, modified, or redistributed.  
> This project is **not affiliated with or endorsed by IMDb, FM-DB, or any rights holders.**

---

## 📄 License

This project’s **code** is licensed under the [MIT License](LICENSE).  
However, the **data and images** shown in the app are provided by [FM-DB](https://fmdbweb.github.io/) under the GNU AGPL v3 license, and are intended for non-commercial, educational use only.

---

## 🙏 Acknowledgements

- Movie data provided by [FM-DB API](https://fm-db.com) _(no API key required)_

---

## 📁 Project Status

✅ Complete  
📌 Educational/portfolio project only — not for production or distribution
