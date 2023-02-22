import json
import sqlite3
import hashlib
from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_bs4 import Bootstrap
from flask_moment import Moment
from datetime import datetime
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField, SelectField, RadioField
from wtforms.validators import DataRequired

app = Flask(__name__)
bootstrap = Bootstrap(app)
moment = Moment(app)
date = datetime.now()
app.config['SECRET_KEY'] = 'fghj456(&^$%^&*ghjG'


class LoginForm(FlaskForm):
    """formularza logowania"""
    userLogin = StringField('Nazwa użytkownika:', validators=[DataRequired()])
    userPass = PasswordField('Hasło:', validators=[DataRequired()])
    submit = SubmitField('Zaloguj')


class AddSubject(FlaskForm):
    """formularz dodawania przedmiotu"""
    subject = StringField('Nazwa przedmiotu', validators=[DataRequired()])
    submit = SubmitField('Dodaj')


class AddGrade(FlaskForm):
    """formularz dodawania ocen do przedmiotów"""
    subject = SelectField('Wybierz przedmiot:', choices=str)
    term = RadioField('Wybierz semestr:', choices=[
                      ('term1', 'Semestr 1'), ('term2', 'Semestr 2')])
    category = SelectField('Kategoria ocen:', choices=[(
        'answer', 'Odpowiedź'), ('quiz', 'Kartkówka'), ('test', 'Sprawdzian')])
    grade = SelectField('Ocena:', choices=[
        (6, 'Celujący'),
        (5, 'Bardzo dobry'),
        (4, 'Dobry'),
        (3, 'Dostateczny'),
        (2, 'Dopuszczający'),
        (1, 'Niedostateczny')
    ])
    submit = SubmitField('Dodaj')


def countAverage(subjectValue, termValue):
    """funkcja obliczająca średnie ocen"""
    with open('data/grades.json') as gradesFile:
        grades = json.load(gradesFile)
        gradesFile.close()
    sumGrades = 0
    lenght = 0
    if subjectValue == "" and termValue == "":
        for subject, terms in grades.items():
            for term, categories in terms.items():
                for category, grades in categories.items():
                    if category == 'answer' or category == 'quiz' or category == 'test':
                        for grade in grades:
                            sumGrades += grade
                            lenght += 1
    else:
        for subject, terms in grades.items():
            if subject == subjectValue:
                for term, categories in terms.items():
                    if term == termValue:
                        for category, grades in categories.items():
                            if category == 'answer' or category == 'quiz' or category == 'test':
                                for grade in grades:
                                    sumGrades += grade
                                    lenght += 1
    if lenght != 0:
        return round(sumGrades / lenght, 2)


totalAverage = {}


def yearlyAverage(subjectValue, termValue):
    with open('data/grades.json', encoding='utf-8') as gradesFile:
        grades = json.load(gradesFile)
        gradesFile.close()
    sumGrades = 0
    lenght = 0
    if termValue == '':
        for subject, terms in grades.items():
            if subject == subjectValue:
                for term, categories in terms.items():
                    for category, grades in categories.items():
                        if category == 'answer' or category == 'quiz' or category == 'test':
                            for grade in grades:
                                sumGrades += grade
                                lenght += 1
                                totalAverage[subject] = round(
                                    sumGrades / lenght, 2)
    if lenght != 0:
        return round(sumGrades / lenght, 2)


@app.route('/')
def index():
    return render_template('index.html', title='Strona główna', userLogin=session.get('userLogin'), date=date)


@app.route('/logIn', methods=['POST', 'GET'])
def logIn():
    """funkcja obsługująca logowanie użytkowników"""
    login = LoginForm()
    if login.validate_on_submit():
        userLogin = login.userLogin.data
        userPass = login.userPass.data.encode()
        userPass = hashlib.sha256(userPass).hexdigest()
        connection = sqlite3.connect('data/grades')
        cursor = connection.cursor()
        cursor.execute(
            f"SELECT userLogin, firstName FROM users WHERE userLogin='{userLogin}' AND userPass='{userPass}'")
        user = cursor.fetchone()
        connection.close()
        if user:
            session['userLogin'] = user[0]
            session['firstName'] = user[1]
            return redirect('dashboard')
    return render_template('login.html', title='Logowanie', login=login, userLogin=session.get('userLogin'), date=date, firstName=session.get('firstName'))


@app.route('/logOut')
def logOut():
    session.pop('userLogin')
    session.pop('firstName')
    return redirect('logIn')


@app.route('/dashboard')
def dashboard():
    connection = sqlite3.connect('data/grades')
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM subjects")
    subjects = cursor.fetchall()
    cursor.execute(
        f"SELECT * FROM gradesTab INNER JOIN subjects ON subjects.id = gradesTab.subject INNER JOIN categories ON categories.id = gradesTab.category")
    grades = cursor.fetchall()
    connection.close()
    return render_template('dashboard.html', title='Dashboard', userLogin=session.get('userLogin'), date=date, firstName=session.get('firstName'), subjects=subjects, grades=grades)


@app.route('/addSubject', methods=['GET', 'POST'])
def addSubject():
    addSubjectForm = AddSubject()
    if addSubjectForm.validate_on_submit():
        with open('data/grades.json', encoding='utf-8') as gradesFile:
            grades = json.load(gradesFile)
            subject = addSubjectForm.subject.data
            grades[subject] = {
                'term1': {'answer': [], 'quiz': [], 'test': [], 'interim': 0},
                'term2': {'answer': [], 'quiz': [], 'test': [], 'interim': 0, 'yearly': 0}
            }
        with open('data/grades.json', 'w', encoding='utf-8') as gradesFile:
            json.dump(grades, gradesFile)
            gradesFile.close()
            flash('Dane zapisane poprawnie')
            return redirect('addSubject')
    return render_template('add-subject.html', title='Dodaj przedmiot', userLogin=session.get('userLogin'), date=date, addSubjectForm=addSubjectForm)


@app.route('/addGrade', methods=['POST', 'GET'])
def addGrade():
    addGradeForm = AddGrade()
    with open('data/grades.json', encoding='utf-8') as gradesFile:
        grades = json.load(gradesFile)
        gradesFile.close()
        addGradeForm.subject.choices = [subject for subject in grades]
    if addGradeForm.validate_on_submit():
        subject = addGradeForm.subject.data
        term = addGradeForm.term.data
        category = addGradeForm.category.data
        grade = addGradeForm.grade.data
        grades[subject][term][category].append(int(grade))
        with open('data/grades.json', 'w', encoding='utf-8') as gradesFile:
            json.dump(grades, gradesFile)
            gradesFile.close()
            flash('Dane zapiane poprawnie')
        return redirect('addGrade')
    return render_template('add-grade.html', title='Dodaj ocenę', userLogin=session.get('userLogin'), date=date, addGradeForm=addGradeForm)


if __name__ == '__main__':
    app.run(debug=True, port=3000)
