/** @format */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
const selectSchema = z.object({
  select: z.string(),
});
const onSubmit = (value) => {
  console.log({ value });
};

const CustomizeSelectField = () => {
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(selectSchema),
  });
  console.log({ errors });
  console.log({ country: watch("select") });
  return (
    <div className='flex items-center justify-center min-h-screen bg-teal-400'>
      <form
        className='bg-white p-10 flex flex-col gap-10 items-center  min-h-[300px] relative'
        onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-1 h-full'>
          <SelectFeild
            name='select'
            control={control}
            label='Country'
            options={[
              { value: "bd", label: "Bangladesh" },
              { value: "in", label: "India" },
              { value: "pk", label: "Pakistani" },
            ]}
          />
        </div>
        <div className='h-[100px]'></div>
        <button className='bg-blue-700 text-white font-semibold p-[5px] rounded-md  '>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomizeSelectField;

const SelectFeild = ({ name, control, options, label, placeholder }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <div>
            <div className='relative w-56'>
              <button
                type='button'
                className={`px-[12px] py-[8px] border border-zinc-500  text-start w-full `}
                onClick={() => setIsVisible((crr) => !crr)}>
                {field.value
                  ? options.find((opt) => opt.value == field.value)?.label
                  : placeholder || `Select ${label}`}
              </button>
              {isVisible && (
                <ul className='absolute mt-2 bg-pink-200 w-full top-full left-0 right-0 p-[8px] border border-zinc-300 rounded-md z-10'>
                  {options.map((opt, idx) => (
                    <li
                      key={`select-${idx}`}
                      className='px-[12px] py-[8px] cursor-pointer hover:bg-zinc-200 border-b border-b-zinc-400'
                      onClick={() => {
                        field.onChange(opt.value);
                        setIsVisible(false);
                      }}>
                      {opt.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      }}
    />
  );
};
