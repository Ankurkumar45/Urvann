# Urvann – Mini Plant Store

A full-stack Mini Plant Store web application built with ReactJS and Node.js/Express, backed by MongoDB. This project lets users browse, search, and filter a catalog of plants, while administrators can manage inventory directly from the app.

## Features

### 1. Plant Catalog (Frontend + Backend)
- Display a grid/list of all plants with:
  - **Plant Name**
  - **Price**
  - **Categories** (a plant can belong to multiple categories)
  - **Stock Availability** (True/False)
- Extensible for creative fields and customizations.

### 2. Search & Filter
- **Search by Name:** Find plants by name (case-insensitive).
- **Search by Category Keyword:** E.g., searching "home decor" shows Money Plant.
- **Filter by Category:** Dropdown for categories like Indoor, Outdoor, Succulent, etc.

### 3. Add Plant (Admin Feature)
- Form to add a new plant with:
  - Name
  - Price
  - Multiple Categories (support for more than one)
  - Availability
- Input validation before submission.

### 4. Responsive Frontend
- Looks great on desktop and mobile.
- Built with reusable React components.
- Handles loading and error states when fetching data.

### 5. Database Preparation
- Includes a mini database of at least **50 plants** with realistic names, prices, and categories.
- Categories: Indoor, Outdoor, Succulent, Air Purifying, Home Decor, etc.

## Tech Stack

- **Frontend:** ReactJS or NextJS (hooks, functional components, clean UI, responsive design)
- **Backend:** Node.js + Express
- **Database:** MongoDB (scalable, low latency)

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ankurkumar45/Urvann.git
   cd Urvann
   ```

2. **Install dependencies:**
   ```bash
   # For backend
   cd backend
   npm install

   # For frontend
   cd ../frontend
   npm install
   ```

3. **Set up MongoDB:**
   - Start a local MongoDB instance or set up a cloud MongoDB.
   - Add your MongoDB URI to the backend `.env` file.

4. **Seed the Database:**
   - Run the provided seed script (if available) to populate with sample plants.

5. **Run the application:**
   ```bash
   # Start backend
   cd backend
   npm start

   # Start frontend
   cd ../frontend
   npm start
   ```

6. **Visit:**  
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000` (default)

## Project Structure

```plaintext
Urvann/
├── backend/      # Node.js + Express API
│   ├── config/
│   ├── models/
│   ├── plants/   # Collection and Insertion of 50 plants json file
│   └── routs/
├── frontend/     # ReactJS app
│   ├── assets/
│   ├── Components/
│   └── Pages/
└── README.md
```

## Contributing

Contributions are welcome!  
- Fork the repo, make changes, and submit a pull request.
- Please create issues for bugs or feature requests.

## License

[MIT License](LICENSE)

## Contact

Developed by [Ankurkumar45](https://github.com/Ankurkumar45).  
Feel free to reach out for questions or feedback!
