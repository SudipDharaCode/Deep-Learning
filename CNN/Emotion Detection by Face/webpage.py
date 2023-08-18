import streamlit as st
import cv2
import numpy as np
from keras.models import load_model

# Load pre-trained emotion detection model
model = load_model("D:\Full_stack_ML\DL\Project\Emotion_detection\Model\emotion_detection_v3_a58.h5")

# Dictionary to map emotion labels to their corresponding indices
emotion_labels = {0: 'Angry', 1: 'Disgusted', 2: 'Fear', 3: 'Happy', 4: 'Neutral', 5: 'Sad', 6: 'Surprise'}

# Streamlit app title
st.title("Face Emotion Detection")

# Function to detect emotion from an image
def detect_emotion(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    
    detected_emotions = []

    for (x, y, w, h) in faces:
        face_roi = gray[y:y+h, x:x+w]
        resized_roi = cv2.resize(face_roi, (48, 48))
        normalized_roi = resized_roi / 255.0
        reshaped_roi = np.reshape(normalized_roi, (1, 48, 48, 1))
        
        prediction = model.predict(reshaped_roi)
        detected_emotions.append(emotion_labels[np.argmax(prediction)])
    
    return detected_emotions[0]

# Upload image and perform emotion detection
uploaded_image = st.file_uploader("Upload an image", type=["jpg", "jpeg", "png"])

if uploaded_image is not None:
    image = np.array(bytearray(uploaded_image.read()), dtype=np.uint8)
    image = cv2.imdecode(image, 1)
    image = cv2.resize(image,(400,400))
    st.image(image, channels="BGR", caption="Uploaded Image")
    
    if st.button("Detect Emotion"):
        with st.spinner("Detecting Emotion..."):
            detected_emotions = detect_emotion(image)
            if detected_emotions:
                # st.write("Face(s) with emotion detected:")
                 st.write("- " + detected_emotions)
            else:
                st.write("No faces with emotion detected.")

# Footer
st.write("❤️")
