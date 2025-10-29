"use client";

import {
  CallIcon,
  EmailIcon,
  PencilSquareIcon,
  UserIcon,
} from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { useEffect, useState } from "react";
import authService from "@/services/auth";
import { UserService } from "@/services/user.service";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/auth-context";

export function PersonalInfoForm() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePictureURL, setProfilePictureURL] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | undefined>(undefined);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean | undefined>(undefined);
  const [createdAt, setCreatedAt] = useState<string | undefined>(undefined);
  const { user } = useAuth();

  useEffect(() => {
    // Prefer auth context user if available, otherwise fetch
    const load = async () => {
      try {
        let currentUser = user;

        if (!currentUser) {
          currentUser = await authService.getCurrentUser();
        }

        if (currentUser) {
          const uid = (currentUser as any).userID || (currentUser as any).id || (currentUser as any).userId || "";
          setUserId(uid?.toString() || "");
          setFullName((currentUser as any).fullName || (currentUser as any).name || "");
          setPhoneNumber((currentUser as any).phoneNumber || "");
          setEmail((currentUser as any).email || "");
          setUsername((currentUser as any).username || "");
          setBio((currentUser as any).bio || "");
          setProfilePictureURL((currentUser as any).profilePictureURL || (currentUser as any).avatar || null);
          setRole((currentUser as any).role || (currentUser as any).userRole);
          setIsEmailVerified((currentUser as any).isEmailVerified);
          setCreatedAt((currentUser as any).createdAt);
        }
      } catch (err) {
        console.error("Failed to load user info:", err);
        toast.error("Unable to load user information");
      }
    };

    load();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User id not found");
      return;
    }

    const payload: any = {
      username,
      email,
      fullName,
      phoneNumber,
      // API has inconsistent casing for profile picture field; include both.
      profilePictureUrl: profilePictureURL,
      profilePictureURL: profilePictureURL,
      bio,
    };

    if (role) payload.role = role;

    try {
      const user = await UserService.updateUser(userId.toString(), payload as any);
      console.log("User updated successfully", user);
      const stored = localStorage.getItem("user-data");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const updated = { ...parsed, ...payload };
          localStorage.setItem("user-data", JSON.stringify(updated));
        } catch (_) {
          // ignore
        }
      }

      toast.success("Profile updated");
    } catch (err: any) {
      console.error("Failed to update user:", err);
      toast.error(err?.message || "Failed to update profile");
    }
  };

  return (
    <ShowcaseSection title="Personal Information" className="!p-7">
      <form onSubmit={handleSubmit}>
        <div className="mb-5.5 grid gap-4 sm:grid-cols-4">
          <div className="col-span-1">
            <label className="text-body-sm font-medium text-dark dark:text-white">User ID</label>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{userId || "-"}</div>
          </div>

          <div className="col-span-1">
            <label className="text-body-sm font-medium text-dark dark:text-white">Role</label>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{role || "-"}</div>
          </div>

          <div className="col-span-1">
            <label className="text-body-sm font-medium text-dark dark:text-white">Email Verified</label>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{isEmailVerified ? "Yes" : "No"}</div>
          </div>

          <div className="col-span-1">
            <label className="text-body-sm font-medium text-dark dark:text-white">Member Since</label>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{createdAt ? new Date(createdAt).toLocaleDateString() : "-"}</div>
          </div>
        </div>

        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="fullName"
            label="Full Name"
            placeholder="Full name"
            value={fullName}
            handleChange={(e) => setFullName(e.target.value)}
            icon={<UserIcon />}
            iconPosition="left"
            height="sm"
          />

          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="phoneNumber"
            label="Phone Number"
            placeholder="Phone number"
            value={phoneNumber}
            handleChange={(e) => setPhoneNumber(e.target.value)}
            icon={<CallIcon />}
            iconPosition="left"
            height="sm"
          />
        </div>

        <InputGroup
          className="mb-5.5"
          type="email"
          name="email"
          label="Email Address"
          placeholder="email@example.com"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
          icon={<EmailIcon />}
          iconPosition="left"
          height="sm"
        />

        <InputGroup
          className="mb-5.5"
          type="text"
          name="username"
          label="Username"
          placeholder="username"
          value={username}
          handleChange={(e) => setUsername(e.target.value)}
          icon={<UserIcon />}
          iconPosition="left"
          height="sm"
        />

        <TextAreaGroup
          className="mb-5.5"
          label="BIO"
          placeholder="Write your bio here"
          icon={<PencilSquareIcon />}
          value={bio}
          handleChange={(e) => setBio(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            className="rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
            type="button"
            onClick={() => {
              // reset to loaded values
              (async () => {
                try {
                  const currentUser = await authService.getCurrentUser();
                  setFullName((currentUser as any).fullName || "");
                  setPhoneNumber((currentUser as any).phoneNumber || "");
                  setEmail((currentUser as any).email || "");
                  setUsername((currentUser as any).username || "");
                  setBio((currentUser as any).bio || "");
                } catch (err) {
                  console.error(err);
                }
              })();
            }}
          >
            Cancel
          </button>

          <button
            className="rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
}
