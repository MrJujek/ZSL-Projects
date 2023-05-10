from flask import Flask, render_template, request, redirect, flash, url_for
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Length
from flask_bs4 import Bootstrap
from flask_sqlalchemy import SQLAlchemy
import os
from flask_bcrypt import Bcrypt
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user

# konfiguracja aplikacji
app = Flask(__name__)
app.config['SECRET_KEY'] = 'fghjTY$%^&$56rt$%^&GBn^&'
bootstrap = Bootstrap(app)
bcrypt = Bcrypt(app)

# konfiguracja bazy danych
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'users.db')
db = SQLAlchemy(app)


# konfiguracja flask login
loginManager = LoginManager()
loginManager.init_app(app)
loginManager.login_view = 'login'

@loginManager.user_loader
def loadUser(id):
    return Users.query.get(id)

class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(50), unique=True)
    userPass = db.Column(db.String(50))

    def is_authenticated(self):
        return True

# formularze
class Register(FlaskForm):
    userName = StringField('Nazwa użytkownika:', validators=[DataRequired(), Length(min=3, max=50)])
    userPass = PasswordField('Hasło:', validators=[DataRequired(), Length(min=3, max=50)])
    submit = SubmitField('Rejestruj')

class Login(FlaskForm):
    userName = StringField('Nazwa użytkownika:', validators=[DataRequired(), Length(min=3, max=50)])
    userPass = PasswordField('Hasło::', validators=[DataRequired(), Length(min=3, max=50)])
    submit = SubmitField('Zaloguj')

@app.route('/')
def index():
    return render_template('index.html', title='Home')

@app.route('/register', methods=['POST', 'GET'])
def register():
    registerForm = Register()
    if registerForm.validate_on_submit():
        try:
            hashedPass = bcrypt.generate_password_hash(registerForm.userPass.data)
            newUser = Users(userName=registerForm.userName.data, userPass=hashedPass)
            db.session.add(newUser)
            db.session.commit()
            flash('Konto utworzone poprawnie', 'success')
            return redirect(url_for('login'))
        except Exception:
            flash('Nazwa użytkownika istnieje. Proszę wybrać inną', 'danger')
    return render_template('register.html', title='Rejestracja', registerForm=registerForm)

@app.route('/login', methods=['POST', 'GET'])
def login():
    loginForm = Login()
    if loginForm.validate_on_submit():
        user = Users.query.filter_by(userName=loginForm.userName.data).first()
        if user:
            if bcrypt.check_password_hash(user.userPass, loginForm.userPass.data):
                login_user(user)
                return redirect(url_for('dashboard'))
    return render_template('login.html', title='Logowanie', loginForm=loginForm)

@app.route('/logout', methods=['POST', 'GET'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
    return render_template('dashboard.html', title='Dashboard')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)