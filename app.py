from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

import socket

# Global state
# State options: 'IDLE', 'READY', 'START', 'END'
current_state = 'IDLE'
current_task_text = ""
device_ip = "Unknown"

def get_ip_address():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.settimeout(0)
        # connects to Google DNS - doesn't actually make a request
        s.connect(('8.8.8.8', 1))
        ip = s.getsockname()[0]
        s.close()
    except Exception:
        ip = '127.0.0.1'
    return ip

# Get IP on startup
device_ip = get_ip_address()

@app.route('/')
def index():
    return render_template('index.html', ip=device_ip)

@app.route('/control')
def control():
    return render_template('control.html')

@app.route('/api/status')
def get_status():
    global current_state, current_task_text, device_ip
    
    # Retry fetching IP if it's currently localhost or unknown, and network might be up now
    if device_ip in ["127.0.0.1", "Unknown"]:
        device_ip = get_ip_address()
        
    return jsonify({
        'state': current_state,
        'task': current_task_text,
        'ip': device_ip
    })

@app.route('/api/ready', methods=['POST'])
def set_ready():
    global current_state, current_task_text
    data = request.json
    if data and 'task' in data:
        current_task_text = data['task']
    
    current_state = 'READY'
    return jsonify({'status': 'success', 'state': current_state, 'task': current_task_text})

@app.route('/api/start', methods=['POST'])
def start_task():
    global current_state
    current_state = 'START'
    return jsonify({'status': 'success', 'state': current_state})

@app.route('/api/end', methods=['POST'])
def end_task():
    global current_state
    current_state = 'END'
    return jsonify({'status': 'success', 'state': current_state})

@app.route('/api/reset', methods=['POST'])
def reset_task():
    global current_state, current_task_text
    current_state = 'IDLE'
    current_task_text = ""
    return jsonify({'status': 'success', 'state': current_state})

@app.route('/api/task', methods=['POST'])
def set_task():
    global current_task_text
    data = request.json
    if data and 'task' in data:
        current_task_text = data['task']
        return jsonify({'status': 'success', 'task': current_task_text})
    return jsonify({'status': 'error', 'message': 'No task provided'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
