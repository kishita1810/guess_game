from fastapi import FastAPI

#GET , POST, PUT, DELETE
#GET - get information
#POST - something new to the server 
#PUT - when you change an exiting thing
#DELETE - when you remove something

app = FastAPI()


players = []

@app.get('/')
def index():
    return {'message': 'Hello, World!'}
