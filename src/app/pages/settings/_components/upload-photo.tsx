"use client";

import { UploadIcon } from "@/assets/icons";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import Image from "next/image";
import { useEffect, useState } from "react";
import authService from "@/services/auth";
import { UserService } from "@/services/user.service";
import { useAuth } from "@/contexts/auth-context";
import toast from "react-hot-toast";

export function UploadPhotoForm() {
  const { user } = useAuth();
  const [url, setUrl] = useState("");
  const [initialUrl, setInitialUrl] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        let currentUser = user;
        if (!currentUser) {
          currentUser = await authService.getCurrentUser();
        }

        if (currentUser) {
          const pic = (currentUser as any).profilePictureURL || (currentUser as any).avatar || null;
          const uid = (currentUser as any).userID || (currentUser as any).id || (currentUser as any).userId || null;
          setInitialUrl(pic);
          setUrl(pic || "");
          setUserId(uid?.toString() || null);
        }
      } catch (err) {
        console.error("Failed to load profile photo:", err);
      }
    };

    load();
  }, [user]);

  const displayedSrc = url || initialUrl || "/images/user/user-03.png";

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast.error("User id not found");
      return;
    }

    // Ensure we send the full user object fields along with the picture update
    let currentUser: any = user;
    try {
      if (!currentUser) {
        currentUser = await authService.getCurrentUser();
      }
    } catch (err) {
      // fallback to localStorage if available
      const stored = localStorage.getItem("user-data");
      if (stored) {
        try {
          currentUser = JSON.parse(stored);
        } catch (_) {
          currentUser = null;
        }
      }
    }

    const payload: any = {
      // include editable profile fields so PUT updates all personal-info fields
      username: currentUser?.username || undefined,
      email: currentUser?.email || undefined,
      fullName: currentUser?.fullName || currentUser?.name || undefined,
      phoneNumber: currentUser?.phoneNumber || undefined,
      bio: currentUser?.bio || undefined,
      role: currentUser?.role || undefined,
      // include both picture field variants for backend compatibility
      profilePictureUrl: url || null,
      profilePictureURL: url || null,
    };

    try {
      await UserService.updateUser(userId.toString(), payload);
      // update local cache (merge updated fields)
      const stored = localStorage.getItem("user-data");
      if (stored) {
        try {
          const parsed = JSON.parse(stored) || {};
          const merged = {
            ...parsed,
            ...(payload.username !== undefined ? { username: payload.username } : {}),
            ...(payload.email !== undefined ? { email: payload.email } : {}),
            ...(payload.fullName !== undefined ? { fullName: payload.fullName } : {}),
            ...(payload.phoneNumber !== undefined ? { phoneNumber: payload.phoneNumber } : {}),
            ...(payload.bio !== undefined ? { bio: payload.bio } : {}),
            ...(payload.role !== undefined ? { role: payload.role } : {}),
            profilePictureURL: payload.profilePictureURL,
          };
          localStorage.setItem("user-data", JSON.stringify(merged));
        } catch (_) { }
      }
      setInitialUrl(url || null);
      toast.success("Profile photo updated");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Unable to update profile photo");
    }
  };

  const handleCancel = () => {
    setUrl(initialUrl || "");
  };

  return (
    <ShowcaseSection title="Your Photo" className="!p-7">
      <form onSubmit={handleSave}>
        <div className="mb-4 flex items-center gap-3">
          {(displayedSrc || "").startsWith("http://") || (displayedSrc || "").startsWith("https://") ? (
            <img
              src={displayedSrc}
              width={55}
              height={55}
              alt="User"
              className="size-14 rounded-full object-cover"
            />
          ) : (
            <Image
              src={displayedSrc}
              width={55}
              height={55}
              alt="User"
              className="size-14 rounded-full object-cover"
              quality={90}
            />
          )}

          <div>
            <span className="mb-1.5 font-medium text-dark dark:text-white">
              Edit your photo (use image URL)
            </span>
            <span className="flex gap-3">
              <button type="button" onClick={() => { setUrl(""); }} className="text-body-sm hover:text-red">
                Delete
              </button>
              <button type="button" onClick={() => setUrl(initialUrl || "")} className="text-body-sm hover:text-primary">
                Reset
              </button>
            </span>
          </div>
        </div>

        <div className="mb-5.5">
          <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">Photo URL</label>
          <input
            type="text"
            name="photoUrl"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="flex justify-center rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="flex items-center justify-center rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
}
