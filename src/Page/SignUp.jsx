import { useForm } from "react-hook-form";
import { createUser, login } from "../appwrite/User";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as AuthLogin } from "../redux/authSlice";
export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const res = await createUser(data.email, data.password, data.name);

    if (res) {
      const log = await login(data.email,data.password)
       await dispatch(AuthLogin(log));
       console.log(log);
       
      navigate("/adduserdetails");

      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-1/2 max-w-md space-y-6"
      >
        <div className="text-center">
          <h1 className="text-3xl font-extrabold flex items-center justify-center gap-2">
            Hello, Welcome to <span className="font-mono">Blogger</span>
            <img src="blogger.png" alt="Blogger logo" className="h-8" />
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Create your free account to get started
          </p>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Full Name*
          </label>
          <input
            id="name"
            placeholder="John Doe"
            {...register("name", {
              required: "Full Name is required",
              maxLength: { value: 50, message: "Max length is 50 characters" },
            })}
            className="bg-secondaryBg p-3 border focus:outline-none focus:ring-2 focus:ring-gray-400 w-full rounded-lg shadow-sm"
          />
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.name?.message && "*" + errors.name?.message}
          </p>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email*
          </label>
          <input
            id="email"
            placeholder="doe@xyz.com"
            type="email"
            {...register("email", {
              required: "Email is required",
              maxLength: { value: 100, message: "Email is too long" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="bg-secondaryBg p-3 border focus:outline-none focus:ring-2 focus:ring-gray-400 w-full rounded-lg shadow-sm"
          />
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.email?.message && "*" + errors.email?.message}
          </p>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password*
          </label>
          <input
            id="password"
            placeholder="*****"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Min length is 8 characters" },
              validate: {
                hasUpperCase: (value) =>
                  /[A-Z]/.test(value) || "Must contain an uppercase letter",
                hasNumber: (value) =>
                  /[0-9]/.test(value) || "Must contain a number",
                hasLowerCase: (value) =>
                  /[a-z]/.test(value) || "Must contain a lowercase letter",
              },
            })}
            className="bg-secondaryBg p-3 border focus:outline-none focus:ring-2 focus:ring-gray-400 w-full rounded-lg shadow-sm"
          />
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.password?.message && "*" + errors.password?.message}
          </p>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-1"
          >
            Confirm Password*
          </label>
          <input
            id="confirmPassword"
            placeholder="*****"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              minLength: { value: 8, message: "Min length is 8 characters" },
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            className="bg-secondaryBg p-3 border focus:outline-none focus:ring-2 focus:ring-gray-400 w-full rounded-lg shadow-sm"
          />
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.confirmPassword?.message &&
              "*" + errors.confirmPassword.message}
          </p>
        </div>

        <button
          type="submit"
          className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-base font-medium rounded-lg text-white bg-primaryText hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryText transition-all duration-200"
        >
          Create Account
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="font-medium underline text-primaryText">
            Login
          </a>
        </p>
      </form>

      <div className="hidden md:block md:w-1/2 p-12">
        <img
          src="signin.svg"
          alt="Sign up illustration"
          className="max-h-[550px] object-contain w-full"
        />
      </div>
    </div>
  );
}
