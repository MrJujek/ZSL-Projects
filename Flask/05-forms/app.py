from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_bs4 import Bootstrap
from flask_moment import Moment
from datetime import datetime
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


app = Flask(__name__)
bootstrap = Bootstrap(app)
moment = Moment(app)
app.config['SECRET_KEY'] = 'jv5f*&^FJHOij987gtyIG^R%$Dij78t%$D#$Afu'


class NameForm(FlaskForm):
    userName = StringField('Podaj swoje imie: ', validators=[DataRequired()])
    submit = SubmitField('wyslij')


@app.route('/')
def index():
    userForm = NameForm()
    return render_template('index.html', title='strona', currentTime=datetime.utcnow(), userForm=userForm)


# @app.route('/user', methods=['POST'])
# def user():
#     name = request.form['userName']
#     return render_template('user.html', title='uzytkownik', name=name)


@app.route('/user', methods=['POST'])
def user():
    userForm = NameForm()
    if userForm.validate_on_submit():
        name = userForm.userName.data
    return render_template('user.html', title='uzytkownik', name=name)


@app.route('/setSession', methods=['POST', 'GET'])
def setSession():
    userForm = NameForm()
    if userForm.validate_on_submit():
        oldName = session.get('userName')
        if oldName is not None and oldName != userForm.userName.data:
            flash('nazywasz sie inaczej')
        session['userName'] = userForm.userName.data
        return redirect(url_for('setSession'))
    return render_template('session.html', title="zastosowanie sesji", userForm=userForm, userName=session.get('userName'))


if __name__ == '__main__':
    app.run(debug=True)


