export type Message = {
    id: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
};

export type CreateMessage = {
    id: string;
    content: string;
    author: string;
};

export type SuccessResponse = {
    success: boolean;
};

export type ErrorResponse = {
    statusCode: number;
    message: string;
    error: string;
};
