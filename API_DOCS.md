# Robot Task Display API Documentation

This document describes how to control the Robot Task Display server remotely.

**Base URL:** `http://<raspberry-pi-ip>:5001`

Replace `<raspberry-pi-ip>` with the IP address shown on the "System Ready" screen (e.g., `192.168.219.108`).

---

## Endpoints

### 1. Set Ready & Task (Preparation)
Switches the display to the "Get Ready" state and sets the task instruction text.
*   **Background:** Yellow/Orange
*   **Use when:** You want to show the user what task they are about to perform.

**Request:**
*   **Method:** `POST`
*   **URL:** `/api/ready`
*   **Headers:** `Content-Type: application/json`
*   **Body:**
    ```json
    {
      "task": "Pick up the red apple"
    }
    ```

**Example (curl):**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"task": "Pick up the red apple"}' http://<raspberry-pi-ip>:5001/api/ready
```

---

### 2. Start Task (Execution)
Switches the display to the "Task in Progress" state. The task text remains visible.
*   **Background:** Green
*   **Use when:** The robot or user actually begins performing the task.

**Request:**
*   **Method:** `POST`
*   **URL:** `/api/start`

**Example (curl):**
```bash
curl -X POST http://<raspberry-pi-ip>:5001/api/start
```

---

### 3. End Task (Completion)
Switches the display to the "Task Completed" state.
*   **Background:** Black/Dark
*   **Display:** Large Checkmark (✓)
*   **Use when:** The task is finished.

**Request:**
*   **Method:** `POST`
*   **URL:** `/api/end`

**Example (curl):**
```bash
curl -X POST http://<raspberry-pi-ip>:5001/api/end
```

---

### 4. Reset (Idle)
Switches the display back to the "System Ready" (Idle) state.
*   **Background:** Dark Blue/Slate
*   **Display:** "System Ready" and IP Address
*   **Use when:** You want to reset the system for a completely new session or waiting period.

**Request:**
*   **Method:** `POST`
*   **URL:** `/api/reset`

**Example (curl):**
```bash
curl -X POST http://<raspberry-pi-ip>:5001/api/reset
```

---

### 5. Check Status
Returns the current state of the display.

**Request:**
*   **Method:** `GET`
*   **URL:** `/api/status`

**Response Example:**
```json
{
  "ip": "192.168.219.108",
  "state": "READY",
  "task": "Pick up the red apple"
}
```


---

### 6. Control Emotions
You can control the robot's facial expression independently or along with other states.
Supported emotions: `neutral`, `happy`, `angry`, `sad`, `surprised`, `sleeping`, `success` (O shape), `failure` (X shape).

**Standalone Emotion Change:**
*   **Method:** `POST`
*   **URL:** `/api/emotion`
*   **Body:** `{"emotion": "happy"}`

**Example (curl):**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"emotion": "happy"}' http://<raspberry-pi-ip>:5001/api/emotion
```

**Combined with Task (e.g., Start with Angry face):**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"emotion": "angry"}' http://<raspberry-pi-ip>:5001/api/start
```
