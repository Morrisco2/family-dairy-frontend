
import { useState } from "react";

export default function GenealogyPreview({
  genealogy,
  onSave,
  onBack,
  onExport,
}) {
  const [title, setTitle] = useState(genealogy.title);
  const [text, setText] = useState(genealogy.text);
  const [message, setMessage] = useState("");

  const handleSave = () => {
    const saved = onSave?.({
      ...genealogy,
      title: title.trim() || genealogy.title,
      text,
      updatedAt: new Date().toISOString(),
    });

    if (saved !== false) {
      setMessage("Saved to this browser.");
    }
  };

const handleExport = () => {
  onExport?.();
};

  return (
    <section className="mx-auto w-full max-w-4xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>


          <h2 className="mt-1 text-lg font-bold text-[#2E5E99]">
            GENEALOGY PREVIEW
          </h2>

          <small className="mt-2 text-sm text-slate-500">
            Check the generated details before preserving your family's record.
          </small>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="self-start rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-[#D0DDED]"
        >
          Back to settings
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200  p-5 shadow-sm sm:p-8">
        <div className="mb-6 border-b border-slate-100 pb-5">

          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-lg font-semibold text-slate-900 outline-none focus:border-[#2E5E99]"
          />

          <p className="mt-2 text-xs text-slate-500">
            Generated {new Date(genealogy.generatedAt).toLocaleString()}
          </p>
        </div>

        <label className="text-sm font-semibold text-slate-700">
          Genealogy text
        </label>

        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={18}
          className="mt-2 w-full resize-y rounded-xl border border-slate-200 p-4 text-sm leading-8 text-slate-800 outline-none focus:border-[#2E5E99] sm:text-base"
          spellCheck
        />

        <p className="mt-5 text-xs text-slate-500">
          Review every relationship and date. The generator can only use
          information available in your family records.
        </p>

        {message && (
          <p role="status" className="mt-4 text-sm text-emerald-700">
            {message}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleExport}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-[#D0DDED]"
          >
            Print / Save as PDF
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-[#2E5E99] px-5 py-3 text-sm font-semibold text-white hover:bg-[#244b7c]"
          >
            Save version
          </button>
        </div>
      </div>
    </section>
  );
}