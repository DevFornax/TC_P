export const InfoItem = ({ label, value }) => (
  <div className="flex  gap-2">
    <span className="text-gray-500 font-medium">{label}:</span>
    <span className="text-gray-800 text-right">{value ?? "—"}</span>
  </div>
);
