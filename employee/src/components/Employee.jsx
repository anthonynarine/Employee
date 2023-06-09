import React from "react";
import EditEmployee from "./EditEmployee";

function Employee({name, role, img}) {
  return (
    <>
    
      <div className="min-w-[350px] max-w-[350px] m-2 py-8 px-8 max-w-sm bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
          <img
            className="object-cover rounded-full h-[100px] w-[100px] block mx-auto sm:mx-0 sm:shrink-0"
            src={img}
          alt="Woman's Face"
          />
          <div className="text-center space-y-3 sm:text-left">
            <div className="space-y-0.5">
              <p className="text-lg text-black font-semibold">{name}</p>
              <p className="text-slate-500 font-medium">{role}</p>
            </div>

            <EditEmployee name={name} role={role} />

          </div>
      </div>

    </>
  );
}

export default Employee;
