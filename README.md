# AppWrite Blog Platform

A modern, full-stack blogging platform built with React (Vite), AppWrite, Tailwind CSS, and Redux. This application supports user authentication, blog creation with rich text editing, image uploads, and more.

## 🌐 Live Demo
[https://app-write-project-blog.vercel.app/]

## 📑 Figma Design
   Took inspiration from
[https://www.figma.com/community/file/1235152009438565697]
## 📁 Project Structure
```
AppWriteProjectBlog/
├── public/
├── src/
│   ├── appwrite/
│   │   └── Blogs.js
│   ├── components/
│   │   ├── BlogCard.jsx
│   │   ├── DeleteToggle.jsx
│   │   └── UserBlog.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── User.jsx
│   │   ├── SearchPage.jsx
│   │   └── CreateBlog.jsx
│   ├── redux/
│   │   ├── authSlice.js
│   │   └── store.js
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
└── README.md
```

## 🚀 Features
* **User Authentication**: Sign up, log in, and manage user sessions.
* **Blog Management**: Create, edit, delete, and view blogs with rich text content.
* **Image Uploads**: Upload and manage blog images using AppWrite's storage.
* **Search Functionality**: Search blogs by title, tags, or content.
* **Responsive Design**: Fully responsive UI built with Tailwind CSS.
* **Pagination**: Navigate through blogs with pagination controls.

## 🛠️ Getting Started

### Prerequisites
* **Node.js** (v14 or higher)
* **Vite** (for development server)
* **AppWrite** (self-hosted or cloud instance)

### Installation
1. **Clone the Repository**
```bash
git clone https://github.com/Himanshu-Khairnar/AppWriteProjectBlog.git
cd AppWriteProjectBlog
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Environment Variables**
Create a `.env` file in the root directory and populate it with your AppWrite credentials:
```env
VITE_APP_APPWRITE_URL=your_appwrite_endpoint
VITE_APP_PROJECT_ID=your_project_id
VITE_APP_DATABASE_ID=your_database_id
VITE_APP_COLLECTION_ID=your_blogs_collection_id
VITE_APP_BUCKET_ID=your_bucket_id
VITE_APP_COLLECTION_USER=your_users_collection_id
VITE_APP_RICH_TEXT_EDITOR=your_rich_text_editor_config
VITE_APP_RESEND=your_resend_service_key
```
**Note**: Replace the placeholders with your actual AppWrite project details.

4. **Run the Development Server**
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 📦 Deployment
To build the application for production:
```bash
npm run build
```
The optimized files will be in the `dist` directory. You can deploy these files to any static hosting service like Vercel, Netlify, or GitHub Pages.

## 🧪 Testing
**Note**: Testing scripts and configurations are not included in the current setup. You can integrate testing libraries like Jest or React Testing Library as needed.

## 📊 Codebase Statistics
* **Total Lines of Code**: ~2,580 LOC
* **Main Technologies**:
   * React (Vite)
   * AppWrite
   * Tailwind CSS
   * Redux Toolkit
   * Lucide Icons

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 📄 License
This project is licensed under the MIT License.