export async function sendChatMessage(message: string) {
    const res = await fetch(
        "https://tourism-services-djcnd9g5fze0dzg7.centralindia-01.azurewebsites.net/api/chat",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        }
    );

    if (!res.ok) {
        throw new Error("Chat API failed");
    }

    return res.json();
}
