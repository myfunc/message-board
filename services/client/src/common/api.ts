import { API_URL } from "..";
import { Message, SuccessResponse } from "./schema";

export async function getMessages(
    skip: number,
    take: number
): Promise<Message[]> {
    const response = await fetch(
        `${API_URL}/messages?skip=${skip}&take=${take}`
    );
    const data = await response.json();
    return data.data;
}

export async function createMessage(message: {
    id: string;
    author: string;
    content: string;
}): Promise<SuccessResponse> {
    const response = await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
    });
    const data = await response.json();
    return data;
}
