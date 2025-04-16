// import { useState } from "react";

// export const SectionWithToggle = ({ title, children }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="  bg-white shadow-sm">
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
//         <button
//           onClick={() => setOpen(!open)}
//           className="text-blue-600 text-sm hover:underline"
//         >
//           {open ? "Hide Details" : "View More Details"}
//         </button>
//       </div>

//       {open && (
//         <div className="mt-2 ">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//             {children}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// import { useState } from "react";

// export const SectionWithToggle = ({ title = "Additional Info", children }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="bg-[#d9e4ec] p-4 rounded-xl shadow-inner border border-[#b7cfdc] space-y-3">
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-bold text-[#385e72]">{title}</h3>
//         <button
//           onClick={() => setOpen(!open)}
//           className="text-[#6aabd2] text-sm font-medium hover:underline transition"
//         >
//           {open ? "Hide Details" : "View More Details"}
//         </button>
//       </div>

//       {open && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-2 text-[#385e72]">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

import { useState } from "react";

export const SectionWithToggle = ({ title = "Additional Info", children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#d9e4ec] p-4 rounded-xl shadow-inner border border-[#b7cfdc] space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#385e72]">{title}</h3>
        <button
          onClick={() => setOpen(!open)}
          className="text-[#6aabd2] text-sm font-medium hover:underline transition"
        >
          {open ? "Hide Details" : "View More Details"}
        </button>
      </div>

      {open && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-2 text-[#385e72]">
          {children}
        </div>
      )}
    </div>
  );
};
