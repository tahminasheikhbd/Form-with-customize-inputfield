/** @format */
import { isValidPhoneNumber } from "libphonenumber-js";
import { HiCheck } from "react-icons/hi";
import React, { useState } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FaCheck, FaCircle } from "react-icons/fa";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

const users = [
  {
    email: "tahmina@gmail.com",
    name: "tahmina",
  },
];
const formSchema = z.object({
  Petname: z.string({ required_error: "Name is required" }),
  firstName: z
    .string({ required_error: "Tahmina name is required" })
    .optional(),
  lastName: z.string(),

  CofirstName: z
    .string({ required_error: "First name is required" })
    .min(3, " First name is required"),
  ColastName: z
    .string({ required_error: "Last name is required" })
    .min(3, " Last name is required"),
  streetAddress: z
    .string({ required_error: "Street address is required" })
    .min(3, " Street address is required"),
  city: z
    .string({ required_error: "City name is required" })
    .min(3, " City name is required"),
  state: z
    .string({ required_error: "State name is required" })
    .min(3, " State name is required"),
  postal: z
    .string({ required_error: "Postal  is required" })
    .min(3, " Postal  is required"),
  email: z
    .string({ required_error: "*" })
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
  Coemail: z
    .string({ required_error: "Email is required" })
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
  mobile: z
    .string({ required_error: "Phone number is required" })
    .min(1, "Phone number is required")
    .refine(
      (value) => isValidPhoneNumber(value, "BD"),
      "Please provide a valid phone number"
    ),
  Pet: z.string(),
  gender: z.string(),
  food: z.array(z.string()),
  country: z.string(),
  textarea: z.string(),
});

