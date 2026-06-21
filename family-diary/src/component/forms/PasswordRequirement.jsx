const Requirement = ({ met, text }) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-4 h-4 rounded-full ${
        met ? "bg-green-500" : "bg-gray-300"
      }`}
    />
    <span
      className={
        met
          ? "text-green-600"
          : "text-gray-500"
      }
    >
      {text}
    </span>
  </div>
);

export default Requirement;