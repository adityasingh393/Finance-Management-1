# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

```
Finance-Management-1
├─ .eslintrc.cjs
├─ .git
│  ├─ HEAD
│  ├─ branches
│  ├─ config
│  ├─ description
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-b1f4febd460dee207666e7a3f5c3b5f36d7c697e.idx
│  │     └─ pack-b1f4febd460dee207666e7a3f5c3b5f36d7c697e.pack
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  ├─ dev
│     │  ├─ feature
│     │  │  └─ dashboard
│     │  └─ master
│     ├─ remotes
│     │  └─ origin
│     │     └─ HEAD
│     └─ tags
├─ .gitignore
├─ README.md
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
 src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ Router
│  │  └─ AppRouter.tsx
│  ├─ components
│  │  ├─ LoginSignUp.tsx
│  │  ├─ common
│  │  │  └─ CommonButton.tsx
│  │  └─ landing
│  │     ├─ GridPattern.tsx
│  │     └─ GridPatternLinearGradient.tsx
│  ├─ index.css
│  ├─ lib
│  │  └─ utils.ts
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ Dashboard.tsx
│  │  ├─ Landing
│  │  │  └─ Hero.tsx
│  │  └─ User
│  │     ├─ Login.tsx
│  │     └─ Register.tsx
│  ├─ redux
│  │  ├─ UserAuth
│  │  │  └─ authSlice.ts
│  │  └─ store.ts
│  ├─ styles
│  │  └─ globals.css
│  ├─ utils
│  │  ├─ customHooks
│  │  │  └─ useRegisterForm.tsx
│  │  ├─ initializeAuth.ts
│  │  ├─ interface
│  │  │  └─ types.ts
│  │  └─ schema
│  │     └─ loginSignupSchema.ts├─
│  └─ vite-env.d.ts
├─ tailwind.config.js
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

`