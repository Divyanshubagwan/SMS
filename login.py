from tkinter import *
from PIL import Image, ImageTk
import sqlite3
from home import show_home

def login():
    global username_var, password_var, home_window

    # Connect to SQLite database
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    # Fetch the user record
    cursor.execute("SELECT * FROM users WHERE username=? AND password=?", (username_var.get(), password_var.get()))
    record = cursor.fetchone()

    if record:
        # Login successful
        login_window.destroy()  # Close the login window

        # Show the home window
        show_home()
    else:
        # Login failed
        error_label.config(text="Invalid username or password.")

    conn.close()

def show_login():
    global username_var, password_var, error_label, login_window

    # Create the login window
    login_window = Tk()
    login_window.title("Login")
    login_window.geometry("1049x600")

    # Center the window
    window_width = 1049
    window_height = 600

    screen_width = login_window.winfo_screenwidth()
    screen_height = login_window.winfo_screenheight()

    position_top = int(screen_height / 2 - window_height / 2)
    position_right = int(screen_width / 2 - window_width / 2)

    login_window.geometry(f'{window_width}x{window_height}+{position_right}+{position_top}')

    # Load background image
    bg_image = Image.open("IMG/page_bg.jpg")
    bg_image = bg_image.resize((1049, 600), Image.LANCZOS)
    bg_photo = ImageTk.PhotoImage(bg_image)

    # Set background image
    bg_label = Label(login_window, image=bg_photo)
    bg_label.place(x=0, y=0, relwidth=1, relheight=1)

    # Load logo image
    logo_image = Image.open("IMG/logo.png")
    logo_photo = ImageTk.PhotoImage(logo_image)

    # Set logo image
    logo_label = Label(login_window, image=logo_photo, bg=None)
    logo_label.pack(pady=50)

    # Create frame for username and password
    frame = Frame(login_window, bg="#ffffff")
    frame.pack(pady=20)

    # Username label and entry
    username_label = Label(frame, text="Username:", bg="#ffffff")
    username_label.grid(row=0, column=0, padx=10, pady=10)
    username_var = StringVar()
    username_entry = Entry(frame, textvariable=username_var)
    username_entry.grid(row=0, column=1, padx=10, pady=10)

    # Password label and entry
    password_label = Label(frame, text="Password:", bg="#ffffff")
    password_label.grid(row=1, column=0, padx=10, pady=10)
    password_var = StringVar()
    password_entry = Entry(frame, textvariable=password_var, show="*")
    password_entry.grid(row=1, column=1, padx=10, pady=10)

    # Login button
    login_button = Button(login_window, text="Login", command=login)
    login_button.pack(pady=10)

    # Error label
    error_label = Label(login_window, text="", fg="red", bg="#ffffff")
    error_label.pack()

    login_window.mainloop()