import json

from flask import Flask, render_template, request, redirect, url_for, session, flash
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
app.config['SECRET_KEY'] = 'f3hj456(&^$%^&*ghjG'


class LoginForm(FlaskForm):
    """formularza logowania"""
    userLogin = StringField('Nazwa użytkownika:', validators=[DataRequired()])
    userPass = PasswordField('Hasło:', validators=[DataRequired()])
    submit = SubmitField('Zaloguj')


class AddSubject(FlaskForm):
    subject = StringField("Nazwa przedmiotu", validators=[DataRequired()])
    submit = SubmitField("Dodaj")


users = {
    1: {
        'userLogin': 'julo',
        'userPass': 'julo',
        'fname': 'julo',
        'lname': 'julo'
    }
}


def countAverage(subjectValue, termValue):
    """funkcja obliczająca średnie ocen"""
    with open('ZSL-Projects/Flask/07-weather/data/grades.json') as gradesFile:
        grades = json.load(gradesFile)
        gradesFile.close()
    sumGrades = 0
    length = 0
    if subjectValue == "" and termValue == "":
        for subject, terms in grades.items():
            for term, categories in terms.items():
                for category, grades in categories.items():
                    if category == 'answer' or category == 'quiz' or category == 'test':
                        for grade in grades:
                            sumGrades += grade
                            length += 1
    else:
        for subject, terms in grades.items():
            if subject == subjectValue:
                for term, categories in terms.items():
                    if term == termValue:
                        for category, grades in categories.items():
                            if category == 'answer' or category == 'quiz' or category == 'test':
                                for grade in grades:
                                    sumGrades += grade
                                    length += 1
    if length != 0:
        return round(sumGrades / length, 2)


totalAverage = {}


def yearlyAverage(subjectValue, termValue):
    with open('ZSL-Projects/Flask/07-weather/data/grades.json', encoding='utf-8') as gradesFile:
        grades = json.load(gradesFile)
        gradesFile.close()
    sumGrades = 0
    length = 0
    if termValue == '':
        for subject, terms in grades.items():
            if subject == subjectValue:
                for term, categories in terms.items():
                    for category, grades in categories.items():
                        if category == 'answer' or category == 'quiz' or category == 'test':
                            for grade in grades:
                                sumGrades += grade
                                length += 1
                                totalAverage[subject] = round(
                                    sumGrades / length, 2)
    if length != 0:
        return round(sumGrades / length, 2)


@app.route('/')
def index():
    return render_template('index.html', title='Strona główna', userLogin=session.get('userLogin'), date=date)


@app.route('/logIn', methods=['POST', 'GET'])
def logIn():
    """funkcja obsługująca logowanie użytkowników"""
    login = LoginForm()
    if login.validate_on_submit():
        userLogin = login.userLogin.data
        userPass = login.userPass.data
        if userLogin == users[1]['userLogin'] and userPass == users[1]['userPass']:
            session['userLogin'] = userLogin
            return redirect('dashboard')
    return render_template('login.html', title='Logowanie', login=login, userLogin=session.get('userLogin'), date=date)


@app.route('/logOut')
def logOut():
    session.pop('userLogin')
    return redirect('logIn')


@app.route('/dashboard')
def dashboard():
    with open('/ZSL-Projects/Flask/07-weather/data/grades.json', encoding='utf-8') as gradesFile:
        grades = json.load(gradesFile)
        gradesFile.close()
    for subject in grades:
        yearlyAverage(subject, '')
    sortedTotalAverage = sorted(
        totalAverage.items(), key=lambda x: x[1], reverse=True)
    sortedTotalAverage = dict(sortedTotalAverage)
    bestTwoSubject = dict(list(sortedTotalAverage.items())[:2])
    return render_template('dashboard.html', title='Dashboard', userLogin=session.get('userLogin'), date=date, grades=grades, countAverage=countAverage, yearlyAverage=yearlyAverage, bestTwoSubject=bestTwoSubject, sortedTotalAverage=sortedTotalAverage)


@app.route('/addSubject', methods=["GET", "POST"])
def addSubject():
    addSubjectForm = AddSubject()
    if addSubjectForm.validate_on_submit():
        with open('ZSL-Projects/Flask/07-weather/data/grades.json', encoding='utf-8') as gradesFile:
            grades = json.load(gradesFile)
            subject = addSubjectForm.subject.data
            grades[subject] = {
                'term1': {
                    'answer': [],
                    'quiz': [],
                    'test': [],
                    'interim': 0
                },
                'term2': {
                    'answer': [],
                    'quiz': [],
                    'test': [],
                    'interim': 0,
                    'yearly': 0
                }
            }
        with open('ZSL-Projects/Flask/07-weather/data/grades.json', 'w', encoding='utf-8') as gradesFile:
            json.dump(grades, gradesFile)
            gradesFile.close()
            flash('Dane zapisane')
            return redirect('addSubject')
    return render_template('add-subject.html', title="Dodaj przedmiot", userLogin=session.get('userLogin'), date=date, addSubjectForm=addSubjectForm)


if __name__ == '__main__':
    app.run(debug=True, port=3000)
