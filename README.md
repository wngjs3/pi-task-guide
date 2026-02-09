# Robot Task Display

A Flask-based web application designed to run on a Raspberry Pi with a display. It shows task instructions to a user and can be controlled via a simple API or a control panel.

## Features

- **Status Display**: Shows "Get Ready", "Current Task", and "Task Completed" screens.
- **Remote Control**: Control the display state wirelessly via a web interface or REST API.
- **Customizable**: Easy to change styles and text.
- **Lightweight**: Built with Flask, minimal dependencies.

## Installation on Raspberry Pi

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd robot_task_display
    ```

2.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Run the application:**
    ```bash
    python app.py
    ```
    The server will start on port 5001.

## Start on Boot & Kiosk Mode

To make the Raspberry Pi act as a dedicated display appliance:

### 1. Setup Autostart (Systemd)

Create a service file:
`sudo nano /etc/systemd/system/robot_display.service`

Add the following content (adjust paths as needed):

```ini
[Unit]
Description=Robot Task Display Server
After=network.target

[Service]
User=pi
WorkingDirectory=/home/pi/robot_task_display
ExecStart=/usr/bin/python3 /home/pi/robot_task_display/app.py
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl enable robot_display.service
sudo systemctl start robot_display.service
```

### 2. Setup Kiosk Mode (Chromium)

Edit the autostart file for the desktop environment:
`sudo nano /etc/xdg/lxsession/LXDE-pi/autostart`

Add the following line to the end:

```bash
@chromium-browser --kiosk --noerrdialogs --disable-infobars --check-for-update-interval=31536000 http://localhost:5000
```

## API Usage

- **Get Status**: `GET /api/status`
- **Start Task**: `POST /api/start`
- **End Task**: `POST /api/end`
- **Reset**: `POST /api/reset`
- **Set Task Text**: `POST /api/task` (JSON body: `{"task": "New task description"}`)

## Remote Control Examples (curl)

Replace `<raspberry-pi-ip>` with your actual IP address (e.g., `192.168.219.108`).

**1. Start Task:**
```bash
curl -X POST http://<raspberry-pi-ip>:5001/api/start
```

**2. Set Task Description:**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"task": "Move towards the target"}' http://<raspberry-pi-ip>:5001/api/task
```

**3. End Task:**
```bash
curl -X POST http://<raspberry-pi-ip>:5001/api/end
```

**4. Reset to Ready:**
```bash
curl -X POST http://<raspberry-pi-ip>:5001/api/reset
```

## Control Panel

Access the control panel at `http://<raspberry-pi-ip>:5001/control` to manually switch states and update tasks.
