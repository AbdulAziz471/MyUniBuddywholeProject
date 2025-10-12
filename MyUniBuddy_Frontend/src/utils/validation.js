export const validateFields = (fields, rules) => {
  const errors = {};

  for (const [field, rule] of Object.entries(rules)) {
    const value = fields[field];

    if (rule.required) {
      const isEmpty =
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "");

      if (isEmpty) {
        errors[field] = true;
      }
    }

    if (rule.email && value && !/\S+@\S+\.\S+/.test(value)) {
      errors[field] = true;
    }

    if (rule.pattern && value && !rule.pattern.test(value)) {
      errors[field] = true;
    }
  }

  return errors;
};
