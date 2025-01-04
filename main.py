from tkinter import *

def login():
    """
    Handles the login button click. 
    Checks if the entered username and password match the hardcoded values.
    """
    global username_var, password_var, home_window

    # Hardcoded credentials 
    username = "faiz"
    password = "password"

    if username_var.get() == username and password_var.get() == password:
        # Login successful
        login_window.destroy()  # Close the login window

        # Create and show the home window
        home_window = Tk()
        home_window.title("Home")
        home_window.geometry("300x150") 

        welcome_label = Label(home_window, text="Welcome!", font=("Arial", 16))
        welcome_label.pack(pady=20)

        home_window.mainloop() 
    else:
        # Login failed
        error_label.config(text="Invalid username or password.")

# Create the login window
login_window = Tk()
login_window.title("Login")
login_window.geometry("300x200")

# Create widgets
username_label = Label(login_window, text="Username:")
username_label.pack()
username_var = StringVar()
username_entry = Entry(login_window, textvariable=username_var)
username_entry.pack()

password_label = Label(login_window, text="Password:")
password_label.pack()
password_var = StringVar()
password_entry = Entry(login_window, textvariable=password_var, show="*")
password_entry.pack()

login_button = Button(login_window, text="Login", command=login)
login_button.pack(pady=10)

error_label = Label(login_window, text="", fg="red")
error_label.pack()

login_window.mainloop()