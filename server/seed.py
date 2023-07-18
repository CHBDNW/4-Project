#!/usr/bin/env python3

# Standard library imports
from movies import movies
# Remote library imports
# Local imports
from app import app
from models import db, User, Review, Movie
from faker import Faker
from random import randint 
fake = Faker()

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        Review.query.delete()
        User.query.delete()
        print("Seeding movies...")
        # make 20 reviews and 20 users
        for i in range(20):
            review = Review(
                user_review=fake.text(),
                movies_id=randint(1, 250),
                user_id=randint(1, 20)
            )
            user = User(
                username=fake.name(),
                img_url=fake.url()
            )
            user.password_hash = fake.name()
            db.session.add(review)
            db.session.add(user)
            db.session.commit()
        # for movie in movies:
        #     current_movie = Movie(
        #         name=movie['name'],
        #         year=movie['year'],
        #         rating=movie['imdb_rating'],
        #         img_link=movie["img_link"],
        #     )
        #     print(current_movie)

        #     db.session.add(current_movie)
        #     db.session.commit()
        print("Finished seeding...")
