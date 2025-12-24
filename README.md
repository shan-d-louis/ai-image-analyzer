# AI Image Analyzer

## Description

AI Image Analyzer is a web application that uses **MobileNetV2**, a pre-trained deep learning model, to classify images uploaded by users. It features a backend built with **FastAPI** and a frontend built with **React**. Users can upload an image, and the app will return predictions of what the image contains, along with the top 3 probable labels and their confidence scores.

## Installation

### Prerequisites

* Python 3.7+
* Node.js and npm (for the frontend)
* A virtual environment (recommended)

### Step-by-Step Setup

#### 1. **Backend Setup (FastAPI)**

1. **Clone the repository**:

   ```
   git clone https://github.com/your-username/AI-Image-Analyzer.git
   cd AI-Image-Analyzer
   ```

2. **Set up the virtual environment**:

   ```
   python3 -m venv .venv
   ```

3. **Activate the virtual environment**:

   * On Windows:

     ```
     .\.venv\Scripts\activate
     ```
   * On macOS/Linux:

     ```
     source .venv/bin/activate
     ```

4. **Install backend dependencies**:

   ```
   pip install -r requirements.txt
   ```

   If you don't have a `requirements.txt` file, you can manually install the required dependencies:

   ```
   pip install tensorflow opencv-python fastapi pillow uvicorn
   ```

5. **Run the backend**:

   ```
   uvicorn main:app --reload
   ```

   This will start the FastAPI server at `http://127.0.0.1:8000`.

#### 2. **Frontend Setup (React)**

1. **Navigate to the frontend folder**:

   ```
   cd frontend/image-classifier-frontend
   ```

2. **Install frontend dependencies**:

   ```
   npm install
   ```

3. **Run the React app**:

   ```
   npm start
   ```

   This will start the React frontend at `http://localhost:3000`.

### Usage

1. **Backend API**:
   The backend exposes a `/classify` endpoint where users can upload images for classification. It returns the top 3 predictions and their confidence scores.
   Example:

   * **POST /classify**

     * **Request**: Upload an image file.
     * **Response**: Top 3 predictions with labels and confidence scores.

2. **Frontend**:

   * Visit `http://localhost:3000`.
   * Upload an image by clicking on the "Choose file" button.
   * Click the "Classify" button to get predictions.
   * The image preview and predictions (labels and confidence scores) will appear.

### Example Usage

1. **Upload an image** using the React frontend.
2. The backend will process the image and classify it using the MobileNetV2 model.
3. The frontend will display the image preview along with the predicted labels and their respective confidence percentages.

## Project Structure

```
AI-IMAGE-ANALYZER/
│
├── .venv/                      # Virtual environment for backend
├── frontend/                   # React frontend code
│   └── image-classifier-frontend/
│       ├── src/
│       ├── public/
│       └── package.json        # Frontend dependencies
│
├── .env                        # Environment variables
├── .python-version             # Python version
├── main.py                     # Backend logic (FastAPI app)
├── pyproject.toml              # Project metadata
├── README.md                   # This README file
└── requirements.txt            # Backend dependencies list
```

## Dependencies

### Backend

* **OpenCV**: For image processing (e.g., resizing the image).
* **TensorFlow**: To load and use the MobileNetV2 model.
* **FastAPI**: To create the backend API.
* **Pillow**: To handle image files.
* **Uvicorn**: ASGI server to run FastAPI.

### Frontend

* **React**: The frontend framework for the user interface.
* **Axios**: For making HTTP requests to the FastAPI backend.
* **Tailwind CSS**: For styling the frontend (or any other CSS framework you are using).

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push the changes to your fork (`git push origin feature-name`).
5. Submit a pull request.
