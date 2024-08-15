import requests
import json

def upload_image(url, image_path, form_data):
    """
    Uploads an image to the specified URL with the given form data.

    Parameters:
    url (str): The URL to submit the form data to.
    image_path (str): The path to the image file to be uploaded.
    form_data (dict): Additional form data to be submitted.

    Returns:
    str: The HTML content returned by the server.
    """
    with open(image_path, "rb") as image_file:
        files = {"imagepageim[]": image_file}
        response = requests.post(url, data=form_data, files=files)
        return response.text

def extract_json_from_html(html_content):
    """
    Extracts JSON data from the HTML content.

    Parameters:
    html_content (str): The HTML content containing the JSON data.

    Returns:
    dict: The extracted JSON data as a Python dictionary.
    """
    start_index = html_content.find('{')
    end_index = html_content.rfind('}')

    if start_index != -1 and end_index != -1:
        json_string = html_content[start_index:end_index + 1].strip()
        try:
            return json.loads(json_string)
        except json.JSONDecodeError:
            print("Failed to decode JSON. The extracted string may not be valid JSON.")
            print(f"Extracted string: {json_string}")
            return None
    else:
        print("Failed to find JSON data in the HTML response.")
        return None

def main():
    #https://pre.cm/API.htm
    url = "https://pre.cm/scribe.php"
    image_path = "full_body.jpg"
    form_data = {
        "socialfollow": "1000000",
        "socialtype": "fashion",
        "api": "api",
    }

    # Upload image and get the HTML response
    html_content = upload_image(url, image_path, form_data)

    # Extract JSON data from the HTML response
    response_data = extract_json_from_html(html_content)

    if response_data:
        # Print the extracted JSON data
        print(response_data)

        # Example: Accessing specific information from the response
        likes = response_data.get("likes", 0)
        views = response_data.get("views", 0)
        comments = response_data.get("comments", 0)

        # print(response_data + "," + likes  + ","+ views + "," + comments)
        print(f"Likes: {likes}, Views: {views}, Comments: {comments}")
    
        return response_data
if __name__ == "__main__":
    main()
