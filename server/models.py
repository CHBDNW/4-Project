from sqlalchemy_serializer import SerializerMixin

from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
id = db.Column(db.Integer, primary_key=True)
name = db.Column(db.String)
img_url = db.Column(db.String)

serialize_rules = ('-reviews.user',) 
reviews = db.relationship('Review', backref='user', cascade = 'all') 



class Movie(db.Model, SerializerMixin):
    __tablename__ = 'movies'
id = db.Column(db.Integer, primary_key=True)
name = db.Column(db.String)
year = db.Column(db.Integer)
rating = db.Column(db.Integer)
img_link = db.Column(db.String)
reviews = db.relationship('Review', backref='movie', cascade = 'all')
serialize_rules = ('-reviews.movie',)


class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
id = db.Column(db.Integer, primary_key=True)
user_review = db.Column(db.String)

movies_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

serialize_rules = ('-movie.reviews','user.reviews')




