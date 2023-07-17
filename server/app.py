#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User

# Views go here!
@app.post('/signup')
def signup():
    pass

@app.post('/login')
def login():
    data = request.get_json()
    user = User.query.filter(username=data['username']).first()
    if not user or not user.authenticate(data['password']):
        return {'error: invalid login'}, 404
    session['user_id'] = user.id
    return user.to_dict(), 201

app.get('/check_session')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
