import cv2      #OpenCV's Python interface
import numpy    
from tensorflow.keras.applications.mobilenet_v2 import (
    MobileNetV2,            #Lightweight AI Model for Image Classifitcation
    preprocess_input,       #Modifies the input to make it suitable for MobileNetV2
    decode_predictions      #Translates the model's output into human-readbable form
)
from PIL import Image       #Python Imaging Library is for Image Handling
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import io
import uvicorn

def load_model():           #Returns the pre-trained Model for Image Classification
    model = MobileNetV2(weights="imagenet")     #returns a MobileNetV2 model that is trained on the ImageNet dataset
    return model

def preprocess_image(image):        #To convert the input image into a form understandable by the MobileNetV2 model
    if image.mode != "RGB":
        image = image.convert("RGB")
    
    img = numpy.array(image)        #Converts the image into an array containing the pixels of the image in the form of rows and columns. Each item in the grid would be another array representing the individual pixel and the elements of this array would represent the color channel of that pixel (eg: [R, G, B]) 
    img = cv2.resize(img, (224, 224))       #Resizes the input image to make it acceptable for MobileNetV2. Note: This causes innaccuracies in Image Detection of Large Images
    img = preprocess_input(img)             #Preprocesses the image for the model
    img = numpy.expand_dims(img, axis=0)       #Adding an extra dimension to the Image as MobileNetV2 generally accepts a list of images instead of just 1 image. So we are enclosing our image in a list
    return img

def classify_image(model, image):
    try:
        processed_image = preprocess_image(image)
        predictions = model.predict(processed_image)        #Passing into the model for Image Classification
        decoded_predictions = decode_predictions(predictions, top=3)[0]     #MobileNetV2 Model returns an array of percentages. Each percentage has a corresponding label (eg: for [0.9, 0.05, 0.025] may have the corresponding labels [dog, cat, mouse]). This statement decodes the array of top 3 highest percentages into their corresponding label and returns the highest likely label (hence the [0])
        return decoded_predictions

    except Exception as e:
        return {"Error" : {str(e)}}

#Creating API

app = FastAPI()

app.add_middleware(CORSMiddleware,
                       allow_origins=["*"],
                       allow_methods=["*"],
                       allow_headers=["*"])

model = load_model()

@app.post("/classify")
async def classify(file: UploadFile = File(...)):
    try:
        image = Image.open(io.BytesIO(await file.read()))
        predictions = classify_image(model, image)

        data = []
        for index, label, score in predictions:
            data.append({"label" : label, "score" : float(score)})

        return {"predictions" : data}
    except Exception as e:
        return {"error" : str(e)}
    
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
