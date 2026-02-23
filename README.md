# 🎓 College Website Project

A MBA College Website built using HTML, CSS, and JavaScript.

This project follows a component-based architecture where sections like header, navbar, events, and placement are separated into individual files and loaded dynamically using JavaScript.

## 🚀 How to Run the Project Locally

⚠️ IMPORTANT:  
Do NOT open `index.html` directly by double-clicking it.  
It will NOT work because browsers block `fetch()` when using the `file://` protocol.

Since this project loads components dynamically using `fetch()`, it must be run using a local server.


### 🐍 Method 1: Using Python (Recommended)

1️⃣ Open terminal inside the project folder:
XYZ

2️⃣ Run the following command:
python -m http.server 8000 

3️⃣ Open your browser and go to:
http://localhost:8000
The website will now run correctly.
