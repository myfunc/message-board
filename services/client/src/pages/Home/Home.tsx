import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMessages } from "../../common/api";
import { Message } from "../../common/schema";

const Home: React.FC = () => {
    const [messages, setMessages] = useState([] as Message[]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMessages(page * 10, 10);
            setMessages(data);
        };
        fetchData();
    }, [page]);

    return (
        <div>
            {messages.map((message, index) => (
                <div key={index}>
                    {message.author}: {message.content}
                </div>
            ))}
            <button onClick={() => setPage(page - 1)}>Previous</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
            <Link to="/create-message">Create message</Link>
        </div>
    );
};

export default Home;
