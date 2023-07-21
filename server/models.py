from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
   
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String)

    serialize_rules = ('-reviews.user', '-_password_hash',) 
    reviews = db.relationship('Review', backref='user', cascade = 'all') 
    # movies = db.relationship

    @hybrid_property
    def password_hash(self):
        raise AttributeError('permission denied')
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

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




