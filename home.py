from tkinter import *

def show_home():
    home_window = Tk()
    home_window.title("Home")
    home_window.state('zoomed')  # Full screen

    # Create a frame for the modules
    module_frame = Frame(home_window, bg="#ffffff")
    module_frame.pack(side=LEFT, fill=Y)

    modules = [
        "Admission", "Student Section", "Fees Management", "Result Management",
        "Promotion Activity", "Transfer Certificate", "Student Attendance",
        "Search Student", "Staff Management"
    ]

    for module in modules:
        button = Button(module_frame, text=module, command=lambda m=module: open_module(m))
        button.pack(pady=10, padx=10, fill=X)

    home_window.mainloop()

def open_module(module_name):
    # Function to handle module opening
    print(f"Opening {module_name} module")