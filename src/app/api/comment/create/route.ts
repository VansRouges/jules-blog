import { NextResponse } from "next/server";
import { bcms } from "@/app/bcms-client";
// import { CommentEntry, CommentEntryMetaItem } from "@bcms-types/types/ts";


export async function POST(request: Request) {
    try {
        // Parse the request body
        const body = await request.json();

        // Validate required fields
        if (!body.title || !body.slug || !body.from || !body.blog?.entryId || !body.blog?.templateId) {
            return NextResponse.json(
                { success: false, error: "Missing required fields (title, slug, from, blog.entryId, blog.templateId)" },
                { status: 400 }
            );
        }

        // Create the comment using the provided data
        const newComment = await bcms.entry.create("comment", {
            content: [],
            statuses: [],
            meta: [
                {
                    lng: "en",
                    data: {
                        title: body.title,
                        slug: body.slug,
                        from: body.from,
                        blog: {
                            entryId: body.blog.entryId,
                            templateId: body.blog.templateId,
                        },
                    },
                },
            ],
        });

        return NextResponse.json({ success: true, data: newComment });
    } catch (error) {
        console.error("Error creating comment:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create comment" },
            { status: 500 }
        );
    }
}