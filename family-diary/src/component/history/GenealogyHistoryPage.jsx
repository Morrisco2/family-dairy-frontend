
import { useState } from "react";

import { familyMembers } from "../../component/family-tree/data/dummyTree";


import GenealogyGeneratorForm from "./GenealogyGeneratorForm";
import GenealogyPreview from "./GenealogyPreview";

import { generateGenealogy } from "./genealogyEngine";
import { saveGenealogyVersion } from "./genealogyStorage";
import { exportGenealogyPdf } from "./exportGenealogyPdf";

const initialValues = {
  ancestorId: "1",
  generationScope: "all",
  generationCount: 3,
  writingStyle: "biblical",
  includeSpouses: true,
  includeBirthDates: true,
  includeDeathDates: true,
  markUnknownDetails: false,
};

export default function GenealogyHistoryPage() {
  const [stage, setStage] = useState("configure");
  const [genealogy, setGenealogy] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = (configuration) => {
    try {
      setError("");

      const result = generateGenealogy(
        familyMembers,
        configuration,
      );

      setGenealogy({
        ...result,
        configuration,
      });

      setStage("preview");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to generate the family history.",
      );
    }
  };

  const handleSave = (document) => {
    try {
      setError("");

      const saved = saveGenealogyVersion(document);

      return saved;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save the genealogy.",
      );

      throw err;
    }
  };

  const handleExport = () => {
    if (!genealogy) return;

    try {
      exportGenealogyPdf(genealogy);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to export the genealogy.",
      );
    }
  };

  return (
    <main className="min-h-full   ">
      {error && (
        <div
          role="alert"
          className="mx-auto mb-5 max-w-4xl rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {stage === "configure" && (
        <GenealogyGeneratorForm
          members={familyMembers}
          initialValues={initialValues}
          onGenerate={handleGenerate}
          onCancel={() => {
            // Replace with your existing History page navigation.
          }}
        />
      )}

      {stage === "preview" && genealogy && (
        <GenealogyPreview
          genealogy={genealogy}
          onBack={() => {
            setError("");
            setStage("configure");
          }}
          onSave={handleSave}
          onExport={handleExport}
        />
      )}
    </main>
  );
}