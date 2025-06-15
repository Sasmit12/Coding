import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Alert from "../../components/common/Alert";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "consumer", // Set default role
    },
  });
  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      console.log("Form data received:", data);
      
      // Validate that firstName and lastName are not empty
      if (!data.firstName?.trim() || !data.lastName?.trim()) {
        console.error("Missing firstName or lastName:", { firstName: data.firstName, lastName: data.lastName });
        setError("First name and last name are required");
        toast.error("Please fill in all required fields");
        return;
      }

      // Format the data properly for the auth service
      const userData = {
        email: data.email,
        password: data.password,
        name: `${data.firstName.trim()} ${data.lastName.trim()}`, // Combine firstName and lastName
        role: data.role || "consumer", // Fallback to consumer if not set
      };
      
      console.log("Formatted user data:", userData);
      
      const result = await registerUser(userData);
      
      console.log("Registration result:", result);
      
      if (result.success) {
        toast.success("Account created successfully!");
        navigate("/");
      } else {
        setError(result.error || "Failed to create account. Please try again.");
        toast.error("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error in component:", err);
      setError(err.message || "Failed to create account. Please try again.");
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-green-600 hover:text-green-500 dark:text-green-400"
            >
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <Alert type="error" message={error} onClose={() => setError("")} />
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  id="firstName"
                  type="text"
                  label="First name"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  error={errors.firstName?.message}
                  disabled={isLoading}
                />
              </div>
              <div>
                <Input
                  id="lastName"
                  type="text"
                  label="Last name"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  error={errors.lastName?.message}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <Input
                id="email"
                type="email"
                label="Email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={errors.email?.message}
                disabled={isLoading}
              />
            </div>

            <div>
              <Input
                id="password"
                type="password"
                label="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={errors.password?.message}
                disabled={isLoading}
              />
            </div>

            <div>
              <Input
                id="confirmPassword"
                type="password"
                label="Confirm password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
                error={errors.confirmPassword?.message}
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="role-consumer" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                I want to register as a:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input
                    id="role-consumer"
                    type="radio"
                    value="consumer"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    {...register("role", { required: "Please select a role" })}
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="role-consumer"
                    className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                  >
                    Consumer
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="role-farmer"
                    type="radio"
                    value="farmer"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    {...register("role", { required: "Please select a role" })}
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="role-farmer"
                    className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                  >
                    Farmer
                  </label>
                </div>
              </div>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.role.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
