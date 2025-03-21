interface BlogMeta {
    title: string;
    slug: string;
    date: {
        timestamp: number;
        timezoneOffset: number;
    };
    description: {
        nodes: Array<{
            type: string;
            value: string;
        }>;
    };
    cover_image: {
        _id: string;
        type: string;
        mimetype: string;
        alt_text: string;
        caption: string;
        name: string;
        width: number;
        height: number;
        size: number;
        src: string;
        sizeTransforms: string[];
        version: string;
        url: string;
    };
}

interface BlogContentNode {
    type: string;
    value: string;
    attrs?: {
        level?: number;
    };
}

interface Blog {
    _id: string;
    createdAt: number;
    updatedAt: number;
    instanceId: string;
    templateId: string;
    templateName: string;
    userId: string;
    statuses: any[]; // Replace `any` with a more specific type if needed
    meta: {
        en: BlogMeta;
    };
    content: {
        en: BlogContentNode[];
    };
}

export interface Comment {
    title: string;
    slug: string;
    from: string;
    comment_text: string | null;
    blog?: Blog;
}