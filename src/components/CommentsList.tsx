// components/CommentsList.tsx
"use client";

import React, { useEffect, useState } from "react";
import type { Comment } from "@/types";

interface CommentsListProps {
    slug: string;
}

const CommentsList = ({ slug }: CommentsListProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/comment/get-all`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch comments");
                }

                const result = await response.json();
                const allComments = result.data as Comment[];
                console.log("All Comments", allComments)

                // Filter comments for the current blog
                const filteredComments = allComments.filter((comment) => {
                    const blogSlug = comment?.blog?.meta?.en?.slug;
                    return blogSlug === slug;
                });

                setComments(filteredComments);
            } catch (error) {
                console.error("Error fetching comments:", error);
                setError("Failed to load comments. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [slug]);

    if (loading) {
        return <div>Loading comments...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="mt-20">
            <h3 className="text-xl font-semibold leading-none tracking-[-0.24px] mb-8 md:mb-12 md:text-2xl">
                Comments
            </h3>
            <div className="grid grid-cols-1 gap-6">
                {comments.map((comment) => (
                    <div
                        key={comment.slug}
                        className="p-6 border border-appGray-200 rounded-lg"
                    >
                        <h4 className="text-lg font-semibold">
                            {comment.title}
                        </h4>
                        <p className="text-sm text-appGray-500">
                            From: {comment.from}
                        </p>
                        <p className="mt-2">{comment.comment_text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentsList;