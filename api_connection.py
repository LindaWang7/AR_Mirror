import requests
import json

# Define the URL to which the form data will be submitted
url = "https://pre.cm/scribe.php"

# Path to the image file you want to upload
image_path = "full_body.jpg"

# Prepare the form data
data = {
    "socialfollow": "1000000",
    "socialtype": "fashion",
    "api": "api",
}

# Prepare the files for upload
files = {
    "imagepageim[]": open(image_path, "rb")
}

# Make the POST request to upload the image
response = requests.post(url, data=data, files=files)

# Extract the content of the response as a string
html_content = response.text

# Find the first occurrence of '{' and the last occurrence of '}'
start_index = html_content.find('{')
end_index = html_content.rfind('}')

if start_index != -1 and end_index != -1:
    json_string = html_content[start_index:end_index + 1].strip()

    try:
        # Convert the JSON string to a Python dictionary
        response_data = json.loads(json_string)
        print(response_data)

        # Example: Accessing specific information from the response
        likes = response_data.get("likes", 0)
        views = response_data.get("views", 0)
        comments = response_data.get("comments", 0)

        print(f"Likes: {likes}, Views: {views}, Comments: {comments}")
    except json.JSONDecodeError:
        print("Failed to decode JSON. The extracted string may not be valid JSON.")
        print(f"Extracted string: {json_string}")
else:
    print("Failed to find JSON data in the HTML response.")
