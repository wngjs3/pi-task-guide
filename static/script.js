document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const idleScreen = document.getElementById('idle-screen');
    const taskScreen = document.getElementById('task-screen');
    const endScreen = document.getElementById('end-screen');
    const taskText = document.getElementById('task-text');
    const statusLabel = document.getElementById('status-label');
    const ipAddressSpan = document.getElementById('ip-address');

    let processing = false;

    function updateDisplay(data) {
        console.log("Updating display with state:", data.state);
        
        // Update IP if available
        if (data.ip) {
            ipAddressSpan.textContent = data.ip;
        }

        // Reset all screens
        idleScreen.classList.add('hidden');
        taskScreen.classList.add('hidden');
        endScreen.classList.add('hidden');
        
        // Remove background classes
        container.classList.remove('idle', 'ready', 'start-mode', 'end-mode');

        if (data.state === 'IDLE') {
            idleScreen.classList.remove('hidden');
            container.classList.add('idle');
        } 
        else if (data.state === 'READY') {
            taskScreen.classList.remove('hidden');
            container.classList.add('ready');
            statusLabel.textContent = "Get Ready";
            taskText.textContent = data.task;
        } 
        else if (data.state === 'START') {
            taskScreen.classList.remove('hidden');
            container.classList.add('start-mode');
            statusLabel.textContent = "Task in Progress";
            taskText.textContent = data.task;
        } 
        else if (data.state === 'END') {
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
    // Poll every 500ms
    setInterval(pollStatus, 500);
});
