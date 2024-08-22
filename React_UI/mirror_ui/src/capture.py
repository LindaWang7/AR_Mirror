import cv2
import time
import os

def capture_photos(interval=5, duration=60, save_path='C:/path/to/save'):
    # Ensure the save directory exists
    os.makedirs(save_path, exist_ok=True)

    # Start the camera
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("Cannot open camera")
        return

    start_time = time.time()
    while (time.time() - start_time) < duration:
        # Capture frame-by-frame
        ret, frame = cap.read()
        if not ret:
            print("Can't receive frame (stream end?). Exiting ...")
            break

        # File path for the image
        img_name = f"{time.strftime('%Y%m%d_%H%M%S')}.jpeg"
        full_path = os.path.join(save_path, img_name)

        # Save the frame as JPEG file
        cv2.imwrite(full_path, frame)
        print(f"Saved {full_path}")

        # Sleep for the interval
        time.sleep(interval)

    # When everything done, release the capture
    cap.release()
    cv2.destroyAllWindows()

# Example usage: Take a photo every 5 seconds for 2 minutes
capture_photos(interval=5, duration=120, save_path=r'C:\Users\zhang\OneDrive\Pictures\New_folder')
