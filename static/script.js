document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const readyScreen = document.getElementById('ready-screen');
    const taskScreen = document.getElementById('task-screen');
    const endScreen = document.getElementById('end-screen');
    const surveyScreen = document.getElementById('survey-screen');
    const taskText = document.getElementById('task-text');

    let processing = false;

    function updateDisplay(data) {
        // Reset all screens
        readyScreen.classList.add('hidden');
        taskScreen.classList.add('hidden');
        surveyScreen.classList.add('hidden');
        endScreen.classList.add('hidden');
        
        // Remove background classes
        container.classList.remove('ready', 'task-mode', 'end-mode');

        if (data.state === 'READY') {
            readyScreen.classList.remove('hidden');
            container.classList.add('ready');
        } else if (data.state === 'TASK') {
            taskScreen.classList.remove('hidden');
            container.classList.add('task-mode');
            taskText.textContent = data.task;
        } else if (data.state === 'SURVEY') {
            surveyScreen.classList.remove('hidden');
            container.classList.add('end-mode'); // Re-use end mode background or define a new one
        } else if (data.state === 'END') {
            endScreen.classList.remove('hidden');
            container.classList.add('end-mode');
        }
    }

    async function pollStatus() {
        if (processing) return;
        processing = true;
        try {
            const response = await fetch('/api/status');
            if (response.ok) {
                const data = await response.json();
                updateDisplay(data);
            }
        } catch (error) {
            console.error('Error polling status:', error);
        } finally {
            processing = false;
        }
    }

    // Button Event Listeners
    document.getElementById('btn-start-data').addEventListener('click', () => sendCommand('/api/start', { mode: 'data' }));
    document.getElementById('btn-start-exp').addEventListener('click', () => sendCommand('/api/start', { mode: 'experiment' }));
    
    document.getElementById('btn-end').addEventListener('click', () => sendCommand('/api/end'));
    document.getElementById('btn-reset').addEventListener('click', () => sendCommand('/api/reset'));

    // Survey Listeners
    document.querySelectorAll('.likert-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const score = e.target.getAttribute('data-value');
            sendCommand('/api/survey', { score: score });
        });
    });

    async function sendCommand(url, body = {}) {
        try {
            await fetch(url, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            pollStatus(); // Update immediately
        } catch (error) {
            console.error('Error sending command:', error);
        }
    }

    // Poll every 500ms
    setInterval(pollStatus, 500);
});
