async function query(data) {
    const response = await fetch(
        `https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev`,
        {
            headers: {
                Authorization: `Bearer ${env.API_TOKEN}`, // Load from .env
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    return result;
}

document.getElementById("generateBtn").addEventListener("click", async () => {
    const prompt = document.getElementById("prompt").value.trim();
    const outputArea = document.getElementById("output");
    const downloadArea = document.getElementById("downloadArea");
    const downloadBtn = document.getElementById("downloadBtn");

    if (!prompt) {
        outputArea.innerHTML = "<p>Please enter a valid prompt!</p>";
        return;
    }

    outputArea.innerHTML = "<p>Generating image...</p>";
    downloadArea.style.display = "none";

    try {
        const blob = await query({ inputs: prompt });
        const url = URL.createObjectURL(blob);

        outputArea.innerHTML = `<img src="${url}" alt="Generated Image">`;
        downloadArea.style.display = "block";

        // Set download functionality
        downloadBtn.onclick = () => {
            const a = document.createElement("a");
            a.href = url;
            a.download = "generated_image.png";
            a.click();
        };
    } catch (error) {
        console.error("Error generating image:", error);
        outputArea.innerHTML = "<p>Error generating image. Please try again later.</p>";
    }
});
