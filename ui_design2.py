import tkinter as tk
from tkinter import ttk
from PIL import Image, ImageTk
import api_connection

# Simulated API data (replace with actual data retrieval from api_connection.main())
data = data = api_connection.main()

# to load comments into the text box
def load_comments(text_widget, data):
    print(data)  # Debug: Print data to ensure it is being passed correctly
    for key, comment in data.items():
        if key.isdigit():
            text_widget.insert(tk.END, comment + "\n\n")

# Create the main window
root = tk.Tk()
root.title("Fashion Mirror UI")
root.geometry("529x941")  # Set the window size

# Set the background color
root.configure(bg="white")

# Load and display the image
# image_path = "full_body.jpg"  # Path to the image
# image = Image.open(image_path)

# # Resize the image while maintaining the aspect ratio
# image = image.resize((529, 941), Image.LANCZOS)  # Resize to fit the screen vertically
# photo = ImageTk.PhotoImage(image)
# image_label = tk.Label(root, image=photo)
# image_label.pack(side=tk.TOP, pady=0)

# Display likes at the top right
likes_frame = tk.Frame(root, bg="white")
likes_frame.place(x=10, y=10)  # Position on the top right

likes_label = tk.Label(likes_frame, text=f"❤️ {data['likes']:,}", font=("Helvetica", 50), fg="black", bg="white")
likes_label.pack(side=tk.RIGHT)

# Create a frame for the comments section at the bottom
comments_frame = tk.Frame(root, bg="white")
comments_frame.pack(side=tk.BOTTOM, fill=tk.X, padx=20, pady=20)

# Create a text widget with a scrollbar
text_widget = tk.Text(comments_frame, wrap=tk.WORD, font=("Helvetica", 14), bg="white", bd=0, highlightthickness=0)
scrollbar = ttk.Scrollbar(comments_frame, command=text_widget.yview)
text_widget.config(yscrollcommand=scrollbar.set)

# Pack the text widget and scrollbar into the comments frame
text_widget.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

# Load comments into the text widget
load_comments(text_widget, data)

# Run the Tkinter event loop
root.mainloop()
