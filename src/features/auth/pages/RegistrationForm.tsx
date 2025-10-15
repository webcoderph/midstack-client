import { useState, FC } from "react";
import { useRegistration } from "../api/useRegistration";

export const RegisterForm: FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const {
    isError,
    isSuccess,
    isPending,
    mutate: registrationFn,
  } = useRegistration({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      console.log("Registration successful:", data);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error("Registration error:", error);
    },
  });

  const handleRegister = () => {
    registrationFn({
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-[25px]  bg-white rounded-2xl shadow w-[500px]">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border rounded p-2 mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border rounded p-2 mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border rounded p-2 mb-4"
        />
        <input
          type="password"
          placeholder="Password Confirmation"
          value={form.password_confirmation}
          onChange={(e) =>
            setForm({ ...form, password_confirmation: e.target.value })
          }
          className="w-full border rounded p-2 mb-4"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-700 cursor-pointer"
        >
          {isPending ? "Registering..." : "Register"}
        </button>
        {isError && (
          <div
            className="p-4 mb-4 mt-[10px] text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <span className="font-medium">Registration failed!</span> Change a
            few things up and try submitting again.
          </div>
        )}
        {isSuccess && (
          <div
            className="p-4 mb-4 mt-[10px] text-sm text-green-800 rounded-lg bg-green-50"
            role="alert"
          >
            <span className="font-medium"> Registered successfully!!</span> You
            will be redirected to login page.
          </div>
        )}
      </div>
    </div>
  );
};