const FormNumber2 = () => {
  const {
    watch,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });
  const onSubmit = (values) => {
    console.log(values);
  };
  console.log({ errors });
  console.log({ country: watch("country") });

  return (
    <div className='flex items-center justify-center min-h-screen bg-black py-10 '>
      <div className='bg-teal-100   rounded-md border border-teal-600 flex flex-col gap-6 px-12 py-8 max-w-[1000px] w-full '>
        <div>
          <h1 className='text-teal-600 font-medium  text-3xl mb-3'>
            Pet Adoption Application Form
          </h1>
          <span className='block w-full mx-auto max-w-[110%]  border border-teal-600 border-double'></span>
        </div>
        <form
          action=''
          className=' space-y-8'
          onSubmit={handleSubmit(onSubmit)}>
          {/* petname-start */}
          <InputFeild1
            name='Petname'
            control={control}
            label=' Name of the pet you want to adopt'
            htmlFor='petName'
          />

          {/* petname-end */}
          {/* adoptor name-start */}
          <div className='space-y-1'>
            <div className='flex gap-2'>
              <p className='text-teal-600 text-lg font-medium'>
                Adaptor's Name
              </p>
              <p className='text-[red] font-bold text-xl'>*</p>
            </div>

            <div className='grid gap-2 grid-cols-2'>
              <InputFeild2
                name='firstName'
                control={control}
                type='text'
                placeholder='First name'
              />
              <InputFeild2
                name='lastName'
                control={control}
                type='text'
                placeholder='Last name'
              />
            </div>
          </div>
          {/* adoptor name-start */}
          {/* co-adoptor's-name start */}
          <div className='space-y-1'>
            <div className='flex gap-2'>
              <p className='text-teal-600 text-lg font-medium'>
                Co-Adaptor's Name
              </p>
              <p className='text-[red] font-bold text-xl'>*</p>
            </div>

            <div className='grid gap-2 grid-cols-2'>
              <InputFeild2
                name='CofirstName'
                control={control}
                type='text'
                placeholder='First name'
              />
              <InputFeild2
                name='ColastName'
                control={control}
                type='text'
                placeholder='Last name'
              />
            </div>
          </div>
          {/* co-adoptor's-name end */}
          {/* address-start */}
          <div className='space-y-2'>
            <div className='flex gap-2'>
              <p className='text-teal-600 text-lg font-medium'>Address</p>
              <p className='text-[red] font-bold text-xl'>*</p>
            </div>
            <InputFeild2
              name='streetAddress'
              control={control}
              type='text'
              placeholder='Street address'
            />
            <div className='grid gap-2 grid-cols-3'>
              <InputFeild2
                name='city'
                control={control}
                type='text'
                placeholder='City'
              />
              <InputFeild2
                name='state'
                control={control}
                type='text'
                placeholder='State'
              />
              <InputFeild2
                name='postal'
                control={control}
                type='text'
                placeholder='Postal/Zip Code'
              />
            </div>
          </div>
          {/* address-end*/}
          {/* gender-start */}
          <SelectField
            name='gender'
            control={control}
            placeholder='Gender'
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
          />
          {/* gender-end */}
          {/* adoptor's-email-start */}
          <InputFeild1
            name='email'
            control={control}
            label="Adoptor's E-mail"
            htmlFor='email'
            placeholder='Enter your email'
          />
          {/*  adoptor's-email-end */}
          {/* Co-adoptor's-email-start */}
          <InputFeild1
            name='Coemail'
            control={control}
            label="Co-Adoptor's E-mail"
            htmlFor='email'
            placeholder='Enter your email'
          />
          {/* Co-adoptor's-email-end */}
          {/* Phone-number-start */}
          <InputFeild1
            name='mobile'
            control={control}
            label='Phone Number'
            htmlFor='mobile'
            placeholder='Enter your phone number'
            required
          />
          {/* Phone-number-end */}

          {/* Radio-start */}
          <div className='space-y-1'>
            <div className='flex gap-2'>
              <p className='text-teal-600 text-lg font-medium'>Select Pet</p>
              <p className='text-[red] font-bold text-xl'>*</p>
            </div>
            <div className='grid grid-cols-4 gap-2'>
              <RadioFeild
                name='Pet'
                value='Dog'
                control={control}
                label='Dog'
                type='radio'
                htmlFor='dog'
                watch={watch}
              />
              <RadioFeild
                name='Pet'
                value='Cat'
                control={control}
                label='Cat'
                type='radio'
                htmlFor='cat'
                watch={watch}
              />
              <RadioFeild
                name='Pet'
                value='Bird'
                control={control}
                label='Bird'
                type='radio'
                htmlFor='bird'
                watch={watch}
              />

              <RadioFeild
                name='Pet'
                value='Rabbit'
                control={control}
                label='Rabbit'
                type='radio'
                htmlFor='rabbit'
                watch={watch}
              />
            </div>
          </div>

          {/* Radio-end */}

          {/* checkbox-start */}
          <div className='space-y-1'>
            <div className='flex gap-2'>
              <p className='text-teal-600 text-lg font-medium'>Select food</p>
              <p className='text-[red] font-bold text-xl'>*</p>
            </div>
            <div className='flex flex-col gap-3 mt-4 bg-white p-5 rounded-md border border-teal-600'>
              <CheckboxFeild
                name='food'
                value='rice'
                watch={watch}
                label='Rice'
                type='checkbox'
                htmlFor='rice'
                register={register}
              />
              <CheckboxFeild
                name='food'
                value='grass'
                watch={watch}
                label='Grass'
                type='checkbox'
                htmlFor='grass'
                register={register}
              />
              <CheckboxFeild
                name='food'
                value='milk'
                watch={watch}
                label='Milk'
                type='checkbox'
                htmlFor='milk'
                register={register}
              />
              <CheckboxFeild
                name='food'
                value='banana'
                watch={watch}
                label='Banana'
                type='checkbox'
                htmlFor='banana'
                register={register}
              />
            </div>
          </div>
          {/* checkbox-end */}

          {/* select-start */}
          <SelectField
            name='country'
            control={control}
            placeholder='Choose Country'
            options={[
              { value: "BD", label: "Bangladesh" },
              { value: "IN", label: "India" },
              { value: "PK", label: "Pakistan" },
            ]}
          />
          {/* select-end */}
          {/* text-area-start */}
          <TextArea
            name='textarea'
            control={control}
            label='Share Your Opinions'
            htmlFor='Textarea'
            placeholder='Type your opinion'
          />
          {/* text-area-end */}

          <button className='bg-white w-full p-[4px] border-2 rounded-md border-teal-600 text-teal-600 cursor-progress font-medium h-[55px]'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormNumber2;

const InputFeild1 = ({
  name,
  label,
  type = "text",
  placeholder,
  htmlFor,
  control,
  required = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className='space-y-1'>
            <div className='flex gap-2 items-center'>
              <label
                htmlFor={htmlFor}
                className='text-teal-600 text-lg font-medium'>
                {label}
              </label>
              {required && <p className='font-bold text-2xl text-[red]'>*</p>}
            </div>
            <div className='space-y-1'>
              <input
                id={htmlFor}
                type={type}
                {...field}
                placeholder={placeholder}
                className={`w-full p-[10px] border-2 border-teal-600 outline-none  rounded-md text-teal-700 placeholder:text-sm h-[55px] placeholder:font-medium ${
                  required && "focus:border-[red]"
                }`}
              />
              {error && <p className='text-[red] text-sm'>{error.message}</p>}
            </div>
          </div>
        );
      }}
    />
  );
};

