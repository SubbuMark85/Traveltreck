export async function triggerSOS() {
    const res = await fetch("https://tourism-services-djcnd9g5fze0dzg7.centralindia-01.azurewebsites.net/api/sos", {
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
