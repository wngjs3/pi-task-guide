document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const readyScreen = document.getElementById('ready-screen');
    const taskScreen = document.getElementById('task-screen');
    const endScreen = document.getElementById('end-screen');
    const taskText = document.getElementById('task-text');

    let processing = false;

    function updateDisplay(data) {
        // Reset all screens
        readyScreen.classList.add('hidden');
        taskScreen.classList.add('hidden');
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

    // Poll every 500ms
    setInterval(pollStatus, 500);
});
