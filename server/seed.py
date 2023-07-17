#!/usr/bin/env python3

# Standard library imports
from movies import movies
# Remote library imports
movies_list = [movie.name for movie in movies]
print(movies_list)
# Local imports
from app import app
from models import db

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
