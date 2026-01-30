from os import path
from pathlib import Path
import os

from flask import Flask, render_template, request, send_from_directory
from flask_frozen import Freezer


template_folder = path.abspath('./wiki')

app = Flask(__name__, template_folder=template_folder)
#app.config['FREEZER_BASE_URL'] = environ.get('CI_PAGES_URL')
app.config['FREEZER_DESTINATION'] = 'public'
app.config['FREEZER_RELATIVE_URLS'] = True
app.config['FREEZER_IGNORE_MIMETYPE_WARNINGS'] = True
freezer = Freezer(app)

@app.cli.command()
def freeze():
    freezer.freeze()

@app.cli.command()
def serve():
    freezer.run()

@app.route('/')
def home():
    return render_template('pages/home.html')

@app.route("/favicon.ico")
def favicon():
    return send_from_directory(
        os.path.join(app.root_path, "static"),
        "favicon.ico",
        mimetype="image/vnd.microsoft.icon"
    )

@app.route('/<page>')
def pages(page):
    return render_template(str(Path('pages')) + '/' + page.lower() + '.html')


@app.route("/genbank")
def genbank_viewer():
    uid = request.args.get("uid")
    format = request.args.get("format", "gb")
    return render_template(
        "pages/genbank.html",
        uid=uid,
        format=format
    )


# Main Function, Runs at http://0.0.0.0:8081
if __name__ == "__main__":
    app.run(port=8081)
