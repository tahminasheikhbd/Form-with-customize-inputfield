/** @format */

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const ModelPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className='min-h-screen bg-slate-200 '>
      <div className='h-screen  grid place-items-center '>
        <button onClick={() => setIsOpen((crr) => !crr)}>show-1</button>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className='bg-white p-[8px]'>hello</div>
        </Modal>
        <button onClick={() => setIsVisible((crr) => !crr)}>show-2</button>
        <Modal isOpen={isVisible} setIsOpen={setIsVisible}>
          <div className='w-96 h-56  bg-white border-2 border-red-400 rounded-md'></div>
        </Modal>
      </div>
    </div>
  );
};

export default ModelPopup;

const Modal = ({ isOpen, setIsOpen, children }) => {
  const ref = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 bg-black/30 grid place-items-center '>
          <button
            className='fixed top-2 right-2 grid place-items-center p-[10px] rounded-full bg-slate-200 hover:bg-slate-400
          '
            onClick={() => setIsOpen(false)}>
            <RxCross2 />
          </button>
          <div ref={ref} className='border-2 border-red-600'>
            {" "}
            {children}
          </div>
        </div>
      )}
    </>
  );
};
