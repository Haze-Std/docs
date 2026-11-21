/*
 * Cheat sheet gallery + page viewer, used by /sheets (sheets.mdx).
 *
 * Files live in /assets/cheat-sheets:
 *   pdf/<file>.pdf        the original PDFs
 *   pages/<slug>-<n>.webp every page at 192 dpi, rendered from the PDF
 *   thumbs/<slug>.webp    page 1 at 800px wide, for the cards
 *
 * Mintlify serves .webp on every plan, so the viewer always works. It serves
 * .pdf only on Enterprise plans, so the PDF links go through jsDelivr, which
 * serves files straight from the public GitHub repo's main branch. If the site
 * moves to Enterprise, set pdfBase to "/assets/cheat-sheets/pdf/".
 *
 * To add a sheet: put the PDF in pdf/, render its pages and thumbnail with the
 * same names, and add an entry to `sheets` below.
 */
export const CheatSheets = () => {
  const pdfBase = "https://cdn.jsdelivr.net/gh/Haze-Std/docs@main/assets/cheat-sheets/pdf/";
  const imgBase = "/assets/cheat-sheets/";

  // Every sheet is 1224 x 792 pt (17 x 11 in). 100% zoom = 1632 CSS px wide, like a PDF viewer.
  const pageWidth = 1632;
  const zoomLevels = ["fit", 1, 1.5, 2];

  const sheets = [
    {
      slug: "html-dom",
      title: "HTML & DOM",
      category: "Web Basics",
      file: "Beginners-HTML-DOM-Cheat-Sheets.pdf",
      pages: 3,
      parts: ["HTML", "DOM with TypeScript"],
      summary:
        "Page structure, text and media, forms and accessible interactive elements, then finding, changing and listening to DOM elements with TypeScript.",
    },
    {
      slug: "css-animations-tailwind",
      title: "CSS, Animations & Tailwind",
      category: "Web Basics",
      file: "Beginners-CSS-Animations-Tailwind-Cheat-Sheets.pdf",
      pages: 4,
      parts: ["CSS", "Layout Visual Guide", "Animations", "Tailwind CSS"],
      summary:
        "Selectors and the cascade, the box model, Flexbox and Grid with a visual layout guide, transitions, keyframes and modern animation APIs, plus Tailwind CSS v4.",
    },
    {
      slug: "typescript",
      title: "TypeScript",
      category: "Web Basics",
      file: "Beginners-TypeScript-Cheat-Sheets.pdf",
      pages: 13,
      parts: [
        "Basics",
        "Strings & Numbers",
        "Arrays, Objects & Collections",
        "Types",
        "Functions",
        "Classes",
        "Generics",
        "Modules & Async",
        "Bun & pnpm",
        "Hono, Zod & Vitest",
      ],
      summary:
        "The language from variables to modules: strings, dates and collections, types, functions, classes and generics, async code, and tooling with Bun, pnpm, Hono, Zod and Vitest.",
    },
    {
      slug: "web-apis",
      title: "Web APIs",
      category: "Web Basics",
      file: "Beginners-Web-APIs-Cheat-Sheets.pdf",
      pages: 3,
      parts: ["Network & Storage", "Graphics & Media", "Browser & Device"],
      summary:
        "Fetch, WebSockets, storage, workers and offline support; canvas, WebGL, audio, speech and camera; URLs, navigation, sharing, notifications and device access.",
    },
    {
      slug: "react",
      title: "React",
      category: "React.js",
      file: "Beginners-React-Cheat-Sheets.pdf",
      pages: 2,
      parts: ["Core", "Hooks"],
      summary:
        "Components, JSX, props, state, events, effects and refs, then useReducer, context, memoization, async forms and actions, and TypeScript pitfalls.",
    },
    {
      slug: "nextjs",
      title: "Next.js",
      category: "Next.js",
      file: "Beginners-Nextjs-Cheat-Sheets.pdf",
      pages: 2,
      parts: ["Core", "Data & Mutations"],
      summary:
        "App Router projects and routing, Server and Client Components, metadata and assets, then data fetching, caching, Server Actions, route handlers and deployment.",
    },
    {
      slug: "postgresql-drizzle",
      title: "PostgreSQL & Drizzle",
      category: "Database",
      file: "Beginners-PostgreSQL-Drizzle-Cheat-Sheets.pdf",
      pages: 3,
      parts: ["PostgreSQL", "PostgreSQL Advanced", "Drizzle ORM"],
      summary:
        "psql, tables, inserts, queries and joins; indexes, transactions, JSONB and other rich types, views and security; then schemas, queries and migrations with Drizzle ORM.",
    },
    {
      slug: "ml-ai",
      title: "ML & AI",
      category: "Artificial Intelligence",
      file: "Beginners-ML-AI-Cheat-Sheets.pdf",
      pages: 3,
      parts: ["NumPy & pandas", "scikit-learn", "PyTorch"],
      summary:
        "NumPy arrays and pandas DataFrames, the scikit-learn workflow from pipelines to evaluation, and PyTorch tensors, models, training loops and deployment.",
    },
    {
      slug: "design-patterns",
      title: "Design Patterns",
      category: "Architecture",
      file: "Design-Patterns-TypeScript-React-Nextjs-Cheat-Sheets.pdf",
      pages: 3,
      parts: ["TypeScript", "React & Next.js"],
      summary:
        "Creational, structural and behavioral patterns in TypeScript, type-level safety, and component, state and architecture patterns for React and Next.js.",
    },
  ];

  const [openSlug, setOpenSlug] = useState(null);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [downloading, setDownloading] = useState(null);

  const dialogRef = useRef(null);
  const scrollRef = useRef(null);
  const triggerRef = useRef(null);
  const pageRef = useRef(1);

  const active = sheets.find((s) => s.slug === openSlug) || null;
  const zoom = zoomLevels[zoomIndex];

  const pdfUrl = (sheet) => pdfBase + sheet.file;
  const pageUrl = (sheet, n) => `${imgBase}pages/${sheet.slug}-${n}.webp`;

  // Keep the URL hash in sync (/sheets#react opens the React sheet) without
  // touching history entries, so the router's own state stays intact.
  const setHash = (slug) => {
    const url = window.location.pathname + window.location.search + (slug ? `#${slug}` : "");
    window.history.replaceState(window.history.state, "", url);
  };

  const openSheet = (slug, trigger) => {
    triggerRef.current = trigger || null;
    setZoomIndex(0);
    setPage(1);
    pageRef.current = 1;
    setOpenSlug(slug);
    setHash(slug);
  };

  const closeSheet = () => {
    setOpenSlug(null);
    setHash(null);
  };

  useEffect(() => {
    const fromHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (sheets.some((s) => s.slug === slug)) {
        setZoomIndex(0);
        setPage(1);
        pageRef.current = 1;
        setOpenSlug(slug);
      } else {
        setOpenSlug(null);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const pageElements = () =>
    scrollRef.current ? Array.from(scrollRef.current.querySelectorAll("[data-sheet-page]")) : [];

  const scrollToPage = (n, behavior) => {
    const el = scrollRef.current;
    const target = pageElements()[n - 1];
    if (!el || !target) return;
    const top = target.getBoundingClientRect().top - el.getBoundingClientRect().top + el.scrollTop - 16;
    el.scrollTo({ top: Math.max(0, top), behavior: behavior || "smooth" });
  };

  const goToPage = (n) => {
    if (!active) return;
    const next = Math.min(active.pages, Math.max(1, n));
    pageRef.current = next;
    setPage(next);
    scrollToPage(next);
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const probe = el.getBoundingClientRect().top + el.clientHeight * 0.35;
    let current = 1;
    pageElements().forEach((p, i) => {
      if (p.getBoundingClientRect().top <= probe) current = i + 1;
    });
    if (current !== pageRef.current) {
      pageRef.current = current;
      setPage(current);
    }
  };

  // Open as a native modal <dialog>. showModal() puts it in the browser's top
  // layer, above Mintlify's navbar whatever the stacking contexts around this
  // component, makes the rest of the page inert (focus stays inside), and
  // closes on Esc. Also lock page scroll and wire up page-flipping keys.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!active || !dialog) return undefined;
    if (!dialog.open) dialog.showModal();
    if (scrollRef.current) scrollRef.current.focus({ preventScroll: true });

    const root = document.documentElement;
    const previousOverflow = [root.style.overflow, document.body.style.overflow];
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // Esc (or anything else that closes the dialog natively) ends up here.
    const onClose = () => closeSheet();
    dialog.addEventListener("close", onClose);

    const onKey = (e) => {
      // Left/right flip pages only when nothing is scrolled sideways.
      const el = scrollRef.current;
      const sideways = el && el.scrollWidth > el.clientWidth + 1;
      if (!sideways && e.key === "ArrowRight") {
        e.preventDefault();
        goToPage(pageRef.current + 1);
      } else if (!sideways && e.key === "ArrowLeft") {
        e.preventDefault();
        goToPage(pageRef.current - 1);
      }
    };
    dialog.addEventListener("keydown", onKey);

    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("keydown", onKey);
      if (dialog.open) dialog.close();
      root.style.overflow = previousOverflow[0];
      document.body.style.overflow = previousOverflow[1];
      if (triggerRef.current && triggerRef.current.focus) triggerRef.current.focus({ preventScroll: true });
    };
  }, [openSlug]);

  // After a zoom change, keep the current page in view and centre it sideways.
  useEffect(() => {
    if (!active) return;
    const el = scrollRef.current;
    if (!el) return;
    scrollToPage(pageRef.current, "auto");
    el.scrollLeft = Math.max(0, (el.scrollWidth - el.clientWidth) / 2);
  }, [zoomIndex]);

  // Download through a blob so the file keeps its name even though the PDF is
  // on another origin (the `download` attribute is ignored cross-origin).
  const download = async (e, sheet) => {
    e.preventDefault();
    if (downloading) return;
    setDownloading(sheet.slug);
    try {
      const res = await fetch(pdfUrl(sheet));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const href = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = href;
      a.download = sheet.file;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(href), 10000);
    } catch (err) {
      window.location.assign(pdfUrl(sheet));
    } finally {
      setDownloading(null);
    }
  };

  const DownloadIcon = () => (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0">
      <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.69L6.28 8.47a.75.75 0 1 0-1.06 1.06l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 1 0-1.06-1.06l-2.97 2.97V2.75Z" />
      <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
    </svg>
  );

  const EyeIcon = () => (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0">
      <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      <path
        fillRule="evenodd"
        d="M.66 10.59a1.65 1.65 0 0 1 0-1.19A10 10 0 0 1 10 3c4.26 0 7.9 2.66 9.34 6.41.15.38.15.8 0 1.19A10 10 0 0 1 10 17c-4.26 0-7.9-2.66-9.34-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const ExternalIcon = () => (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0">
      <path
        fillRule="evenodd"
        d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .41.34.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M6.19 12.75a.75.75 0 0 0 1.06.04l7.25-6.79v1.75a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.65l-7.17 6.7a.75.75 0 0 0-.04 1.05Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const toolbarButton =
    "inline-flex h-9 min-w-[2.25rem] items-center justify-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-950/5 disabled:cursor-not-allowed disabled:opacity-40 dark:text-zinc-300 dark:hover:bg-white/10";

  return (
    <div className="not-prose">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {sheets.map((sheet) => (
          <article
            key={sheet.slug}
            className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-950/10 bg-white dark:border-white/10 dark:bg-white/5"
          >
            <button
              type="button"
              onClick={(e) => openSheet(sheet.slug, e.currentTarget)}
              className="relative block aspect-[17/11] w-full overflow-hidden border-b border-zinc-950/10 bg-zinc-100 dark:border-white/10 dark:bg-zinc-800"
              aria-label={`View the ${sheet.title} cheat sheet`}
            >
              <img
                src={`${imgBase}thumbs/${sheet.slug}.webp`}
                alt=""
                width={800}
                height={518}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-2 right-2 rounded-md bg-zinc-950/75 px-2 py-0.5 text-xs font-medium text-white">
                {sheet.pages} {sheet.pages === 1 ? "page" : "pages"}
              </span>
            </button>

            <div className="flex flex-1 flex-col p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-dark dark:text-primary-light">
                {sheet.category}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-zinc-950 dark:text-white">{sheet.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{sheet.summary}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Sheets in this PDF">
                {sheet.parts.map((part) => (
                  <li
                    key={part}
                    className="rounded-md bg-zinc-950/5 px-2 py-0.5 text-xs text-zinc-700 dark:bg-white/10 dark:text-zinc-300"
                  >
                    {part}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                <button
                  type="button"
                  onClick={(e) => openSheet(sheet.slug, e.currentTarget)}
                  className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary-dark px-3 py-2 text-sm font-semibold text-white hover:brightness-110"
                >
                  <EyeIcon />
                  View
                </button>
                <a
                  href={pdfUrl(sheet)}
                  download={sheet.file}
                  onClick={(e) => download(e, sheet)}
                  aria-label={`Download the ${sheet.title} PDF`}
                  className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-zinc-950/15 px-3 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-950/5 dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/10"
                >
                  <DownloadIcon />
                  {downloading === sheet.slug ? "Downloading…" : "Download"}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {active && (
        <dialog
          ref={dialogRef}
          aria-label={`${active.title} cheat sheet`}
          className="fixed inset-0 m-0 flex h-full max-h-none w-full max-w-none flex-col border-0 bg-zinc-100 p-0 text-zinc-950 dark:bg-zinc-950 dark:text-white"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-zinc-950/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-zinc-900 sm:px-4">
            <div className="mr-auto min-w-0">
              <p className="truncate text-sm font-semibold text-zinc-950 dark:text-white">{active.title}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400" aria-live="polite">
                Page {page} of {active.pages}
              </p>
            </div>

            <div className="flex items-center gap-0.5" role="group" aria-label="Pages">
              <button
                type="button"
                className={toolbarButton}
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                aria-label="Previous page"
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                type="button"
                className={toolbarButton}
                onClick={() => goToPage(page + 1)}
                disabled={page >= active.pages}
                aria-label="Next page"
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-0.5" role="group" aria-label="Zoom">
              <button
                type="button"
                className={toolbarButton}
                onClick={() => setZoomIndex(Math.max(0, zoomIndex - 1))}
                disabled={zoomIndex === 0}
                aria-label="Zoom out"
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                type="button"
                className={`${toolbarButton} w-14 tabular-nums`}
                onClick={() => setZoomIndex(zoomIndex === 0 ? 1 : 0)}
                aria-label={zoom === "fit" ? "Zoom to 100%" : "Fit to width"}
                title={zoom === "fit" ? "Zoom to 100%" : "Fit to width"}
              >
                {zoom === "fit" ? "Fit" : `${Math.round(zoom * 100)}%`}
              </button>
              <button
                type="button"
                className={toolbarButton}
                onClick={() => setZoomIndex(Math.min(zoomLevels.length - 1, zoomIndex + 1))}
                disabled={zoomIndex === zoomLevels.length - 1}
                aria-label="Zoom in"
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-0.5">
              <a
                href={pdfUrl(active)}
                target="_blank"
                rel="noopener noreferrer"
                className={toolbarButton}
                title="Open the PDF in a new tab"
              >
                <ExternalIcon />
                <span className="hidden md:inline">Open PDF</span>
                <span className="sr-only md:hidden">Open the PDF in a new tab</span>
              </a>
              <a
                href={pdfUrl(active)}
                download={active.file}
                onClick={(e) => download(e, active)}
                className={toolbarButton}
                title="Download the PDF"
              >
                <DownloadIcon />
                <span className="hidden md:inline">{downloading === active.slug ? "Downloading…" : "Download"}</span>
                <span className="sr-only md:hidden">Download the PDF</span>
              </a>
              <button type="button" className={toolbarButton} onClick={closeSheet} aria-label="Close viewer" title="Close (Esc)">
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            onScroll={onScroll}
            tabIndex={0}
            aria-label={`${active.title} pages`}
            className="flex-1 overflow-auto p-3 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:p-6"
          >
            <div
              className="mx-auto flex flex-col gap-4 sm:gap-6"
              style={{ width: zoom === "fit" ? "100%" : `${pageWidth * zoom}px`, maxWidth: zoom === "fit" ? `${pageWidth}px` : "none" }}
            >
              {Array.from({ length: active.pages }, (_, i) => i + 1).map((n) => (
                <img
                  key={`${active.slug}-${n}`}
                  data-sheet-page={n}
                  src={pageUrl(active, n)}
                  alt={`${active.title} cheat sheet, page ${n} of ${active.pages}`}
                  width={3264}
                  height={2112}
                  loading={n <= 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="block h-auto w-full rounded-md bg-white shadow-lg ring-1 ring-zinc-950/10 dark:ring-white/10"
                />
              ))}
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};
