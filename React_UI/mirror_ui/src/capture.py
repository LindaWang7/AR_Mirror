import cv2
import time
import os
import requests
import json

def capture_photo(save_path='C:/path/to/save'):
    # Ensure the save directory exists
    os.makedirs(save_path, exist_ok=True)

    # Start the camera
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("Cannot open camera")
        return None

    # Capture a single frame
    ret, frame = cap.read()
    if not ret:
        print("Can't receive frame (stream end?). Exiting ...")
        cap.release()
        return None

    # File path for the image
    img_name = f"{time.strftime('%Y%m%d_%H%M%S')}.jpeg"
    full_path = os.path.join(save_path, img_name)

    # Save the frame as JPEG file
    cv2.imwrite(full_path, frame)
    print(f"Saved {full_path}")

    # Release the capture
    cap.release()
    cv2.destroyAllWindows()

    return full_path

def upload_image(url, image_path, form_data, delete_after_upload=False):
    with open(image_path, "rb") as image_file:
        files = {"imagepageim[]": image_file}
        response = requests.post(url, data=form_data, files=files)
    
    if delete_after_upload:
        os.remove(image_path)
        print(f"Deleted {image_path}")

    return response.text

def extract_json_from_html(html_content, save_path='C:/path/to/save', file_name='response.json'):
    start_index = html_content.find('{')
    end_index = html_content.rfind('}')

    # Check for specific non-JSON message in response
    if "Person not found!" in html_content:
        json_data = {"error": "Person not found!"}
        os.makedirs(save_path, exist_ok=True)
        with open(os.path.join(save_path, file_name), 'w') as json_file:
            json.dump(json_data, json_file, indent=4)
        print("No person found in the image, message saved as JSON.")
        return json_data

    if start_index != -1 and end_index != -1:
        json_string = html_content[start_index:end_index + 1].strip()
        try:
            json_data = json.loads(json_string)
            os.makedirs(save_path, exist_ok=True)
            with open(os.path.join(save_path, file_name), 'w') as json_file:
                json.dump(json_data, json_file, indent=4)
            return json_data
        except json.JSONDecodeError:
            print("Failed to decode JSON. The extracted string may not be valid JSON.")
            print(f"Extracted string: {json_string}")
            return None
    else:
        print("Failed to find JSON data in the HTML response.")
        return None
    
def capture_img_one_time():
    #https://pre.cm/API.htm
    #https://pre.cm/scribe.php
    url = "https://pre.cm/scribe.php"
    save_path = r'C:\Users\Administrator\AR_Mirror\React_UI\mirror_ui\public\Pictures\New_folder'
    save_path_j = r'C:\Users\Administrator\AR_Mirror\React_UI\mirror_ui\public\Pictures\New_folder\json'
    form_data = {
        "socialfollow": "1000000",
        "socialtype": "fashion",
        "api": "api",
    }

        # Capture a new photo
    image_path = capture_photo(save_path=save_path)
        
    if image_path:
            # Upload image and get the HTML response
        html_content = upload_image(url, image_path, form_data, delete_after_upload=False)

            # Extract JSON data from the HTML response
        response_data = extract_json_from_html(html_content, save_path=save_path_j, file_name=f"image_response.json")

        if response_data:
                # If successful, print the extracted JSON data and wait for 20 seconds
            print(response_data)
            return True
        else:
            print(response_data)
            return False
    else:
            # If image capture fails, wait for 5 seconds before retrying
        return None

if __name__ == "__main__":
    capture_img_one_time()
