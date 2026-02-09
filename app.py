from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

import random

# Global state
# State options: 'READY', 'TASK', 'END'
current_state = 'READY'
current_task_text = "Waiting for task..."

# Predefined tasks
TASKS = [
    "Pick up the red apple",
    "Place the apple in the basket",
    "Push the box to the edge",
    "Stack the blue block on the red block",
    "Open the drawer",
    "Close the drawer",
    "Pour water into the cup",
    "Wipe the table surface",
    "Grasp the bottle handle",
    "Sort the objects by color"
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/control')
def control():
    return render_template('control.html')

@app.route('/api/status')
def get_status():
    global current_state, current_task_text
    return jsonify({
        'state': current_state,
        'task': current_task_text
    })

@app.route('/api/start', methods=['POST'])
def start_task():
    global current_state, current_task_text
    current_state = 'TASK'
    # Select a random task
    current_task_text = random.choice(TASKS)
    return jsonify({
        'status': 'success', 
        'new_state': current_state,
        'task': current_task_text
    })

@app.route('/api/end', methods=['POST'])
def end_task():
    global current_state
    current_state = 'END'
    return jsonify({'status': 'success', 'new_state': current_state})

@app.route('/api/reset', methods=['POST'])
def reset_task():
    global current_state, current_task_text
    current_state = 'READY'
    current_task_text = "Waiting for task..."
    return jsonify({'status': 'success', 'new_state': current_state})

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
