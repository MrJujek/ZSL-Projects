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
    term = RadioField('Wybierz semestr:', choices=[('term1', 'Semestr 1'), ('term2', 'Semestr 2')])
    category = SelectField('Kategoria ocen:', choices=[('answer', 'Odpowiedź'), ('quiz', 'Kartkówka'), ('test', 'Sprawdzian')])
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
    connection = sqlite3.connect('data/grades')
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM gradesTab INNER JOIN subjects ON subjects.id = gradesTab.subject INNER JOIN categories ON categories.id = gradesTab.category")
    grades = cursor.fetchall()
    connection.close()
    sumGrades = 0
    lenght = 0
    if subjectValue == "" and termValue == "":
        for grade in grades:
            if grade[9] == 'answer' or grade[9] == 'quiz' or grade[9] == 'test':
                sumGrades += grade[4]
                lenght += 1
    else:
        for grade in grades:
            if grade[7] == subjectValue:
                if grade[2] == termValue:
                    if grade[9] == 'answer' or grade[9] == 'quiz' or grade[9] == 'test':
                        sumGrades += grade[4]
                        lenght += 1
    if lenght != 0:
        return round(sumGrades / lenght, 2)

totalAverage = {}
def yearlyAverage(subjectValue, termValue):
    connection = sqlite3.connect('data/grades')
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM gradesTab INNER JOIN subjects ON subjects.id = gradesTab.subject INNER JOIN categories ON categories.id = gradesTab.category")
    grades = cursor.fetchall()
    connection.close()
    sumGrades = 0
    lenght = 0
    if termValue == '':
        for grade in grades:
            if grade[7] == subjectValue:
                if grade[9] == 'answer' or grade[9] == 'quiz' or grade[9] == 'test':
                    sumGrades += grade[4]
                    lenght += 1
                    totalAverage[grade[7]] = round(sumGrades / lenght, 2)
    if lenght != 0:
        return round(sumGrades / lenght, 2)

def countInterim(subjectValue, termValue):
    """Funkcja obliczająca oceny śródroczne według skali ocen"""
    connection = sqlite3.connect('data/grades')
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM gradesTab INNER JOIN subjects ON subjects.id = gradesTab.subject INNER JOIN categories ON categories.id = gradesTab.category")
    grades = cursor.fetchall()
    connection.close()
    sumValue = 0
    lenValue = 0
    for grade in grades:
        if grade[7] == subjectValue and termValue =='':
            if grade[9] == 'answer' or grade[9] == 'quiz' or grade[9] == 'test':
                sumValue += grade[4]
                lenValue += 1
        else:
            if grade[7] == subjectValue and grade[2] == termValue:
                if grade[9] == 'answer' or grade[9] == 'quiz' or grade[9] == 'test':
                    sumValue += grade[4]
                    lenValue += 1
                    totalAverage[grade[7]] = round(sumValue / lenValue, 2)
    if lenValue != 0:
        average = round(sumValue / lenValue, 2)
        if average >= 1.0 and average < 1.75:
            interim = 'Niedostateczny'
        elif average >= 1.75 and average < 2.75:
            interim = 'Dopuszczający'
        elif average >= 2.75 and average < 3.75:
            interim = 'Dostateczny'
        elif average >= 3.75 and average < 4.75:
            interim = 'Dobry'
        elif average >= 4.75 and average < 5.75:
            interim = 'Bardzo dobry'
        elif average > 5.75:
            interim = 'Celujący'
        return interim

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
        cursor.execute(f"SELECT userLogin, firstName FROM users WHERE userLogin='{userLogin}' AND userPass='{userPass}'")
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
    cursor.execute(f"SELECT * FROM gradesTab INNER JOIN subjects ON subjects.id = gradesTab.subject INNER JOIN categories ON categories.id = gradesTab.category")
    grades = cursor.fetchall()
    connection.close()
    for grade in grades:
        yearlyAverage(grade[7], '')
    sortedTotalAverage = sorted(totalAverage.items(), key=lambda x: x[1], reverse=True)
    sortedTotalAverage = dict(sortedTotalAverage)
    bestTwoSubject = dict(list(sortedTotalAverage.items())[:2])
    return render_template('dashboard.html', title='Dashboard', userLogin=session.get('userLogin'), date=date, firstName=session.get('firstName'), subjects=subjects, grades=grades, countAverage=countAverage, yearlyAverage=yearlyAverage, bestTwoSubject=bestTwoSubject, sortedTotalAverage=sortedTotalAverage, countInterim=countInterim)

@app.route('/addSubject', methods=['GET', 'POST'])
def addSubject():
    addSubjectForm = AddSubject()
    if addSubjectForm.validate_on_submit():
        subject = addSubjectForm.subject.data
        connection = sqlite3.connect('data/grades')
        cursor = connection.cursor()
        cursor.execute('INSERT INTO subjects (subject) VALUES (?)', (subject,))
        connection.commit()
        connection.close()
        flash('Dane zapisane poprawnie')
        return redirect('addSubject')
    return render_template('add-subject.html', title='Dodaj przedmiot', userLogin=session.get('userLogin'), date=date, addSubjectForm=addSubjectForm, firstName=session.get('firstName'))

@app.route('/addGrade', methods=['POST', 'GET'])
def addGrade():
    addGradeForm = AddGrade()
    connection = sqlite3.connect('data/grades')
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM subjects')
    subjects = cursor.fetchall()
    addGradeForm.subject.choices = [subject for subject in subjects]
    if addGradeForm.validate_on_submit():
        subject = addGradeForm.subject.data
        term = addGradeForm.term.data
        term = 1 if term == 'term1' else 2
        category = addGradeForm.category.data
        category = 1 if category == 'answer' else 2 if category == 'quiz' else 3
        grade = addGradeForm.grade.data
        comment = ''
        connection = sqlite3.connect('data/grades')
        cursor = connection.cursor()
        cursor.execute(f'INSERT INTO gradesTab (subject, term, category, grade, comment) VALUES (?, ?, ?, ?, ?)', (subject, term, category, grade, comment))
        connection.commit()
        connection.close()
        return redirect('addGrade')
    return render_template('add-grade.html', title='Dodaj ocenę', userLogin=session.get('userLogin'), date=date, addGradeForm=addGradeForm, firstName=session.get('firstName'))

if __name__ == '__main__':
    app.run(debug=True)