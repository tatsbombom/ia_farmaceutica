document.addEventListener("DOMContentLoaded", function () {
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const messagesContainer = document.getElementById("messages");

    async function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === "") return;

        // Exibir a mensagem do usuário no chat
        appendMessage("user", userMessage);
        userInput.value = "";

        try {
            const response = await fetch("https://tats-ai.onrender.com/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [{ role: "user", content: userMessage }] })
            });

            const data = await response.json();
            if (data.reply) {
                appendMessage("bot", data.reply);
            } else {
                appendMessage("bot", "Desculpe, não consegui processar a resposta.");
            }
        } catch (error) {
            console.error("Erro ao conectar ao servidor:", error);
            appendMessage("bot", "Erro ao conectar à IA.");
        }
    }

    function appendMessage(role, text) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", role);
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Rolar para a última mensagem
    }

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });
});
