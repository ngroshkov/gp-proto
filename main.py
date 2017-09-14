
# [START app]
import logging

from flask import Flask, render_template


app = Flask(__name__)
app.jinja_env.variable_start_string = '{{%'
app.jinja_env.variable_start_string = '%}}'

@app.route('/')
def index():
    return render_template('index.html')


@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500

# [END app]