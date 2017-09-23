
# [START app]
import os
import logging

from flask import Flask, render_template
from jinja2 import Environment, FileSystemLoader

template_dir = os.path.abspath('./build')
env = Environment(loader=FileSystemLoader(template_dir))
app = Flask(__name__, template_folder=template_dir)
#app.jinja_env.variable_start_string = '{{%'
#app.jinja_env.variable_start_string = '%}}'

@app.route('/')
def index():
    return render_template('index.html')

@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500

# [END app]