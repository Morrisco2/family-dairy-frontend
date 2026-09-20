export const calculateAge = (birthYear) => {
  if (!birthYear) return "";

  const today = new Date();

  // Handle deceased format: "1904 - 1999"
  if (typeof birthYear === "string" && birthYear.includes(" - ")) {
    const [birth, death] = birthYear.split(" - ").map(Number);

    if (!isNaN(birth) && !isNaN(death)) {
      const age = death - birth;
      return `${age} ${age === 1 ? "year" : "years"}`;
    }
  }

  // Handle year-only format: "1973"
  if (birthYear.toString().length === 4) {
    const age = today.getFullYear() - Number(birthYear);

    return `${age} ${age === 1 ? "year" : "years"}`;
  }

  // Handle full date format
  const birthDate = new Date(birthYear);

  if (isNaN(birthDate)) return "";

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  // Adjust if birthday hasn't happened yet this year
  if (today.getDate() < birthDate.getDate()) {
    months--;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years < 1) {
    return `${months} ${months === 1 ? "month" : "months"}`;
  }

  return `${years} ${years === 1 ? "year" : "years"}`;
};
