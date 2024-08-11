import tkinter as tk
from tkinter import ttk

"""
1. load mirror: allow mirror to run python code
2. design python output interface
3. connect api to code, code to mirror
"""



# Given JSON data
data = {
    "0": "@strikexpe: Maybe a small belt for the shorts to add some definition? ",
    "1": "@impressiste: Loving the casual vibe of this outfit overall. ",
    "2": "@runfan: Bold earrings could stand out nicely. ",
    "3": "@stulove: Those mint sneakers are a fresh pop of color! ",
    "4": "@styartis: The scoop neck tee is simple yet stylish. ",
    "5": "@detaiexp: The white shorts give a clean and crisp look. ",
    "6": "@uniquefan: Great choice for a sunny day outfit! 🕶️👍❤️",
    "7": "@miracgirl: Her relaxed pose adds to the laid-back look. ✨",
    "8": "@elegasist: Adding a crossbody bag might elevate the outfit. ",
    "9": "@astonisartis: Swap those sneakers for some strappy sandals for a breezier feel. ",
    "10": "@sinlov: Sunglasses could add a chic flair on a sunny day. ",
    "11": "@flamboexper: High-waist shorts are always a great casual fit. 😍",
    "12": "@detailart: Try adding a cute hat for more personality. ",
    "13": "@extlady: Trying a different hairstyle could change up the flow. ",
    "14": "@flamade: Consider trying rolled-up sleeves for a playful touch. ",
    "15": "@elaboramade: The color coordination between the shirt and shorts is on point. 🕶️👍",
    "16": "@remarmad: A statement necklace could add some flair. ",
    "17": "@spectgirl: A denim jacket could be a cool addition for a layered look. ",
    "18": "@fancguru: How about adding some accessories like bracelets? ",
    "19": "@fabulmadem: Consider a different shade of blue for the top to mix things up. ",
    "20": "@astlady: A slight tuck of the shirt could give a more polished look. ",
    "likes": 14910,
    "views": 401663,
    "comments": 20
}

# Function to load comments into the text box
def load_comments(text_widget, data):
    for key, comment in data.items():
        if key.isdigit():
            text_widget.insert(tk.END, comment.encode('utf-8', 'replace').decode('utf-8') + "\n\n")

# Function to display likes and views
def display_stats(stats_frame, data):
    likes_label = tk.Label(stats_frame, text=f"❤️ {data['likes']}", font=("Helvetica", 16), bg="white")
    views_label = tk.Label(stats_frame, text=f"👁️ {data['views']}", font=("Helvetica", 16), bg="white")
    comments_label = tk.Label(stats_frame, text=f"💬 {data['comments']} Comments", font=("Helvetica", 16), bg="white")
    
    likes_label.pack(side=tk.LEFT, padx=10)
    views_label.pack(side=tk.LEFT, padx=10)
    comments_label.pack(side=tk.LEFT, padx=10)

# Create the main window
root = tk.Tk()
root.title("Comments UI")
root.geometry("941x529")  # Set the window size to match the display size

# Set the background color
root.configure(bg="white")

# Create a frame for the text widget and scrollbar
frame = tk.Frame(root, bg="white")
frame.pack(padx=10, pady=10, fill=tk.BOTH, expand=True)

# Create a text widget with a scrollbar
text_widget = tk.Text(frame, wrap=tk.WORD, font=("Helvetica", 14), bg="white", bd=0, highlightthickness=0)
scrollbar = ttk.Scrollbar(frame, command=text_widget.yview)
text_widget.config(yscrollcommand=scrollbar.set)

# Pack the text widget and scrollbar
text_widget.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

# Load comments into the text widget
load_comments(text_widget, data)

# Create a frame for stats
stats_frame = tk.Frame(root, bg="white")
stats_frame.pack(pady=10)

# Display likes, views, and comments
display_stats(stats_frame, data)

# Run the Tkinter event loop
root.mainloop()
