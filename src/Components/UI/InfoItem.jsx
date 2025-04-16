// export const InfoItem = ({ label, value }) => (
//   <div className="flex gap-2">
//     <span className="text-[#385e72] font-semibold">{label}:</span>
//     <span className="text-[#6aabd2]">{value ?? "—"}</span>
//   </div>
// );

export const InfoItem = ({ label, value }) => (
  <div className="flex gap-2">
    <span className="text-[#385e72] font-semibold">{label}:</span>
    <span className="text-[#6aabd2]">{value ?? "—"}</span>
  </div>
);
