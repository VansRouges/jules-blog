// await privateBcmsClient.entry.create('blog', {
//     statuses: [],
//     content: [],
//     meta: [
//         {
//             lng: 'en',
//             data: {
//                 title: 'Comment title',
//                 slug: 'comment-title',
//                 from: 'John',
//                 blog: {
//                     entryId: 'BLOG_ENTRY_ID',
//                     templateId: 'BLOG_TEMPLATE_ID',
//                 },
//             },
//         },
//     ],
// });

import { bcms } from "@/app/bcms-client";
import { BlogEntry, BlogEntryMetaItem } from "@bcms-types/types/ts";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const blogs = (await bcms.entry.getAll('blog')) as BlogEntry[];

        const items = blogs.map((blog) => {
            return blog.meta.en as BlogEntryMetaItem;
        });
        return NextResponse.json({ success: true, data: items });
    } catch (error) {
        console.error("Failed to fetch support requests:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch support requests" }, { status: 500 });
    }
}