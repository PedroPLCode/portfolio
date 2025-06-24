document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.getElementById("terminal");
    const terminalContainer = document.getElementById("terminal-container");
    const scrollBottomAnchor = document.getElementById("scroll-bottom-anchor");

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const lines = data.lines;
            let currentLine = 0;
            let currentChar = 0;

            function typeLine() {
                if (currentLine >= lines.length) {
                    scrollBottomAnchor.scrollIntoView({ behavior: "smooth" });
                    return;
                }

                const lineObj = lines[currentLine];
                const lineText = typeof lineObj === "string" ? lineObj : lineObj.text;
                const typingSpeed = lineObj.typingSpeed || 25;
                const nextLineDelay = lineObj.nextLineDelay || 10;
                const tempDiv = document.createElement("div");
                terminal.appendChild(tempDiv);

                const interval = setInterval(() => {
                    tempDiv.innerHTML = lineText.slice(0, ++currentChar);
                    terminalContainer.scrollTop = terminalContainer.scrollHeight;

                    if (currentChar >= lineText.length) {
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
