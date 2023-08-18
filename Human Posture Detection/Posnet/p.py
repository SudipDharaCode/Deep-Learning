import cv2
import datetime

data = cv2.VideoCapture('Posnet\production_id_5146559 (1080p).mp4')

fps = data.get(cv2.CAP_PROP_FPS)

print(fps)