module.exports = {
  plugins: [require.resolve("@ianvs/prettier-plugin-sort-imports")],
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  printWidth: 80,
  importOrder: [
    "^react$",
    "^@mui/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "",
    "^react-i18next$",
    "^@tanstack/react-query",
    "^react-router-dom$",
    "",
    "^hooks/(.*)$",
    "",
    "^types/(.*)$",
    "^config/(.*)$",
    "^utils/(.*)$",
    "^assets/(.*)$",
    "^layout/(.*)$",
    "^pages/(.*)$",
    "^components/(.*)$",
    "^[./]",
  ],
  useTabs: false,
};
