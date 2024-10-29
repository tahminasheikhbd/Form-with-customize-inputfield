/** @format */
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidPhoneNumber } from "libphonenumber-js";
const strongPasswordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

const users = [
  {
    email: "tahmina@gmail.com",
    name: "tahmina",
  },
];

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Inavalid email address")
      .refine(async (value) => {
        const user = users.find((u) => u.email === value);
        if (user && user.email) {
          return false;
        } else {
          return true;
        }
      }, "Email already used"),

    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),

    password: z
      .string()
      .min(1, "Password is required.")
      .regex(strongPasswordRegex, "Enter a strong password"),
    confirmPassword: z.string().min(1, "Confirm your password."),

    streetAddress: z.string().min(1, "Street Address is required"),
    streetAddress2: z.string().min(1, "Street Address 2 is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State name is required"),
    postal: z.string().min(1, "Poastal code is required"),
    country: z.string().min(1, "Country name is required"),
    areaCode: z.string().min(1, "Area code is required"),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .refine(
        (value) => isValidPhoneNumber(value, "BD"),
        "Please provide a valid phone number"
      ),
    telephoneNumber: z
      .string()
      .min(1, "Telephone number is required")
      .refine(
        (value) => isValidPhoneNumber(value, "BD"),
        "Please provide a valid telephone number"
      ),
    day: z.string().min(1, "Day  is required"),
    month: z.string().min(1, "Month is required"),
    year: z.string().min(1, "Year  is required"),
    height: z.string().min(1, "Height  is required"),
    weight: z.string().min(1, "Weight is required"),
    opinions: z.string().min(1, "Your opinion  is required"),
    drinks: z.array(z.string()),
    gender: z.enum(["male", "female"]),
    selectDay: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

