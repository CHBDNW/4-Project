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
    movies = Movie.query.all()
    data = [m.to_dict() for m in movies]
    return make_response(
        jsonify(data),
        200
    )

@app.get('/movies/<int:id>')
def get_movies_by_id(id):
    movie = Movie.query.filter(
        Movie.id == id
    ).first()
    if not movie:
        return make_response(
            jsonify({'error': 'movie not found'}),
            404
        )
    return make_response(
        jsonify(movie.to_dict()),
        200
    )

@app.get('/user/<int:id>')
def get_user_by_id(id):
    user = User.query.filter(
        User.id == id
    ).first()
    if not user:
        return make_response(
            jsonify({'error': 'user not found'}),
            404
        )
    return make_response(
        jsonify(user.to_dict()),
        200
    )

@app.post('/reviews')
def post_new_review():
    data = request.get_json()
    new_review = Review(
        review = data.get('user_review'),
        movie = data.get('movies_id'),
        user = data.get('user_id'),
    ) 
    db.session.add(new_review)
    db.session.commit()
    return make_response(
        jsonify(new_review.to_dict()),
        201
    ) 

@app.patch('/review/<int:id>')
def update_review_by_id(id):
    pass

@app.delete('/review/<int:id>')
def delete_review_by_id(id):
    review_del = Review.query.filter(
        Review.id == id
    ).first()

    if not review_del:
        return make_response(
            jsonify({'error' : 'Review not found'}),
            404
        )
    db.session.delete()
    db.session.commit()

    return make_response(jsonify({}), 200)


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
