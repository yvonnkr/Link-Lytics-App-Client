import { twMerge } from "tailwind-merge";

const EMAIL_REGEX = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/;

const URL_REGEX =
  /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/\S*)?$/;

const validateInput = (type) => {
  return type === "email"
    ? {
        value: EMAIL_REGEX,
        message: "Invalid email",
      }
    : type === "url"
      ? {
          value: URL_REGEX,
          message: "Please enter a valid url",
        }
      : null;
};

const TextField = ({
  label,
  id,
  type,
  errors,
  register,
  required,
  message,
  className,
  min,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className={twMerge("font-semibold text-md", className)}
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={twMerge(
          "px-2 py-2 border outline-none bg-transparent  text-slate-700 rounded-md border-slate-600",
          errors[id]?.message && "border-red-500"
        )}
        {...register(id, {
          required: { value: required, message },
          minLength: min
            ? { value: min, message: `Minimum ${min} character is required` }
            : null,

          pattern: validateInput(type),
        })}
      />

      {errors[id]?.message && (
        <p className="text-sm font-semibold text-red-600 mt-0">
          {errors[id]?.message}*
        </p>
      )}
    </div>
  );
};

export default TextField;
