import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getMessages } from "../../common/api";
import { Message } from "../../common/schema";
import "./Home.scss";

const Home: React.FC = () => {
    const [messages, setMessages] = useState([] as Message[]);
    const location = useLocation();
    const page = Number(new URLSearchParams(location.search).get("page")) || 0;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMessages(page * 10, 10);
            setMessages(data);
        };
        fetchData();
    }, [page]);

    const handlePageChange = (newPage: number) => {
        navigate(`?page=${newPage}`);
    };

    return (
        <div className="home">
            <div className="top-panel">
                <h1 className="top-panel-title">Messages</h1>
                <Link className="link-button" to="/create-message">
                    Create message
                </Link>
            </div>
            <div className="message-list">
                {messages.map((message, index) => (
                    <div className="message-card" key={index}>
                        <div className="message-card-content">
                            {message.content}
                        </div>
                        <div className="message-card-footer">
                            {message.author}
                        </div>
                    </div>
                ))}
            </div>
            <div className="navigation">
                <button
                    className="navigation-button"
                    onClick={() => handlePageChange(Number(page) - 1)}
                    disabled={Number(page) === 0}
                >
                    Previous
                </button>
                <button
                    className="navigation-button"
                    onClick={() => handlePageChange(Number(page) + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;
