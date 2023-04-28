import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMessage } from "../../common/api";
import { v4 as uuidv4 } from "uuid";
import "./CreateMessage.scss";

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
        <div className="create-message">
            <div className="top-panel">
                <h1 className="top-panel-title">Create message</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="create-message-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Message"
                    rows={3}
                />
                <input
                    className="create-message-author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author"
                />
                <div className="create-message-button-panel">
                    <button className="create-message-button" type="submit">
                        Create message
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateMessage;
