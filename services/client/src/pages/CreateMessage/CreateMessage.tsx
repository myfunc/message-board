import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMessage } from "../../common/api";
import { v4 as uuidv4 } from "uuid";

const CreateMessage: React.FC = () => {
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createMessage({ id: uuidv4(), author, content });
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
            />
            <button type="submit">Create message</button>
        </form>
    );
};

export default CreateMessage;
