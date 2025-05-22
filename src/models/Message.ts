class Message {
    senderId: string;
    receiverId: string;
    content: Content;
    timestamp: Date;

    constructor(senderId: string, receiverId: string, content: Content, timestamp: Date) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content
        this.timestamp = timestamp;
    }

    static fromJson(json: any): Message {
        const message = new Message(json.senderId, json.receiverId, Content.fromJson(json.content), new Date(json.timestamp));
        return message;
    }
}


class Content {
    type: string;
    constructor(type: string) {
        this.type = type;
    }
    static fromJson(json: any): Content {
        switch (json.type) {
            case 'text':
                return new TextContent(json.text);
            case 'image':
                return new ImageContent(json.url);
            case 'audio':
                return new AudioContent(json.url);
            case 'video':
                return new VideoContent(json.url);
            case 'video-call':
                return new VideoCallContent();
            default:
                throw new Error('Invalid content type');
        }
    }
}


class TextContent extends Content {
    text: string;
    constructor(text: string) {
        super('text');
        this.text = text;
    }
}

class ImageContent extends Content {
    url: string;
    constructor(url: string) {
        super('image');
        this.url = url;
    }
}

class AudioContent extends Content {
    url: string;
    constructor(url: string) {
        super('audio');
        this.url = url;
    }
}

class VideoContent extends Content {
    url: string;
    constructor(url: string) {
        super('video');
        this.url = url;
    }
}


class VideoCallContent extends Content {
    constructor() {
        super('video-call');
    }
}

export { Message, Content, TextContent, ImageContent, AudioContent, VideoContent, VideoCallContent };