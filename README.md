# Wonderlust-rental-website
a rental website with made by using mern-stack



 🏠 WanderLust | A Full-Stack Rental Marketplace

Welcome to **WanderLust**, a comprehensive web application that allows users to list, explore, and book unique rental properties around the world. Built with the **MEN stack** (MongoDB, Express, Node.js) and server-side rendering using **EJS**.

<img width="1899" height="967" alt="Image" src="https://github.com/user-attachments/assets/354fa794-5c80-4bc2-b43a-e7e2b1bbcde1" />


🌟 Key Functionalities

* **User Authentication:** Secure Signup and Login using `Passport.js` with local strategy.
* **Property Management (CRUD):** Users can Create, Read, Update, and Delete their own property listings.
* **Image Uploads:** Integrated with **Cloudinary** via `multer` for high-quality cloud-based image storage.
* **Form Validation:** Robust data validation using **Joi** to ensure no junk data enters the database.
* **Flash Messaging:** Instant feedback for user actions (e.g., "Listing Created Successfully!") using `connect-flash`.
* **Session Management:** Secure cookie-based sessions for a seamless browsing experience.

<img width="1914" height="966" alt="Image" src="https://github.com/user-attachments/assets/5381d699-99ea-4f62-a90b-34dfd6ce0c87" />

🛠️ Tech Architecture

* **Backend:** Node.js & Express.js
* **Database:** MongoDB (via Mongoose ODM)
* **Templating Engine:** EJS with `ejs-mate` for layouts
* **Security:** `passport-local-mongoose` for hashed passwords
* **Middleware:** `method-override` for PUT/DELETE requests, `cookie-parser`, and `express-session`

---

🚀 Getting Started

To get this project running on your local machine:

1. **Clone the repo:**
```bash
git clone https://github.com/rahulshky/MajorProject.git
cd MajorProject

```


2. **Install Dependencies:**
```bash
npm install package.json

```

This was built as a Major Project. If you have suggestions or want to improve the UI/UX, feel free to fork the repo and submit a PR!


## 📊 Database Schema & Flow

Project ka structure **MVC (Model-View-Controller)** pattern par based hai.

1. **User Schema:** Handle karta hai authentication aur authorization.
2. **Listing Schema:** Isme property ki details like title, description, image, price, aur location save hoti hain.
3. **Review Schema:** Har listing ke saath linked hai (One-to-Many relationship).

---




### 3. Initialize Database (Crucial Step) 🛠️

Website ko start karne se pehle, database mein sample listings load karni padengi. Iske liye `init` folder ka use karein:

```bash
cd init
node index.js
cd ..

```




Now visit: `http://localhost:3000/listings`

---

## 📂 Project Highlights

* **Image Uploads:** Direct upload to Cloudinary with `multer-storage-cloudinary`.
* **Error Handling:** Custom `ExpressError` class aur async wrap functions ka use kiya gaya hai.
* **Responsive UI:** Bootstrap aur custom CSS ka mix use karke mobile-friendly design banaya hai.
* **Flash Messages:** Success/Error alerts ke liye `connect-flash`.


4. **Environment Setup:**(optional if you want to store data in cloud)
Create a `.env` file in the root directory and add your credentials:
```env
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
SECRET=your_session_secret
ATLASDB_URL=your_mongodb_connection_string
```


5. **Run the Server:**
```bash
nodemon app.js

```


Open `http://localhost:8080` in your browser.

---

 📂 Project Structure Highlights

* `/models`: Mongoose schemas for Listings, Reviews, and Users.
* `/views`: EJS templates for the frontend UI.
* `/routes`: Organized Express routes for cleaner code.
* `/utils`: Custom error handling and validation logic.
