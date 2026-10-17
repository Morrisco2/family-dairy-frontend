
const getId = (id) => String(id ?? "");

function getYearParts(member) {
  const value = String(member.birthYear ?? "").trim();
  const match = value.match(/^(\d{4})(?:\s*[-–—]\s*(\d{4}))?$/);

  return {
    birth: match?.[1] ?? "",
    death: match?.[2] ?? "",
  };
}

function getName(member) {
  return String(member.name ?? "Unnamed family member").trim();
}

function getSpouses(member, membersById) {
  return (member.spouses ?? [])
    .map((id) => membersById.get(getId(id)))
    .filter(Boolean);
}

function formatDetails(member, options) {
  const { birth, death } = getYearParts(member);
  const details = [];

  if (options.includeBirthDates && birth) {
    details.push(`born ${birth}`);
  }

  if (options.includeDeathDates && death) {
    details.push(`died ${death}`);
  }

  if (details.length === 0) return "";

  return ` (${details.join(", ")})`;
}

function personLabel(member, options) {
  const details = formatDetails(member, options);

  if (details) return `${getName(member)}${details}`;

  if (options.markUnknownDetails) {
    const { birth, death } = getYearParts(member);
    const missing = [];

    if (options.includeBirthDates && !birth) {
      missing.push("birth date unknown");
    }

    if (options.includeDeathDates && !death) {
      missing.push("death date unknown");
    }

    return `${getName(member)}${
      missing.length ? ` (${missing.join("; ")})` : ""
    }`;
  }

  return getName(member);
}

function getStyleLanguage(style) {
  switch (style) {
    case "biblical":
      return {
        opening: "The genealogy of",
        child: "begot",
        children: "And the children of",
        spouse: "was married to",
        ending: "This is the recorded lineage of",
      };

    case "formal":
      return {
        opening: "The recorded family lineage of",
        child: "was the parent of",
        children: "The descendants of",
        spouse: "was married to",
        ending: "This concludes the recorded lineage of",
      };

    default:
      return {
        opening: "The family history of",
        child: "had",
        children: "The children of",
        spouse: "was married to",
        ending: "This is the recorded family history of",
      };
  }
}

/**
 * Generates a genealogy narrative from a flat familyMembers array.
 *
 * Expected record fields:
 * id, name, parents, spouses, birthYear, children (optional).
 *
 * generationScope:
 * "all" or "limited"
 *
 * generationCount:
 * number of generations, including the selected ancestor.
 */
export function generateGenealogy(members, options) {
  if (!Array.isArray(members) || members.length === 0) {
    throw new Error("No family records were provided.");
  }

  const membersById = new Map(
    members.map((member) => [getId(member.id), member]),
  );

  const ancestor = membersById.get(getId(options.ancestorId));

  if (!ancestor) {
    throw new Error("The selected ancestor was not found.");
  }

  const language = getStyleLanguage(options.writingStyle);
  const maxGenerations =
    options.generationScope === "limited"
      ? Math.max(1, Number(options.generationCount) || 1)
      : Infinity;

  // Determine descendants through parent records.
  const childrenByParent = new Map();

  for (const member of members) {
    for (const parentId of member.parents ?? []) {
      const key = getId(parentId);

      if (!membersById.has(key)) continue;

      if (!childrenByParent.has(key)) {
        childrenByParent.set(key, []);
      }

      childrenByParent.get(key).push(member);
    }
  }

  const lines = [];
  const visited = new Set();
  const emittedSpouses = new Set();

  const rootLabel = personLabel(ancestor, options);

  lines.push(`${language.opening} ${rootLabel}.`);
  lines.push("");

  function writePerson(member, generation) {
    const id = getId(member.id);

    if (visited.has(id)) return;
    visited.add(id);

    if (generation >= maxGenerations) return;

    const children = childrenByParent.get(id) ?? [];
    const validChildren = children.filter(
      (child) => !visited.has(getId(child.id)),
    );

    if (options.includeSpouses) {
      for (const spouse of getSpouses(member, membersById)) {
        const spouseId = getId(spouse.id);

        if (spouseId === id || emittedSpouses.has(spouseId)) continue;

        emittedSpouses.add(spouseId);

        lines.push(
          `${personLabel(member, options)} ${language.spouse} ${personLabel(
            spouse,
            options,
          )}.`,
        );
      }
    }

    if (validChildren.length > 0) {
      const parentLabel = personLabel(member, options);
      const childLabels = validChildren.map((child) =>
        personLabel(child, options),
      );

      if (options.writingStyle === "biblical") {
        lines.push(
          `${parentLabel} begot ${joinNames(childLabels)}.`,
        );
      } else if (options.writingStyle === "formal") {
        lines.push(
          `${parentLabel} ${language.child} ${joinNames(childLabels)}.`,
        );
      } else {
        lines.push(
          `${parentLabel} ${language.child} ${joinNames(childLabels)}.`,
        );
      }

      lines.push("");

      for (const child of validChildren) {
        writePerson(child, generation + 1);
      }
    }
  }

  function joinNames(names) {
    if (names.length <= 1) return names[0] ?? "";

    if (names.length === 2) {
      return `${names[0]} and ${names[1]}`;
    }

    return `${names.slice(0, -1).join(", ")}, and ${names.at(-1)}`;
  }

  writePerson(ancestor, 1);

  lines.push(language.ending + ` ${rootLabel}.`);

  return {
    title: `Genealogy of ${getName(ancestor)}`,
    ancestorId: getId(ancestor.id),
    writingStyle: options.writingStyle,
    generatedAt: new Date().toISOString(),
    text: lines.join("\n").replace(/\n{3,}/g, "\n\n").trim(),
  };
}