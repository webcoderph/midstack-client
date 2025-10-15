import { FC, useEffect, useState } from "react";
import { useEditProfile } from "../api/useEditProfile";

interface ProfileViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

export const ProfileView: FC<ProfileViewProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name , setName] = useState(user?.name || "");
  const { isPending, isSuccess, mutate: editUserFn } = useEditProfile({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      console.log("Profile updated successfully:", data);
      setTimeout(() => { setIsEditing(false) }, 3000);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error("Profile update error:", error);
    },
  });

  useEffect(() => {
    setName(user?.name || "");
  }, [user]);

  const onEdit = () => {
    setIsEditing(true); 
  };

  const handleSave = () => {
    editUserFn({ id: user.id, name });
  }

  return (
    <div className="p-4 bg-white rounded-2xl shadow w-[450px]">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      <p>
        <strong>Name:</strong> {user?.name}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      {isEditing ? (
        <div className="mt-4 p-4 bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Edit Profile</h3>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-2 mb-2"
          />
          <button
            onClick={handleSave}
            className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-700 cursor-pointer mr-2"
          >
            {isPending ? 'Saving...' : 'Save' }
          </button>
           {isSuccess && (
          <div
            className="p-4 mb-4 mt-[10px] text-sm text-green-800 rounded-lg bg-green-50"
            role="alert"
          >
            <span className="font-medium"> Profile updated successfully!!</span> You
            need to logout and login again to see the changes.
          </div>
        )}
        </div>
      ) : (
        <button
          onClick={onEdit}
          className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-700 cursor-pointer"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};
