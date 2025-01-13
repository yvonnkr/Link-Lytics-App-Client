import "react";
import TextField from "../components/TextField.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../api/api.js";
import { toastError, toastSuccess } from "../utils/common.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const formDefaultValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: formDefaultValues, mode: "onTouched" });

  const loginHandler = async (data) => {
    setLoader(true);

    try {
      const { data: response } = await api.post("/api/auth/public/login", data);
      localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token));
      toastSuccess("Login successful");
      reset();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toastError("Login failed! - username or password is incorrect.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="sm:w-[450px] w-[360px]  shadow-custom py-8 sm:px-8 px-4 rounded-md"
      >
        <h1 className="text-center font-serif text-btnColor font-bold lg:text-3xl text-2xl">
          Login
        </h1>

        <hr className="mt-2 mb-5 text-black" />

        <div className="flex flex-col gap-3">
          <TextField
            label="Email"
            required
            id="email"
            type="email"
            message="*Email is required"
            placeholder="Type your email"
            register={register}
            errors={errors}
          />

          <TextField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="Type your password"
            register={register}
            errors={errors}
            validate={false}
          />
        </div>

        <button
          disabled={loader}
          type="submit"
          className="bg-customRed font-semibold text-white  bg-custom-gradient w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
        >
          {loader ? "Loading..." : "Login"}
        </button>

        <p className="text-center text-sm text-slate-700 mt-6">
          Don&#39;t have an account?
          <Link className="font-semibold " to="/register">
            <span className="text-btnColor hover:text-black"> Sign up </span>
          </Link>
        </p>
      </form>
    </div>
  );
};
export default LoginPage;