const InputFeild2 = ({
  name,
  label,
  type,
  placeholder,
  htmlFor,
  control,
  disabled = false,
  required = false,
}) => {
  return (
    <Controller
      name={name}
      disabled={disabled}
      control={control}
      rules={{ required: required }}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className='space-y-1'>
            <input
              id={htmlFor}
              type={type}
              {...field}
              placeholder={placeholder}
              className='w-full p-[7px] border-2 h-[55px] border-teal-600 outline-none  rounded-md text-teal-700  placeholder:text-sm placeholder:font-medium'
            />
            {error && (
              <p className='text-[red] font-medium text-sm'>{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

const RadioFeild = ({
  name,
  label,
  value,
  placeholder,
  htmlFor,
  control,
  type,
  watch,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className='  bg-white p-[8px] rounded-md border-2 border-teal-600'>
            <div className='flex items-center gap-2'>
              <input type={type} id={htmlFor} {...field} value={value} hidden />
              <label
                htmlFor={htmlFor}
                className='size-4 border-2  border-teal-500 rounded-full  grid place-items-center'>
                {watch(name)?.includes(value) && (
                  <FaCircle className='text-teal-500 text-[7px]' />
                )}
              </label>
              <label
                htmlFor={htmlFor}
                className='text-teal-600 text-lg font-medium'>
                {label}
              </label>
            </div>
          </div>
        );
      }}
    />
  );
};
const CheckboxFeild = ({
  name,
  label,
  value,
  watch,
  htmlFor,
  register,

  type,
}) => {
  return (
    <div className='  bg-white p-[8px] rounded-md border-2 border-teal-600'>
      <div className='flex items-center gap-2'>
        <input
          type={type}
          id={htmlFor}
          {...register(name)}
          value={value}
          hidden
        />

        <label
          htmlFor={htmlFor}
          className='size-[18px]  border-2 border-teal-500 rounded-md grid place-items-center'>
          {watch(name)?.includes(value) && (
            <FaCheck className='text-teal-500 text-[10px]' />
          )}
        </label>

        <label htmlFor={htmlFor} className='text-teal-600 text-lg font-medium'>
          {label}
        </label>
      </div>
    </div>
  );
};

const SelectField = ({ name, control, placeholder, options }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        console.log({ field });
        return (
          <div>
            <div className='relative w-full '>
              <button
                type='button'
                className={`border-2 p-[5px] bg-white h-[55px] border-teal-600 rounded-md   font-medium w-full text-start ${
                  field.value ? "text-teal-600" : "text-teal-600/70"
                }`}
                onClick={() => setIsVisible((crr) => !crr)}>
                {field.value
                  ? options.find((opt) => opt.value == field.value)?.label
                  : placeholder}
              </button>

              {isVisible && (
                <ul className='absolute top-full right-0 mt-2 left-0 bg-white p-[10px]  border border-teal-600 rounded-md'>
                  {options.map((opt, idx) => (
                    <li
                      key={`select-${idx}`}
                      className='p-[6px] hover:bg-teal-200 cursor-pointer rounded-md text-teal-700'
                      onClick={() => {
                        field.onChange(opt.value);
                        setIsVisible(false);
                      }}>
                      {opt.label}
                    </li>
                  ))}
                </ul>
              )}
              <span
                className='absolute right-2 top-1/2 -translate-y-1/2 text-xl transition text-teal-600 cursor-pointer'
                onClick={() => setIsVisible((crr) => !crr)}>
                {isVisible ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
              </span>
            </div>
          </div>
        );
      }}
    />
  );
};

const TextArea = ({
  name,
  label,
  type = "text",
  placeholder,
  htmlFor,
  control,
  required = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className='space-y-1'>
            <div className='flex gap-2 items-center'>
              <label
                htmlFor={htmlFor}
                className='text-teal-600 text-lg font-medium'>
                {label}
              </label>
              {required && <p className='font-bold text-2xl text-[red]'>*</p>}
            </div>
            <div className='space-y-1'>
              <textarea
                id={htmlFor}
                type={type}
                {...field}
                placeholder={placeholder}
                className={`w-full p-[10px] border-2 border-teal-600 outline-none  rounded-md text-teal-700 placeholder:text-sm h-[155px] placeholder:font-medium ${
                  required && "focus:border-[red]"
                }`}></textarea>
              {error && <p className='text-[red] text-sm'>{error.message}</p>}
            </div>
          </div>
        );
      }}
    />
  );
};
