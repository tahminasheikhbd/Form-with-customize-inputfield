/** @format */
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaCheck } from "react-icons/fa";
const checkSchema = z.object({
  checkbox: z.array(z.string()),
});

const CheckboxCustomize = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkSchema),
  });
  const onSubmit = (values) => {
    console.log(values);
  };
  console.log({ errors });
  return (
    <div className='flex items-center justify-center min-h-screen bg-blue-400'>
      <form
        className='p-10 bg-white flex flex-col gap-10 items-center'
        onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-3'>
          <CheckboxFeild
            register={register}
            htmlFor='development'
            value='WEB'
            label='Web Development'
            watch={watch}
          />
          <CheckboxFeild
            register={register}
            htmlFor='videography'
            value='VIDEO'
            label='Video Graphy'
            watch={watch}
          />
        </div>

        <button className='bg-pink-300 border border-red-500 p-[3px] rounded-md'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CheckboxCustomize;
const CheckboxFeild = ({ label, register, htmlFor, name, value, watch }) => {
  return (
    <div className='flex gap-2 items-center'>
      <input
        type='checkbox'
        {...register("checkbox")}
        id={htmlFor}
        value={value}
        hidden
      />
      <label
        htmlFor=''
        className='size-5 border-2 border-teal-500 rounded-md grid place-items-center'>
        {watch("checkbox")?.includes(value) && (
          <FaCheck className='text-xs text-teal-500' />
        )}
      </label>
      <label htmlFor={htmlFor}>{label} </label>
    </div>
  );
};
