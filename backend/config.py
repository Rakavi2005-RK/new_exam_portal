import os
from dotenv import load_dotenv
load_dotenv()


<<<<<<< HEAD
DATABASE_URI = "mysql+mysqlconnector://root:@localhost:3306/signup_db"
=======
DATABASE_URI = "mysql+mysqlconnector://root:root@localhost:3306/signup_db"
>>>>>>> 12265da7a285c71eabc0a492e3501fcf6d1c715d

class Config:
    SQLALCHEMY_DATABASE_URI = DATABASE_URI
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY")
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    API_KEY= os.getenv("API_KEY")
<<<<<<< HEAD
=======
    API_KEY1=os.getenv("API_KEY1")
>>>>>>> 12265da7a285c71eabc0a492e3501fcf6d1c715d
 
