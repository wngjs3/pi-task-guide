# Robot Task Display - Usage Guide & Scenarios

This guide provides copy-pasteable `curl` commands for common interaction scenarios with the Robot Task Display server.

**IMPORTANT:** Replace `<ROBOT_IP>` with the actual IP address of the Raspberry Pi (e.g., `192.168.0.15` or `137.68.194.199`). Port is `5001`.

## 🛠 Basic Setup
**Reset to System Ready (Idle)**
```bash
curl -X POST http://<ROBOT_IP>:5001/api/reset
```

---

## 🍎 Scenario 1: Apple Task (Success)
Use this sequence for a standard successful task execution.

1. **Get Ready** (Yellow Screen)
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"task": "Pick up the apple", "emotion": "neutral"}' http://<ROBOT_IP>:5001/api/ready
   ```

2. **Start Task** (Green Screen + Excited Face)
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"emotion": "excited"}' http://<ROBOT_IP>:5001/api/start
   ```

3. **Task Completed** (Black Screen + Success Checkmark + O Eyes)
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"emotion": "success"}' http://<ROBOT_IP>:5001/api/end
   ```

---

## 🥔 Scenario 2: Pringles Task (Failure)
Use this sequence when the robot fails a task.

1. **Get Ready** (Yellow Screen)
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"task": "Pick up the Pringles", "emotion": "neutral"}' http://<ROBOT_IP>:5001/api/ready
   ```

2. **Start Task** (Green Screen + Happy Face)
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"emotion": "happy"}' http://<ROBOT_IP>:5001/api/start
   ```

3. **Task Failed** (Black Screen + Failure Cross + X Eyes)
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"emotion": "failure"}' http://<ROBOT_IP>:5001/api/end
   ```

---

## 💧 Scenario 3: Water Bottle (Struggling/Angry)
Use this sequence to show personality or struggle.

1. **Get Ready** (Yellow Screen)
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"task": "Move the water bottle", "emotion": "neutral"}' http://<ROBOT_IP>:5001/api/ready
   ```

2. **Start Task** (Green Screen + Angry/Struggling Face)
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"emotion": "angry"}' http://<ROBOT_IP>:5001/api/start
   ```

3. **Task Completed** (Black Screen + Sleeping/Tired Face)
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"emotion": "sleeping"}' http://<ROBOT_IP>:5001/api/end
   ```

---

## 🎭 Emotion Gallery
Test these emotions individually using the `/api/emotion` endpoint.

**Command Template:**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"emotion": "EMOTION_NAME"}' http://<ROBOT_IP>:5001/api/emotion
```

| Emotion | Visualization | Use Case |
| :--- | :--- | :--- |
| `processing` | ▶ Play Button (Green Pulse) | Computing, Thinking |
| `curious` | 👀 Eyes Moving Around | Searching, Idle |
| `excited` | 😆 Bouncing Happy Eyes | Greeting, Start of Task |
| `happy` | ◠ ◠ Smiling Eyes | Positive Feedback |
| `neutral` | ● ● Blinking Eyes | Default State |
| `angry` | 😠 Slanted Inwards | Error, Heavy Load |
| `sad` | 😥 Slanted Outwards | Apology, Low Battery |
| `surprised` | ⊙ ⊙ Wide Open | Unexpected Event |
| `sleeping` | ― ― Closed Eyes | Low Power, Idle |
| `success` | 🟢 Green Circles (O) | Task Success |
| `failure` | 🔴 Red Crosses (X) | Task Failure |
