export async function triggerSOS() {
    const res = await fetch("http://localhost:8080/api/sos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!res.ok) {
        throw new Error("Failed to send SOS");
    }

    return res.json();
}
