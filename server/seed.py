#!/usr/bin/env python3

# Standard library imports
from movies import movies
# Remote library imports
# Local imports
from app import app
from models import db, User, Review, Movie

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        Movie.query.delete()
        Review.query.delete()
        User.query.delete()
        print("Seeding movies...")
        for movie in movies:
            current_movie = Movie(
                name=movie['name'],
                year=movie['year'],
                rating=movie['imdb_rating'],
                img_link=movie["img_link"],
            )
            print(current_movie)

            db.session.add(current_movie)
            db.session.commit()
        print("Finished seeding...")
