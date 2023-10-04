module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:security/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  // "parserOptions": {
  // 	"ecmaVersion": "latest",
  // 	"sourceType": "module",

  // },
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: [
    "@typescript-eslint",
    "jest",
    "unused-imports",
    "prefer-arrow",
    "filename-rules",
    "simple-import-sort",
  ],
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    // quotes: ['error', 'single'],
    "no-console": "warn",
    "no-empty": "warn",
    "prettier/prettier": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_+",
        varsIgnorePattern: "^_+",
        caughtErrorsIgnorePattern: "^_+",
      },
    ],
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/explicit-module-boundary-types": [
      "error",
      {
        allowArgumentsExplicitlyTypedAsAny: true,
      },
    ],
    "@typescript-eslint/consistent-type-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    // https://stackoverflow.com/a/64258560/8930600
    "prefer-arrow/prefer-arrow-functions": [
      "error",
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],
    "func-style": ["error", "expression", { allowArrowFunctions: true }],

    "require-await": "off",
    "@typescript-eslint/require-await": "error",
    "@typescript-eslint/no-non-null-assertion": "error",

    "@typescript-eslint/no-explicit-any": "error",

    "@typescript-eslint/switch-exhaustiveness-check": "error",

    "max-lines": ["error", 300],

    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "typeLike",
        format: ["PascalCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "parameter",
        format: ["camelCase", "PascalCase"],
        leadingUnderscore: "allow",
      },
      {
        /** We must support PascalCase because both zod schemas and unstated-next objects do use it */
        selector: "variable",
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
        leadingUnderscore: "allow",
      },
    ],
    "filename-rules/match": [
      "error",
      /^([a-z0-9.]+-)*[a-z0-9.eslintrc.js]+(?:\..*)?$/i,
    ],
    // increase the severity of rules so they are auto-fixable
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    /** https://github.com/eslint-community/eslint-plugin-security/issues/21#issuecomment-1157887653 */
    "security/detect-object-injection": "off",
  },
};
