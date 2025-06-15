import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      bio: user?.bio || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateProfile(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow rounded-lg">
        {/* Profile Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Profile Settings
            </h1>
            <Button
              variant={isEditing ? "outline" : "primary"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 py-6">
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Full Name"
                {...register("name", { required: "Name is required" })}
                error={errors.name?.message}
              />

              <Input
                label="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={errors.email?.message}
              />

              <Input
                label="Phone"
                {...register("phone", {
                  pattern: {
                    value: /^\+?[\d\s-]+$/,
                    message: "Invalid phone number",
                  },
                })}
                error={errors.phone?.message}
              />

              <Input
                label="Address"
                {...register("address")}
                error={errors.address?.message}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  {...register("bio")}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-farmer-primary border-gray-300"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                <p className="mt-1 text-lg text-gray-900">{user?.name}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-lg text-gray-900">{user?.email}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="mt-1 text-lg text-gray-900">
                  {user?.phone || "Not provided"}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="mt-1 text-lg text-gray-900">
                  {user?.address || "Not provided"}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                <p className="mt-1 text-lg text-gray-900">
                  {user?.bio || "No bio provided"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Account Settings */}
        <div className="px-6 py-6 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Account Settings
          </h2>
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/change-password")}
            >
              Change Password
            </Button>
            {user?.role === "farmer" && (
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/payment-settings")}
              >
                Payment Settings
              </Button>
            )}
            <Button
              variant="danger"
              onClick={() => (window.location.href = "/delete-account")}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
