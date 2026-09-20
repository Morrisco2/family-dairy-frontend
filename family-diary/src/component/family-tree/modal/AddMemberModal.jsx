import { useEffect, useState } from "react";

const AddMemberModal = ({ open, relationType, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    birthYear: "",
    gender: "male",
  });

  useEffect(() => {
    if (open) {
      setForm({
        name: "",
        birthYear: "",
        gender: "male",
      });
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return;

    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-gray-200 p-5">
          <h2 className="text-xl font-semibold text-[#2E5FA7]">
            Add {relationType === "offspring" ? "Offspring" : "Parent"}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition-colors focus:border-[#2E5FA7] focus:ring-2 focus:ring-blue-100"
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Birth Year
            </label>

            <input
              type="text"
              value={form.birthYear}
              onChange={(e) => setForm({ ...form, birthYear: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition-colors focus:border-[#2E5FA7] focus:ring-2 focus:ring-blue-100"
              placeholder="e.g. 1998"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Gender
            </label>

            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition-colors focus:border-[#2E5FA7] focus:ring-2 focus:ring-blue-100">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-[#2E5FA7] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#244a83]">
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
