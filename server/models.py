from sqlalchemy_serializer import SerializerMixin

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

class Movie(db.Model, SerializerMixin):
    __tablename__ = 'movies'

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'