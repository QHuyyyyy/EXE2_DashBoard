import { Metadata } from "next";
import SubdivisionManagementPage from "@/components/Subdivision/SubdivisionManagementPage";

export const metadata: Metadata = {
    title: "Subdivision Management | Dashboard",
    description: "Manage subdivisions and subdivision information",
};

export default function SubdivisionManagement() {
    return <SubdivisionManagementPage />;
}