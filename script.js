const typingSpeed = 12;
const nextLineDelay = 1;

document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.getElementById("terminal");
    const terminalContainer = document.getElementById("terminal-container");

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const lines = data.lines;
            let currentLine = 0;
            let currentChar = 0;

            function typeLine() {
                if (currentLine >= lines.length) return;

                const line = lines[currentLine];
                const tempDiv = document.createElement("div");
                terminal.appendChild(tempDiv);

                const interval = setInterval(() => {
                    tempDiv.innerHTML = line.slice(0, ++currentChar);
                    terminalContainer.scrollTop = terminalContainer.scrollHeight;
                    if (currentChar >= line.length) {
                        clearInterval(interval);
                        currentChar = 0;
                        currentLine++;
                        setTimeout(typeLine, nextLineDelay);
                    }
                }, typingSpeed);
            }

            typeLine();
        });
});
