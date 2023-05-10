from flask import Flask, render_template, request, redirect, flash, url_for
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from flask_bs4 import Bootstrap
from flask_sqlalchemy import SQLAlchemy
import os
from sqlalchemy import func

# konfiguracja aplikacji
app = Flask(__name__)
app.config['SECRET_KEY'] = 'fghjTY$%^&$56rt$%^&GBn^&'
bootstrap = Bootstrap(app)

# konfiguracja bazy danych
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'users.sqlite3')
db = SQLAlchemy(app)

# modele bazy danych
class Users(db.Model):
    """tabela z użytkownikami"""
    id = db.Column(db.Integer, primary_key=True)
    userLogin = db.Column(db.String(50))
    userPass = db.Column(db.String(50))
    firstName = db.Column(db.String(50))
    lastName = db.Column(db.String(50))

    def __init__(self, userLogin, userPass, firstName, lastName):
        self.userLogin = userLogin
        self.userPass = userPass
        self.firstName = firstName
        self.lastName = lastName

# formularze
class AddUser(FlaskForm):
    """formularz dodawania użytkownika"""
    userLogin = StringField('Login:')
    userPass = PasswordField('Hasło:')
    firstName = StringField('Imię:')
    lastName = StringField('Nazwisko:')
    submit = SubmitField('Dodaj')

@app.route('/')
def index():
    return render_template('index.html', title='Home', users=Users.query.all())

@app.route('/add-user', methods=['POST', 'GET'])
def addUser():
    addUserForm = AddUser()
    if addUserForm.validate_on_submit():
        if not addUserForm.userLogin.data or not addUserForm.userPass.data or not addUserForm.firstName.data or not addUserForm.lastName.data:
            flash('Wypełnij wszystkie pola formularza', 'danger')
        else:
            user = Users(addUserForm.userLogin.data, addUserForm.userPass.data, addUserForm.firstName.data, addUserForm.lastName.data)
            db.session.add(user)
            db.session.commit()
            flash('Dane zapisane poprawnie', 'success')
            return redirect('add-user')
    return render_template('add-user.html', title='Dodaj użytkownika', addUserForm=addUserForm, users=Users.query.all(), lastAdded=Users.query.order_by(Users.id.desc()).first())

@app.route('/search', methods=['POST', 'GET'])
def search():
    if request.method == 'POST':
        lastName = request.form['lastName']
        # results = Users.query.filter_by(lastName=lastName).all()
        # results = Users.query.filter(Users.lastName.ilike(lastName)).all()
        # results = Users.query.filter(Users.lastName.ilike(f'{lastName}%')).all()
        # results = Users.query.filter(func.lower(Users.lastName)==lastName.lower()).all()
        results = Users.query.filter(func.lower(Users.lastName).ilike(f'{lastName}%'.lower())).all()
    return render_template('results.html', title='Wyniki wyszukiwania', results=results)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)