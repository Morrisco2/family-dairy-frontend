
import { useMemo, useState } from "react";

const defaultValues = {
  ancestorId: "1",
  generationScope: "all",
  generationCount: 3,
  writingStyle: "biblical",
  includeSpouses: true,
  includeBirthDates: true,
  includeDeathDates: true,
  markUnknownDetails: false,
};

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-[#D0DDED] px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-[#2E5E99] focus:ring-2 focus:ring-blue-100";

function OptionCheckbox({ checked, onChange, children }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 accent-[#2E5E99]"
      />
      <span className="text-sm text-slate-700">{children}</span>
    </label>
  );
}

export default function GenealogyGeneratorForm({
  members = [],
  initialValues = {},
  onGenerate,
  onCancel,
}) {
  const initial = useMemo(
    () => ({ ...defaultValues, ...initialValues }),
    [initialValues],
  );

  const [form, setForm] = useState(initial);

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const sortedMembers = useMemo(
    () =>
      [...members].sort((a, b) =>
        String(a.name ?? "").localeCompare(String(b.name ?? "")),
      ),
    [members],
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.ancestorId) return;

    onGenerate?.({
      ...form,
      ancestorId: String(form.ancestorId),
      generationCount:
        form.generationScope === "limited"
          ? Math.max(1, Number(form.generationCount) || 1)
          : null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-3xl pb-20  rounded-2xl border border-slate-200  p-5 shadow-sm sm:p-8"
    >
      <div className="mb-7 ">


        <h2 className="mt-2 mb-2 text-lg font-bold text-[#2E5E99] sm:text-3xl">
          Generate family history
        </h2>

        <small className="mt-2 text-sm leading-6 text-slate-500">
          Turn recorded family relationships into a readable genealogy
          that your family can review and preserve.
        </small>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-semibold text-slate-800">
            Starting ancestor
          </label>

          <select
            className={inputClass}
            value={form.ancestorId}
            onChange={(event) => update("ancestorId", event.target.value)}
            required
          >
            <option value="">Select an ancestor</option>

            {sortedMembers.map((member) => (
              <option key={member.id} value={String(member.id)}>
                {member.name}
                {member.isRoot ? " (root)" : ""}
              </option>
            ))}
          </select>

          <p className="mt-2 text-xs text-slate-500">
            The history begins with this person and follows their recorded
            descendants.
          </p>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-800">
            Generations to include
          </label>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { value: "all", label: "Entire lineage" },
              { value: "limited", label: "Specific number" },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => update("generationScope", item.value)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  form.generationScope === item.value
                    ? "border-[#2E5E99] bg-[#D0DDED] text-[#2E5E99]"
                    : "border-[#D0DDED] text-slate-600 hover:bg-[#D0DDED]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {form.generationScope === "limited" && (
            <div className="mt-5">
              <label className="text-sm  text-slate-700">
                Number of generations, including the starting ancestor
              </label>

              <input
                type="number"
                min="1"
                max="100"
                value={form.generationCount}
                onChange={(event) =>
                  update("generationCount", event.target.value)
                }
                className={inputClass}
                required
              />
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-800">
            Writing style
          </label>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              {
                value: "biblical",
                title: "Biblical",
                description: "Traditional lineage wording.",
              },
              {
                value: "formal",
                title: "Formal historical",
                description: "Structured family record.",
              },
              {
                value: "modern",
                title: "Simple modern",
                description: "Clear, everyday English.",
              },
            ].map((style) => (
              <button
                type="button"
                key={style.value}
                onClick={() => update("writingStyle", style.value)}
                className={`rounded-xl border p-4 text-left transition ${
                  form.writingStyle === style.value
                    ? "border-[#2E5E99] bg-[#D0DDED] ring-1 ring-[#2E5E99]"
                    : "border-slate-200 hover:bg-[#D0DDED]"
                }`}
              >
                <span className="block text-sm font-semibold text-slate-800">
                  {style.title}
                </span>
                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  {style.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm  font-semibold text-slate-800">
            Details to include
          </h2>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <OptionCheckbox
              checked={form.includeSpouses}
              onChange={(value) => update("includeSpouses", value)}
            >
              Include spouses
            </OptionCheckbox>

            <OptionCheckbox
              checked={form.includeBirthDates}
              onChange={(value) => update("includeBirthDates", value)}
            >
              Include birth dates or years
            </OptionCheckbox>

            <OptionCheckbox
              checked={form.includeDeathDates}
              onChange={(value) => update("includeDeathDates", value)}
            >
              Include death dates or years
            </OptionCheckbox>

            <OptionCheckbox
              checked={form.markUnknownDetails}
              onChange={(value) => update("markUnknownDetails", value)}
            >
              Mark unavailable details as unknown
            </OptionCheckbox>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
        {/* <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-[#D0DDED]"
        >
          Cancel
        </button> */}

        <button
          type="submit"
          className="rounded-xl bg-[#2E5E99] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#244b7c]"
        >
          Preview 
        </button>
      </div>
    </form>
  );
}