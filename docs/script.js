const backendUrl = 'http://localhost:3000';

async function loadDay(day) {
    const response = await fetch(`${backendUrl}/questions/${day}`);
    const questions = await response.json();

    const container = document.getElementById('questions-container');
    container.innerHTML = '';

    if (Array.isArray(questions)) {
        questions.forEach((q) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';

            questionDiv.innerHTML = `
                <p>${q.text}</p>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" onchange="updateQuestion('${day}', ${q.id}, 'Completed')"
                            ${q.status === 'Completed' ? 'checked' : ''}>
                        Completed
                    </label>
                    <label>
                        <input type="checkbox" onchange="updateQuestion('${day}', ${q.id}, 'Need to revise')"
                            ${q.status === 'Need to revise' ? 'checked' : ''}>
                        Need to revise
                    </label>
                    <label>
                        <input type="checkbox" onchange="updateQuestion('${day}', ${q.id}, 'Save for later')"
                            ${q.status === 'Save for later' ? 'checked' : ''}>
                        Save for later
                    </label>
                </div>
            `;
            container.appendChild(questionDiv);
        });
    } else {
        container.innerHTML = '<p>No questions available for this day.</p>';
    }
}

async function updateQuestion(day, id, status) {
    await fetch(`${backendUrl}/questions/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day, id, status })
    });
    loadDay(day); // Refresh questions for the current day
}