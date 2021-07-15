import time
from flask import Flask, url_for
from glean import Glean, load_metrics

#allow telemetry to be disabled
telemetry_enabled = False
#will hold the glean metrics
metrics = None

Glean.initialize(
  application_id="react-flask-heroku-bp",
  application_version="0.1.0",
  upload_enabled=telemetry_enabled,
  data_dir="" #MH: not sure what to put here
)

app = Flask(__name__, static_folder='../build', static_url_path='/')

@app.route('/')
def index():
  #metrics = load_metrics(url_for('static', filename='metrics.yaml'))
  #metrics.app.loads.add()  # Increment the app loads counter in glean
  return app.send_static_file('index.html')

@app.route('/api/time')
def get_current_time():
  return {'time': time.time()}

@app.route('/api/toggle_telemetry/<is_enabled>')
def toggle_telemetry(is_enabled):
  app.logger.info('telemetry enabled: %s', is_enabled)
  if is_enabled:
    telemetry_enabled = is_enabled
  else:
    telemetry_enabled = not telemetry_enabled

  if telemetry_enabled:
    Glean.set_upload_enabled(1)
  else:
    Glean.set_upload_enabled(0)
  return {'telemetryEnabled': telemetry_enabled}