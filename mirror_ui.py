import tkinter as tk
from tkinter import ttk
import api_connection

"""
1. load mirror: allow mirror to run python code
2. design python output interface
3. connect api to code, code to mirror
"""



#JSON data returned from api_connection.py
data = api_connection.main()


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
