#!/usr/bin/env python3

# Standard library imports
from models import db, User, Movie, Review
# from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request
import os
# Remote library imports
from flask import request, session
# from flask_restful import Resource
# Local imports
from config import app, db, api
from models import User, Movie, Review
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
        user_review = data.get('user_review'),
        movies_id = data.get('movies_id'),
        user_id = data.get('user_id'),
    ) 
    db.session.add(new_review)
    db.session.commit()
    return make_response(
        jsonify(new_review.to_dict()),
        201
    ) 

@app.patch('/review/<int:id>')
def update_review_by_id(id):
    review = Review.query.filter(
        Review.id == id
    ).first()
    if not review:
        return make_response(
            jsonify({'error': 'review not found'}),
            404
        )
    data = request.get_json()

    for field in data:
        setattr(review, field, data[field])
    db.session.add(review)
    db.session.commit()

    return make_response(
        jsonify(review.to_dict()),
        200
    )

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
    db.session.delete(review_del)
    db.session.commit()

    return make_response(jsonify({}), 200)

@app.post('/signup')
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    img_url = data.get('img_url')
    new_user = User(
        username=username,
        img_url=img_url,
    )
    new_user.password_hash = password
    try:
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        return new_user.to_dict(), 201
    except ValueError:
        return {'error': 'invalid input'}, 404

@app.post('/login')
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if not user or not user.authenticate(data['password']):
        return {'error: invalid login'}, 404
    session['user_id'] = user.id
    return user.to_dict(), 201

@app.get('/check_session')
def auto_login():
    user = User.query.filter_by(id=session.get('user_id')).first()
    if user:
        return user.to_dict(), 200
    return {'error': 'unauthorized'}, 404

@app.delete('/logout')
def logout():
    if session.get('user_id'):
        session['user_id'] = None
        return {'message': 'logged out'}, 204
    return {'error': 'session not found'}, 404

if __name__ == '__main__':
    app.run(port=5555, debug=True)
