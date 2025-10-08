import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { PostManagementPage } from "@/components/Post";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Post Management",
};

const PostManagement = () => {
    return (
        <>
            <Breadcrumb pageName="Post Management" />
            <div className="space-y-6">
                <PostManagementPage />
            </div>
        </>
    );
};

export default PostManagement;