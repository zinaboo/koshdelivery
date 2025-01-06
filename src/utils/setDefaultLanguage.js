export const setDefaultLanguage = () => {
  const lan = "fr";
  const country = "FR";
  localStorage.setItem("language-setting", JSON.stringify(lan));
  localStorage.setItem("country", JSON.stringify(country));
};
