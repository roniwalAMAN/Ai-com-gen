# AI Component Generator (GenUI)

AI Component Generator is a React + Vite app that generates UI component code from prompts using Gemini, lets you edit code in Monaco Editor, and shows a live preview in a tabbed interface.

## What this project does

- Generates component code (single HTML output) from natural-language prompts
- Supports multiple framework output modes in prompt context:
	- HTML + CSS
	- HTML + Tailwind CSS
	- HTML + Bootstrap
	- HTML + CSS + JS
	- HTML + Tailwind + Bootstrap
- Provides in-app code editing with Monaco Editor
- Provides tab-based live preview (`Code` and `Preview` tabs)
- Supports copy and download of generated code
- Supports fullscreen preview
- Includes dark/light theme toggle with persistence in localStorage

## Tech stack

- React 19
- Vite 7
- Tailwind CSS
- Monaco Editor (`@monaco-editor/react`)
- Google Gemini SDK (`@google/genai`)
- React Router
- React Select
- React Toastify
- React Icons

## Project structure

```text
.
|-- public/
|-- src/
|   |-- components/
|   |   `-- Navbar.jsx
|   |-- pages/
|   |   |-- Home.jsx
|   |   `-- NoPage.jsx
|   |-- App.css
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- eslint.config.js
|-- index.html
|-- package.json
|-- postcss.config.js
|-- tailwind.config.js
`-- vite.config.js
```

## Key files and responsibilities

- `src/main.jsx`
	- App bootstrap
	- Mounts `App`
	- Registers `ToastContainer`

- `src/App.jsx`
	- Router setup (`/` and fallback route)
	- Theme state management (`dark` / `light`)
	- Persists theme in localStorage

- `src/pages/Home.jsx`
	- Core product flow:
		- prompt input
		- framework selector
		- AI API call
		- markdown code extraction
		- code editor + preview tabs
		- copy/download/fullscreen actions
	- Live preview behavior:
		- editor updates `code` state on each change
		- preview iframe reads from `srcDoc={code}`

- `src/components/Navbar.jsx`
	- Branding and top actions
	- Theme toggle button

- `src/App.css`
	- Global theme variables
	- Dark/light token definitions
	- Shared utility styles (`.icon`, `.sp-text`)

## Environment variables

Create a `.env` file in project root:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Important:
- Prefix must be `VITE_` for Vite client-side access.
- Without this key, generation action will show an error toast.

## Setup and run

1. Install dependencies

```bash
npm install
```

2. Add environment variable in `.env`

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

3. Start development server

```bash
npm run dev
```

4. Build production bundle

```bash
npm run build
```

5. Preview production build locally

```bash
npm run preview
```

## Available scripts

- `npm run dev` - run Vite dev server
- `npm run build` - create production build
- `npm run preview` - preview built assets
- `npm run lint` - run ESLint

## User flow

1. User chooses framework from dropdown.
2. User writes prompt in textarea.
3. On `Generate`, app calls Gemini model `gemini-2.5-flash`.
4. App extracts fenced code from model response.
5. Generated code is loaded into editor.
6. User edits code in `Code` tab.
7. `Preview` tab renders the same live `code` via iframe `srcDoc`.
8. User can copy code, download HTML file, or open fullscreen preview.

## Architecture notes

- Routing
	- `BrowserRouter` with two routes:
		- `/` -> `Home`
		- `*` -> `NoPage`

- State model (Home page)
	- `prompt`: user prompt text
	- `frameWork`: selected framework option
	- `code`: generated/edited code (single source for editor + preview)
	- `tab`: active right-panel tab (`Code` or `Preview`)
	- `loading`: generation request state
	- `outputScreen`: toggles result panel view
	- `isNewTabOpen`: fullscreen preview overlay visibility

- Theme model
	- Stored in localStorage key `theme`
	- Applied as `data-theme` on `body`
	- CSS custom properties drive visual tokens

## Linting and quality

- ESLint config uses:
	- `@eslint/js`
	- `eslint-plugin-react-hooks`
	- `eslint-plugin-react-refresh`
- Dist folder is ignored in linting.

## Known behavior and limitations

- AI output is expected as fenced code block; fallback uses raw response text.
- Preview runs via iframe `srcDoc`; external CDN/script loading depends on generated code content.
- Build may show large chunk warning because Monaco and related dependencies are heavy.

## Troubleshooting

- Error: `Missing API key. Set VITE_GEMINI_API_KEY in .env`
	- Ensure `.env` exists in root and key name is exact.
	- Restart dev server after changing `.env`.

- Preview not changing
	- Ensure you are editing in `Code` tab and viewing `Preview` tab.
	- Check browser console for invalid generated HTML/JS errors.

- Command typo
	- Use `npm run dev` (not `npm rum dev`).

## Suggested next improvements

- Add rate-limit and retry UI around generation call.
- Add local autosave for prompt and code.
- Add export formats (`.html`, `.jsx`, `.vue`) based on selected framework.
- Add test coverage for utility functions (like code extraction).
- Add code splitting for performance optimization.
