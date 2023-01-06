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


class WeatherForm(FlaskForm):
    input = StringField("Podaj miasto: ", validators=[DataRequired()])
    submit = SubmitField("Submit")


@app.route("/", methods=['POST', 'GET'])
def index():
    with open('ZSL-Projects/Flask/07-weather/data/weather.json') as weatherFile:
        weather = json.load(weatherFile)
        weatherFile.close()
        print(weather[0]["stacja"])

    city = None
    form = WeatherForm()
    if form.validate_on_submit():
        city = form.input.data
        print("klik")

    return render_template("weather.html", title="Pogoda", weather=weather, form=form, city=city)


if __name__ == '__main__':
    app.run(debug=True, port=3000)
