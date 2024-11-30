// async function query(data) {
//     const response = await fetch(
//         `https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev`,
//         {
//             headers: {
//                 Authorization: `Bearer ${env.API_TOKEN}`, // Load from .env
//                 "Content-Type": "application/json",
//             },
//             method: "POST",
//             body: JSON.stringify(data),
//         }
//     );
//     const result = await response.blob();
//     return result;
// }

// document.getElementById("generateBtn").addEventListener("click", async () => {
//     const prompt = document.getElementById("prompt").value.trim();
//     const outputArea = document.getElementById("output");
//     const downloadArea = document.getElementById("downloadArea");
//     const downloadBtn = document.getElementById("downloadBtn");

//     if (!prompt) {
//         outputArea.innerHTML = "<p>Please enter a valid prompt!</p>";
//         return;
//     }

//     outputArea.innerHTML = "<p>Generating image...</p>";
//     downloadArea.style.display = "none";

//     try {
//         const blob = await query({ inputs: prompt });
//         const url = URL.createObjectURL(blob);

//         outputArea.innerHTML = `<img src="${url}" alt="Generated Image">`;
//         downloadArea.style.display = "block";

//         // Set download functionality
//         downloadBtn.onclick = () => {
//             const a = document.createElement("a");
//             a.href = url;
//             a.download = "generated_image.png";
//             a.click();
//         };
//     } catch (error) {
//         console.error("Error generating image:", error);
//         outputArea.innerHTML = "<p>Error generating image. Please try again later.</p>";
//     }
// });
import env from './env_loader.js'; // Import local environment variables (for local development)

const API_TOKEN = process.env.API_TOKEN || env.API_TOKEN; // Use Vercel env variable or fallback to local

async function query(data) {
    const response = await fetch(
        `https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev`,
        {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`, // Load API token dynamically
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

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