const FormNumber1 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const onSubmit = (value) => {
    console.log({ value });
  };

  // console.log({ errors });

  return (
    <div className='flex  justify-center min-h-screen  items-center py-10 bg-black'>
      <div className='bg-slate-50  rounded-md border border-slate-600 flex flex-col gap-6'>
        <div>
          <h1 className='text-3xl font-bold p-10  '>
            Wellness Evaluation Form
          </h1>
          <span className='block w-full h-[1px] bg-black mb-[30px] '></span>
        </div>
        <form
          action=''
          className='px-10 space-y-6'
          onSubmit={handleSubmit(onSubmit)}>
          {/* <div className='flex items-center  border-2 border-black bg-purple-200'>
            <label
              htmlFor=''
              className='font-semibold w-[180px] bg-gradient-to-r from-violet-500  via-fuchsia-50  to-violet-500 p-[10px] text-xl '>
              E-mail
            </label>
            <input
              type='text'
              className='w-full p-[6px] rounded-tr-md mr-5 rounded-br-md outline-none placeholder:text-sm'
              placeholder='Type your email'
            />
          </div> */}
          <InputFeild
            type='text'
            label='E-mail'
            placeholder='Type your email address '
            htmlFor='email'
            register={register}
            name='email'
            errors={errors}
          />
          {/* password */}
          <div className='flex items-start '>
            <label
              htmlFor=''
              className='font-semibold w-[180px] bg-gradient-to-r from-violet-500  via-fuchsia-50  to-violet-500 p-[10px] text-xl border-2 border-purple-500 rounded-tl-md rounded-bl-md'>
              Password
            </label>
            <div className='w-full bg-purple-300 border-2 border-purple-500 p-[10px] rounded-br-md rounded-bl-md rounded-tr-md grid grid-cols-2 gap-4'>
              <InputFeild3
                type='text'
                placeholder='Password '
                htmlFor='password'
                register={register}
                name='password'
                errors={errors}
              />
              <InputFeild3
                type='text'
                placeholder='Confirm password'
                htmlFor='confirmPassword'
                register={register}
                name='confirmPassword'
                errors={errors}
              />
            </div>
          </div>
          {/* fullname */}
          <div className='flex items-start '>
            <label
              htmlFor=''
              className='font-semibold w-[180px] bg-gradient-to-r from-violet-500  via-fuchsia-50  to-violet-500 p-[10px] text-xl border-2 border-purple-500 rounded-tl-md rounded-bl-md'>
              Full Name
            </label>
            <div className='w-full bg-purple-300 border-2 border-purple-500 p-[10px] rounded-br-md rounded-bl-md rounded-tr-md grid grid-cols-2 gap-4'>
              <InputFeild3
                type='text'
                placeholder='First name '
                htmlFor='first name'
                register={register}
                name='firstname'
                errors={errors}
              />
              <InputFeild3
                type='text'
                placeholder='Last name'
                htmlFor='last name'
                register={register}
                name='lastname'
                errors={errors}
              />
            </div>
          </div>
          {/* gender */}
          <div className='flex items-start '>
            <label
              htmlFor=''
              className='font-semibold w-[180px] bg-gradient-to-r from-violet-500  via-fuchsia-50  to-violet-500 p-[10px] text-xl border-2 border-purple-500 rounded-tl-md rounded-bl-md'>
              Gender
            </label>
            <div className='w-full bg-purple-300 border-2 border-purple-500 p-[10px] rounded-br-md rounded-bl-md rounded-tr-md grid grid-cols-2   gap-3'>
              <RadioFeild
                type='radio'
                htmlFor='male'
                register={register}
                name='gender'
                errors={errors}
                label='Male'
                value='male'
              />
              <RadioFeild
                type='radio'
                htmlFor='female'
                register={register}
                name='gender'
                errors={errors}
                label='Female'
                value='female'
              />
            </div>
          </div>
          {/* select-day-to-take service */}
          <div className='flex items-start '>
            <label
              htmlFor=''
              className='font-semibold w-[180px] bg-gradient-to-r from-violet-500  via-fuchsia-50  to-violet-500 p-[10px] text-xl border-2 border-purple-500 rounded-tl-md rounded-bl-md'>
              Select Day
            </label>
            <div className='w-full bg-purple-300 border-2 border-purple-500 p-[10px] rounded-br-md rounded-bl-md rounded-tr-md grid grid-cols-2  md:grid-cols-4 gap-3'>
              <RadioFeild
                type='radio'
                htmlFor='Sunday'
                register={register}
                name='selectDay'
                value='Sunday'
                errors={errors}
                label='Sunday'
              />
              <RadioFeild
                type='radio'
                htmlFor='Monday'
                register={register}
                name='selectDay'
                value='Monday'
                errors={errors}
                label='Monday'
              />
              <RadioFeild
                type='radio'
                htmlFor='Tuesday'
                register={register}
                name='selectDay'
                value='Tuesday'
                errors={errors}
                label='Tuesday'
              />
              <RadioFeild
                type='radio'
                htmlFor='Thusday'
                register={register}
                name='selectDay'
                value='Thusday'
                errors={errors}
                label='Thusday'
              />
            </div>
          </div>
          {/* select-drinks */}
          <div className='flex items-start '>
            <label
              htmlFor=''
              className='font-semibold w-[180px] bg-gradient-to-r from-violet-500  via-fuchsia-50  to-violet-500 p-[10px] text-xl border-2 border-purple-500 rounded-tl-md rounded-bl-md'>
              Welcome Drinks
            </label>
            <div className='w-full bg-purple-300 border-2 border-purple-500 p-[10px] rounded-br-md rounded-bl-md rounded-tr-md grid grid-cols-2  md:grid-cols-2 gap-3'>
              <CheckBoxFeild
                type='checkbox'
                htmlFor='Apple juice'
                register={register}
                name='drinks'
                value='Apple juice'
                errors={errors}
                label='Apple juice'
              />
              <CheckBoxFeild
                type='checkbox'
                htmlFor='Cranberry juice'
                register={register}
                errors={errors}
                label='Cranberry juice'
                name='drinks'
                value='Cranberry juice'
              />
              <CheckBoxFeild
                type='checkbox'
                htmlFor='Coconut water'
                register={register}
                errors={errors}
                label='Coconut water'
                name='drinks'
                value='Coconut water'
              />
              <CheckBoxFeild
                type='checkbox'
                htmlFor='Carrot juice'
                register={register}
                errors={errors}
                label='Carrot juice'
                name='drinks'
                value='Carrot juice'
              />
              <CheckBoxFeild
                type='checkbox'
                htmlFor='Pomegranate juice'
                register={register}
                errors={errors}
                label='Pomegranate juice'
                name='drinks'
                value='Pomegranate juice'
              />
              <CheckBoxFeild
                type='checkbox'
                htmlFor='Gooseberry juice'
                register={register}
                errors={errors}
                label='Gooseberry juice'
                name='drinks'
                value='Gooseberry juice'
              />
            </div>
          </div>
          {/* <InputFeild2
            type='text'
            label='Full name'
            placeholder='Type your name '
            htmlFor='name'
            register={register}
            name='name'
          /> */}

          {/* address */}
          <div className='flex items-start '>
            <label
              htmlFor=''
              className='font-semibold w-[180px] bg-gradient-to-r from-violet-500  via-fuchsia-50  to-violet-500 p-[10px] text-xl border-2 border-purple-500 rounded-tl-md rounded-bl-md'>
              Address
            </label>
            <div className='w-full bg-purple-300 border-2 border-purple-500 p-[10px] rounded-br-md rounded-bl-md rounded-tr-md grid grid-cols-2 gap-4'>
              <div className='grid col-span-2'>
                <InputFeild3
                  type='text'
                  placeholder='Street Address '
                  htmlFor='Street Address '
                  register={register}
                  name='streetAddress'
                  errors={errors}
                />
              </div>
              <div className='grid col-span-2'>
                <InputFeild3
                  type='text'
                  placeholder='Street Address Line 2'
                  htmlFor='Street Address Line 2'
                  register={register}
                  name='streetAddress2'
                  errors={errors}
                />
              </div>

              <InputFeild3
                type='text'
                placeholder='City'
                htmlFor='City'
                register={register}
                name='city'
                errors={errors}
              />
              <InputFeild3
                type='text'
                placeholder='State/Province'
                htmlFor='state'
                register={register}
                name='state'
                errors={errors}
              />
              <InputFeild3
                type='text'
                placeholder='Postal/Zip Code'
                htmlFor='Postal'
                register={register}
                name='postal'
                errors={errors}
              />

              <InputFeild3
                type='text'
                placeholder='Country'
                htmlFor='country'
                register={register}
                name='country'
                errors={errors}
              />
            </div>
          </div>
          {/* Phone-number */}
          <div className='flex items-start '>
            <label
              htmlFor=''
              className='font-semibold w-[180px] bg-gradient-to-r from-violet-500  via-fuchsia-50  to-violet-500 p-[10px] text-xl border-2 border-purple-500 rounded-tl-md rounded-bl-md'>
              Number
            </label>
            <div className='w-full bg-purple-300 border-2 border-purple-500 p-[10px] rounded-br-md rounded-bl-md rounded-tr-md grid grid-cols-2 gap-4'>
              <InputFeild3
                type='text'
                placeholder='Area code '
                htmlFor='areaCode'
                register={register}
                name='areaCode'
                errors={errors}
              />
              <InputFeild3
                type='text'
                placeholder='Phone Number'
                htmlFor='Phone number'
                register={register}
                name='phoneNumber'
                errors={errors}
              />
            </div>
          </div>
          {/* contact way */}
          <div className='flex items-start '>
            <label
              htmlFor=''
              className='font-semibold w-[180px] bg-gradient-to-r from-violet-500  via-fuchsia-50  to-violet-500 p-[10px] text-xl border-2 border-purple-500 rounded-tl-md rounded-bl-md whitespace-nowrap'>
              Contact way
            </label>
            <div className='w-full bg-purple-300 border-2 border-purple-500 p-[10px] rounded-br-md rounded-bl-md rounded-tr-md '>
              <InputFeild3
                type='text'
                placeholder='Telephone number'
                htmlFor='Telephone number'
                register={register}
                name='telephoneNumber'
                errors={errors}
              />
            </div>
          </div>
          {/* birth date */}
          <div className='flex items-start '>
            <label
              htmlFor=''
              className='font-semibold w-[180px] bg-gradient-to-r from-violet-500  via-fuchsia-50  to-violet-500 p-[10px] text-xl border-2 border-purple-500 rounded-tl-md rounded-bl-md whitespace-nowrap'>
              Birth date
            </label>
            <div className='w-full bg-purple-300 border-2 border-purple-500 p-[10px] rounded-br-md rounded-bl-md rounded-tr-md grid grid-cols-3 gap-4'>
              <InputFeild3
                type='number'
                placeholder='Day'
                htmlFor='day'
                register={register}
                name='day'
                errors={errors}
              />
              <InputFeild3
                type='number'
                placeholder='Month'
                htmlFor='month'
                register={register}
                name='month'
                errors={errors}
              />

              <InputFeild3
                type='text'
                placeholder='Year'
                htmlFor='year'
                register={register}
                name='year'
                errors={errors}
              />
            </div>
          </div>
          {/* height */}
          <div className='flex items-start '>
            <label
              htmlFor=''
              className='font-semibold w-[180px] bg-gradient-to-r from-violet-500  via-fuchsia-50  to-violet-500 p-[10px] text-xl border-2 border-purple-500 rounded-tl-md rounded-bl-md'>
              Height (cms)
            </label>
            <div className='w-full bg-purple-300 border-2 border-purple-500 p-[10px] rounded-br-md rounded-bl-md rounded-tr-md '>
              <InputFeild3
                type='number'
                placeholder='Height '
                htmlFor='height'
                register={register}
                name='height'
                errors={errors}
              />
            </div>
          </div>
          {/* weight */}
          <div className='flex items-start '>
            <label
              htmlFor=''
              className='font-semibold w-[180px] bg-gradient-to-r from-violet-500  via-fuchsia-50  to-violet-500 p-[10px] text-xl border-2 border-purple-500 rounded-tl-md rounded-bl-md'>
              Weight (kgs)
            </label>
            <div className='w-full bg-purple-300 border-2 border-purple-500 p-[10px] rounded-br-md rounded-bl-md rounded-tr-md '>
              <InputFeild3
                type='number'
                placeholder='Weight'
                htmlFor='weight'
                register={register}
                name='weight'
                errors={errors}
              />
            </div>
          </div>
          {/* opinions */}
          <InputFeild4
            type='text'
            label='Your Opinions'
            placeholder='Share your opinions.. '
            htmlFor='password'
            register={register}
            name='opinions'
            errors={errors}
          />

          <button
            type='submit'
            className='font-semibold w-full bg-gradient-to-r !mb-10 from-violet-500  via-fuchsia-50  to-violet-500 p-[10px] text-xl border-2 border-purple-500 rounded-md '>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormNumber1;

const InputFeild = ({
  label,
  type,
  placeholder,
  htmlFor,
  register,
  name,
  errors,
}) => {
  return (
    <div>
      <div className='flex items-start '>
        <label
          htmlFor={htmlFor}
          className='font-semibold w-[180px] bg-gradient-to-r from-violet-500  via-fuchsia-50  to-violet-500 p-[10px] text-xl border-2 border-purple-500 rounded-tl-md rounded-bl-md'>
          {label}
        </label>
        <div className='w-full bg-purple-300 border-2 space-y-1 border-purple-500 p-[10px] rounded-br-md rounded-bl-md rounded-tr-md'>
          <input
            type={type}
            id={htmlFor}
            className='w-full  rounded-md outline-none placeholder:text-sm h-[50px] pl-[4px]'
            placeholder={placeholder}
            {...register(name)}
          />
          {errors?.[name] && (
            <p className='text-red-600 text-sm font-medium'>
              {errors?.[name]?.message}{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// const InputFeild2 = ({ label, type, placeholder, htmlFor, register, name }) => {
//   return (
//     <div>
//       <div className='flex items-start '>
//         <label
//           htmlFor={htmlFor}
//           className='font-semibold w-[180px] bg-gradient-to-r from-violet-500  via-fuchsia-50  to-violet-500 p-[10px] text-xl border-2 border-purple-500 rounded-tl-md rounded-bl-md'>
//           {label}
//         </label>
//         <div className='w-full bg-purple-300 border-2 border-purple-500 p-[10px] rounded-br-md rounded-bl-md rounded-tr-md grid grid-cols-2 gap-2'>
//           <div className='space-y-1'>
//             <input
//               type={type}
//               id={htmlFor}
//               className='w-full  rounded-md outline-none placeholder:text-sm h-[50px] pl-[4px]'
//               {...register(name)}
//             />
//             <p className='text-sm text-zinc-600 font-medium'>{placeholder}</p>
//           </div>
//           <div className='space-y-1'>
//             <input
//               type={type}
//               id={htmlFor}
//               className='w-full  rounded-md outline-none placeholder:text-sm h-[50px] pl-[4px]'
//               {...register(name)}
//             />
//             <p>{placeholder}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const InputFeild3 = ({
  type,
  placeholder,
  htmlFor,
  register,
  name,
  className,
  errors,
}) => {
  return (
    <div>
      <div className='space-y-1'>
        <input
          type={type}
          id={htmlFor}
          className='w-full  rounded-md outline-none placeholder:text-sm h-[50px] pl-[4px]'
          {...register(name)}
        />
        {errors?.[name] && (
          <p className='text-red-600 text-sm font-medium'>
            {errors?.[name]?.message}{" "}
          </p>
        )}
        <label htmlFor={htmlFor} className='text-sm text-zinc-600 font-medium'>
          {placeholder}
        </label>
      </div>
    </div>
  );
};
const InputFeild4 = ({
  label,
  type,
  placeholder,
  htmlFor,
  register,
  name,
  errors,
}) => {
  return (
    <div>
      <div className='flex items-start '>
        <label
          htmlFor={htmlFor}
          className='font-semibold w-[180px] bg-gradient-to-r from-violet-500  via-fuchsia-50  to-violet-500 p-[10px] text-xl border-2 border-purple-500 rounded-tl-md rounded-bl-md'>
          {label}
        </label>
        <div className='w-full bg-purple-300 border-2 border-purple-500 p-[10px] rounded-br-md rounded-bl-md rounded-tr-md'>
          <textarea
            type={type}
            id={htmlFor}
            className='w-full  rounded-md outline-none placeholder:text-sm  p-[10px] h-[100px]'
            placeholder={placeholder}
            {...register(name)}></textarea>
          {errors?.[name] && (
            <p className='text-red-600 text-sm font-medium'>
              {errors?.[name]?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
const RadioFeild = ({
  type,
  value,
  htmlFor,
  register,
  name,

  label,
}) => {
  return (
    <div className='p-[5px]'>
      <div className='flex items-center gap-2 w-full bg-white p-[5px] rounded-md pl-[10px]'>
        <input
          value={value}
          type={type}
          id={htmlFor}
          className=' rounded-md outline-none bg-white h-[40px]'
          {...register(name)}
        />

        <label htmlFor={htmlFor} className='text-zinc-600  '>
          {label}
        </label>
      </div>
    </div>
  );
};

const CheckBoxFeild = ({
  type,

  htmlFor,
  register,
  name,
  value,
  label,
}) => {
  return (
    <div className='p-[5px]'>
      <div className='flex items-center gap-2 w-full bg-white p-[5px] rounded-md pl-[10px]'>
        <input
          type={type}
          id={htmlFor}
          value={value}
          className=' rounded-md outline-none bg-white h-[40px]'
          {...register(name)}
        />

        <label htmlFor={htmlFor} className='text-zinc-600  '>
          {label}
        </label>
      </div>
    </div>
  );
};
