import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type tEditProps = {
  id: number;
  name: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const editUserFn = async (userData: tEditProps) => {
  let token = null;
  try {
    const storedAuth = JSON.parse(localStorage.getItem("midstack") ?? "{}");
    if (Object.keys(storedAuth).length > 0) {
      token = storedAuth.token;
    }

    if (!token) {
      throw new Error("No auth token found");
    }
    const response = await axios.put(
      `${import.meta.env.VITE_API_URI}/api/users/${userData.id}`,
      { name: userData.name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useEditProfile(options?: tEditProps & any) {
  return useMutation<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    Error,
    tEditProps
  >({
    mutationFn: editUserFn,
    ...options,
    onSuccess: (data, variables, context) => {
      console.log("Update Profile successful:", data);
      if (options && options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      console.error("Update Profile error:", error);
      if (options && options.onError) {
        options.onError(error, variables, context);
      }
    },
  });
}
