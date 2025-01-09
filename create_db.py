import sqlite3

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('users.db')
cursor = conn.cursor()

# Create table
cursor.execute('''CREATE TABLE users
                  (username TEXT, password TEXT)''')

# Insert a user (for testing)
cursor.execute("INSERT INTO users VALUES ('BPS', 'mah@dev')")

# Commit the changes and close the connection
conn.commit()
conn.close()

print("Database and table created successfully.")