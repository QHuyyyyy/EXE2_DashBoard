"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useAuth } from "@/contexts/auth-context";
import Image from "next/image";

import { useState, useEffect } from "react";
import { CameraIcon } from "./_components/icons";
import { SocialAccounts } from "./_components/social-accounts";

export default function Page() {
  const { user, isLoading } = useAuth();

  const [data, setData] = useState({
    name: "",
    profilePhoto: "/images/user/user-03.png",
    coverPhoto: "/images/cover/cover-01.png",
    email: "",
    username: "",
    fullName: "",
    phoneNumber: "",
    bio: "",
    isEmailVerified: false,
  });

  // Update data when user is loaded
  useEffect(() => {
    if (user) {
      setData(prev => ({
        ...prev,
        name: user.fullName || user.name || user.username || "Unknown User",
        email: user.email || "",
        username: user.username || "",
        fullName: user.fullName || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.bio || "",
        isEmailVerified: user.isEmailVerified || false,
        profilePhoto: user.profilePictureURL || "/images/user/user-03.png",
      }));
    }
  }, [user]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-[970px]">
        <Breadcrumb pageName="Profile" />
        <div className="flex h-96 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  const handleChange = (e: any) => {
    if (e.target.name === "profilePhoto") {
      const file = e.target?.files[0];

      setData({
        ...data,
        profilePhoto: file && URL.createObjectURL(file),
      });
    } else if (e.target.name === "coverPhoto") {
      const file = e.target?.files[0];

      setData({
        ...data,
        coverPhoto: file && URL.createObjectURL(file),
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-[970px]">
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="relative z-20 h-35 md:h-65">
          <Image
            src={data?.coverPhoto}
            alt="profile cover"
            className="h-full w-full rounded-tl-[10px] rounded-tr-[10px] object-cover object-center"
            width={970}
            height={260}
            style={{
              width: "auto",
              height: "auto",
            }}
          />
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-[15px] py-[5px] text-body-sm font-medium text-white hover:bg-opacity-90"
            >
              <input
                type="file"
                name="coverPhoto"
                id="coverPhoto"
                className="sr-only"
                onChange={handleChange}
                accept="image/png, image/jpg, image/jpeg"
              />

              <CameraIcon />

              <span>Edit</span>
            </label>
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-[176px] sm:p-3">
            <div className="relative drop-shadow-2">
              {data?.profilePhoto && (
                <>
                  <Image
                    src={data?.profilePhoto}
                    width={160}
                    height={160}
                    className="overflow-hidden rounded-full"
                    alt="profile"
                  />

                  <label
                    htmlFor="profilePhoto"
                    className="absolute bottom-0 right-0 flex size-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                  >
                    <CameraIcon />

                    <input
                      type="file"
                      name="profilePhoto"
                      id="profilePhoto"
                      className="sr-only"
                      onChange={handleChange}
                      accept="image/png, image/jpg, image/jpeg"
                    />
                  </label>
                </>
              )}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1 text-heading-6 font-bold text-dark dark:text-white">
              {data?.name}
            </h3>
            <p className="font-medium text-gray-600 dark:text-gray-400">
              username: {data?.username}
            </p>
            <p className="font-medium text-gray-600 dark:text-gray-400">
              {data?.email}
              {data?.isEmailVerified && (
                <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                  ✓ Verified
                </span>
              )}
            </p>
            {data?.phoneNumber && (
              <p className="font-medium text-gray-600 dark:text-gray-400">
                Phone: {data.phoneNumber}
              </p>
            )}
            <div className="mx-auto mb-5.5 mt-5 grid max-w-[420px] grid-cols-3 rounded-[5px] border border-stroke py-3 shadow-1 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-2 py-1 dark:border-dark-3 sm:px-4">
                <span className="text-sm font-semibold text-dark dark:text-white">
                  Role
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                  {user?.role || 'User'}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-2 py-1 dark:border-dark-3 sm:px-4">
                <span className="text-sm font-semibold text-dark dark:text-white">
                  Email
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                  {data?.isEmailVerified ? 'Verified' : 'Verified'}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-2 py-1 sm:px-4">
                <span className="text-sm font-semibold text-dark dark:text-white">
                  Member
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                  {user?.createdAt ? new Date(user.createdAt).getFullYear() : 'N/A'}
                </span>
              </div>
            </div>

            <div className="mx-auto max-w-[720px]">
              <h4 className="font-medium text-dark dark:text-white">
                About Me
              </h4>
              <p className="mt-4">
                {data?.bio || "No bio available. Update your profile to add a bio."}
              </p>
            </div>

            <SocialAccounts />
          </div>
        </div>
      </div>
    </div>
  );
}
