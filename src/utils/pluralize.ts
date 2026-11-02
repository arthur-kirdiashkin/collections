const pluralRules = new Intl.PluralRules("ru-RU");

export const pluralizeQuestions = (count: number): string => {
  const forms: Record<Intl.LDMLPluralRule, string> = {
    one: "вопрос",
    few: "вопроса",
    many: "вопросов",
    other: "вопросов",
    zero: "вопросов",
    two: "вопроса",
  };

  const rule = pluralRules.select(count);
  return `${count} ${forms[rule] || "вопросов"}`;
};
