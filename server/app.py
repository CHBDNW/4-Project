#!/usr/bin/env python3

# Standard library imports
from models import db, User, Movie, Review
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request
import os
# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User

# Views go here!
@app.get('/movies')
def get_all_movies():
    pass

@app.get('/movies/<int:id>')
def get_movies_by_id(id):
    pass

@app.get('/user/<int:id>')
def get_user_by_id(id):
    pass

@app.post('/reviews')
def post_new_review():
    pass 

@app.patch('/review/<int:id>')
def update_review_by_id(id):
    pass

@app.delete('/review/<int:id>')
def delete_review_by_id(id):
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
