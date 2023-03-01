from flask import Flask, render_template, session, redirect, flash, request
from flask_bs4 import Bootstrap
from flask_moment import Moment
from datetime import datetime
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField, RadioField
from wtforms.validators import DataRequired
import json
import sqlite3
import hashlib

app = Flask(__name__)
bootstrap = Bootstrap(app)
moment = Moment(app)
app.config['SECRET_KEY'] = 'ghjk5678$%^&*FGHJ^&*(ghj678%^&*'
date = datetime.now()


@app.route('/search', methods=['GET', 'POST'])
def search():
    connection = sqlite3.connect('data/source')
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM salary")
    salary = cursor.fetchall()
    connection.close()

    max_salary = salary[0][3]
    min_salary = salary[0][3]
    users_count = 0
    sum_salary = 0

    for user in salary:
        if max_salary < user[3]:
            max_salary = user[3]

        if min_salary > user[3]:
            min_salary = user[3]

        users_count += 1
        sum_salary += user[3]

    avg_salary = sum_salary / users_count

    connection = sqlite3.connect('data/source')
    cursor = connection.cursor()

    input_value = request.args.get("search", "")
    print(input_value)
    if (input_value):
        cursor.execute(f"select * from salary where first='{input_value}'")
        a1 = cursor.fetchall()

        cursor.execute(f"select * from salary where last='{input_value}'")
        a2 = cursor.fetchall()

        cursor.execute(f"select * from salary where city='{input_value}'")
        a3 = cursor.fetchall()

        salary1 = [*a1, *a2, *a3]
    else:
        salary1 = salary

    connection.close()

    return render_template('index.html', title='Home', salary=salary1, max_salary=max_salary, min_salary=min_salary,
                           avg_salary=avg_salary)


@app.route('/')
def index():
    connection = sqlite3.connect('data/source')
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM salary")
    salary = cursor.fetchall()
    connection.close()

    max_salary = salary[0][3]
    min_salary = salary[0][3]
    users_count = 0
    sum_salary = 0

    for user in salary:
        #print(user[3])
        if max_salary < user[3]:
            max_salary = user[3]

        if min_salary > user[3]:
            min_salary = user[3]

        users_count += 1
        sum_salary += user[3]

    avg_salary = sum_salary / users_count

    return render_template('index.html', title='Home', salary=salary, max_salary=max_salary, min_salary=min_salary,
                           avg_salary=avg_salary)


if __name__ == '__main__':
    app.run(debug=True)
