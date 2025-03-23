// components/CommentForm.tsx
"use client";
import React, { useState } from "react";

interface CommentFormProps {
    blogEntryId: string;
    blogTemplateId: string;
}

const CommentForm = ({ blogEntryId, blogTemplateId }: CommentFormProps) => {
    const [title, setTitle] = useState("");
    const [from, setFrom] = useState("");
    const [commentText, setCommentText] = useState("");

    // Function to generate slug from title
    const generateSlug = (title: string) => {
        return title.toLowerCase().replace(/\s+/g, "-");
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Generate slug from title
        const slug = generateSlug(title);

        // Prepare the comment data
        const commentData = {
            title,
            slug,
            from,
            comment_text: commentText,
            blog: {
                entryId: blogEntryId,
                templateId: blogTemplateId,
            },
        };

        // Log the comment data to the console (for now)
        console.log("Comment Data:", commentData);

        try {
            // Send the comment data to the API
            const response = await fetch("/api/comment/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(commentData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit comment");
            }

            const result = await response.json();
            console.log("Comment created successfully:", result);

            // Reset form fields
            setTitle("");
            setFrom("");
            setCommentText("");
            location.reload();
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    return (
        <div className="mt-20">
            <h3 className="text-xl font-semibold leading-none tracking-[-0.24px] mb-8 md:mb-12 md:text-2xl">
                Add a Comment
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="from" className="block text-sm font-medium text-gray-700">
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="from"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="comment_text" className="block text-sm font-medium text-gray-700">
                        Comment
                    </label>
                    <textarea
                        id="comment_text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        rows={4}
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Submit Comment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CommentForm;