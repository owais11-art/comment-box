export interface IUser {
    image: {
        png: string,
        webp: string
    },
    username: string
}

export interface IComment {
    id: string,
    content: string,
    createdAt: string,
    score: number
    user: IUser,
    replies?: IReply[]
}

export interface IReply extends IComment {
    replyingTo: string
}

export interface IReplyEmit {
    reply: IReply,
    id: string
}

export interface IUpdatePayload {
    content: string,
    id: [string, string?]
}

export type TDeletePayload = [string, string?]

