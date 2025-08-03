import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/userAuth/userAuthThunk";
import { useEffect } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.userAuth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      toast.info("You are already logged in.");
      navigate("/");
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      toast.success(`Welcome, ${result.name || "User"}!`);
      reset();
      navigate("/");
    } catch (err) {
      toast.error(err || "Login failed. Please try again.");
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="text-4xl font-semibold text-bilbao-800 mb-6">Login</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0"
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-md font-bold text-bilbao-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="youremail.com"
                className={`border rounded-lg block w-full p-2.5 text-gray-900 focus:outline-0 focus:border-bilbao-700 transition-colors duration-300 ${
                  errors.email ? "border-red-500 focus:border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-md font-bold text-bilbao-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                placeholder="••••••••"
                className={`border rounded-lg block w-full p-2.5 text-gray-900 focus:outline-0 focus:border-bilbao-700 transition-colors duration-300 ${
                  errors.password ? "border-red-500 focus:border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-bilbao-900">
                <input
                  type="checkbox"
                  className="mr-2 accent-bilbao-700"
                  defaultChecked
                />
                Remember me
              </label>
              <a href="#" className="text-sm text-bilbao-900 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn w-full mb-3.5 bg-bilbao-700 text-white hover:bg-bilbao-900 focus:ring-4 focus:outline-none focus:ring-bilbao-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Login"
              )}
            </button>
            <p className="text-sm font-light pt-3 text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                className="text-base font-medium text-bilbao-900 hover:underline"
                to="/register"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
