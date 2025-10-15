import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type tRegistrationProps = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registrationFn = async (userData: tRegistrationProps) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useRegistration(options?: tRegistrationProps & any) {
	return useMutation<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any, 
    Error, 
    tRegistrationProps 
  >({
        mutationFn: registrationFn,
        ...options,
        onSuccess: (data, variables, context) => {
            console.log("Registration successful:", data);
            if (options && options.onSuccess) {
                options.onSuccess(data, variables, context);
            }
        },
        onError: (error, variables, context) => {
            console.error("Registration error:", error);
            if (options && options.onError) {
                options.onError(error, variables, context);
            }
        },
	});
}
