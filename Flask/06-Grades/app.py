import json

from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_bs4 import Bootstrap
from flask_moment import Moment
from datetime import datetime
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField
from wtforms.validators import DataRequired


app = Flask(__name__)
bootstrap = Bootstrap(app)
moment = Moment(app)
date = datetime.now()
app.config['SECRET_KEY'] = 'jv5f*&^FJHOij987gtyIG^R%$Dij78t%$D#$Afu'


class LoginForm(FlaskForm):
    """formularz logowania"""
    userLogin = StringField("Nazwa użytkownika:", validators=[DataRequired()])
    userPass = PasswordField("Hasło:", validators=[DataRequired()])
    submit = SubmitField("Zaloguj")


users = {1: {"userLogin": "julo", "userPass": "julo", "fname": "julo", "lname": "julo"}}


@app.route('/')
def index():
    return render_template('index.html', title='strona glowna', userLogin=session.get("userLogin"), date=date)


@app.route('/logIn', methods=["POST", "GET"])
def logIn():
    """obslugiwanie logowania uzytkownikow"""
    login = LoginForm()
    if login.validate_on_submit():
        userLogin = login.userLogin.data
        userPass = login.userPass.data
        if userLogin == users[1]["userLogin"] and userPass == users[1]["userPass"]:
            session["userLogin"] = userLogin
            return redirect("dashboard")
    return render_template('login.html', title='logowanie', login=login, userLogin=session.get("userLogin"), date=date)


@app.route("/dashboard")
def dashboard():
    with open("data/grades.json") as gradesFile:
        grades = json.load(gradesFile)
        gradesFile.close()
    return render_template("dashboard.html", title="dashboard", userLogin=session.get("userLogin"), grades = grades, date=date)

@app.route("/logOut")
def logOut():
    session.pop("userLogin")
    return redirect("logIn")

if __name__ == '__main__':
    app.run(debug=True)