
const STORAGE_KEY = "family-diary-genealogy-versions";

function readVersions() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    const parsed = value ? JSON.parse(value) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Unable to read saved genealogies:", error);
    return [];
  }
}

export function getSavedGenealogies() {
  return readVersions();
}

export function saveGenealogyVersion(genealogy) {
  const versions = readVersions();

  const version = {
    ...genealogy,
    id:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    savedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([version, ...versions]),
    );

    return version;
  } catch (error) {
    console.error("Unable to save genealogy:", error);
    throw new Error(
      "Could not save this genealogy. Check your browser storage.",
    );
  }
}

export function deleteGenealogyVersion(id) {
  const versions = readVersions().filter(
    (version) => version.id !== id,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(versions));

  return versions;
}