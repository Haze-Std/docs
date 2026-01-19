import SearchBar from '/snippets/components/SearchBar.jsx';
// import { ArrowUpRight } from 'lucide-react';
// import Card from '/snippets/components/Card.jsx';


export const Landing = () => {

    const nav_cards = [
        {
            title: "React.js",
            href: "/docs/en/get-started",
            content: "Make your first API call in minutes."
        },
        {
            title: "Next.js",
            href: "/docs/en/api/overview",
            content: "Explore the advanced features and capabilities now available in Claude."
        },
        {
            title: "TypeScript",
            href: "/docs/en/about-claude/models/whats-new-claude-4-5",
            content: "Discover the latest advancements in Claude 4.5 models."
        },
    ]
    const resources_cards = [
        {
            title: "HTML",
            content: "The latest HTML specification, plus tutorials and references for HTML developers.",
            links: [
                {
                    title: "MDN",
                    href: "https://developer.mozilla.org/en-US/docs/Web/HTML"
                },
                {
                    title: "Devsheets",
                    href: "https://www.devsheets.io/sheets?technology=HTML"
                },
                {
                    title: "Devdocs",
                    href: "https://devdocs.io/html/"
                },
            ]
        },
        {
            title: "CSS",
            content: "The latest CSS specification, plus tutorials and references for CSS developers.",
            links: [
                {
                    title: "MDN",
                    href: "https://developer.mozilla.org/en-US/docs/Web/CSS"
                },
                {
                    title: "Devsheets",
                    href: "https://www.devsheets.io/sheets?technology=CSS"
                },
                {
                    title: "Devdocs",
                    href: "https://devdocs.io/css/"
                },
            ]
        },
        {
            title: "JavaScript",
            content: "The logic side of the web, for the most part",
            links: [
                {
                    title: "MDN",
                    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                },
                {
                    title: "Devsheets",
                    href: "https://www.devsheets.io/sheets?technology=JavaScript"
                },
                {
                    title: "Devdocs",
                    href: "https://devdocs.io/javascript/"
                },
            ]
        },
        {
            title: "TypeScript",
            content: "JavaScript but for the cool kids",
            links: [
                {
                    title: "TS Handbook",
                    href: "https://www.typescriptlang.org/docs/handbook/intro.html"
                },
                {
                    title: "Devsheets",
                    href: "https://www.devsheets.io/sheets?technology=TypeScript"
                },
                {
                    title: "Devdocs",
                    href: "https://devdocs.io/typescript/"
                },
                {
                    title: "TS + React",
                    href: "https://github.com/typescript-cheatsheets/react"
                },
                {
                    title: "TS Essentials Book",
                    href: "https://www.totaltypescript.com/books/total-typescript-essentials"
                },
            ]
        },
        {
            title: "React.js",
            content: "Detailed reference documentation for working with React",
            links: [
                {
                    title: "React Docs",
                    href: "https://react.dev/reference/react"
                },
                {
                    title: "Devsheets",
                    href: "https://www.devsheets.io/sheets?technology=React"
                },
                {
                    title: "Devdocs",
                    href: "https://devdocs.io/react/"
                },
            ]
        },
        {
            title: "Next.js",
            content: "Next.js is a React framework for building full-stack web applications",
            links: [
                {
                    title: "Nextjs Docs",
                    href: "https://nextjs.org/docs"
                },
                {
                    title: "Devsheets",
                    href: "https://www.devsheets.io/sheets?technology=Next.js"
                },
                {
                    title: "Devdocs",
                    href: "https://devdocs.io/nex"
                },
            ]
        },
        {
            title: "Convex",
            content: "Convex is the open source, reactive database where queries are TypeScript code running right in the database",
            links: [
                {
                    title: "Convex Docs",
                    href: "https://docs.convex.dev/home"
                },
            ]
        },
        {
            title: "Kubernetes",
            content: "Find the documentation for all Kubernetes resources, properties, types, and examples",
            links: [
                {
                    title: "K8 Spec Explorer",
                    href: "https://kubespec.dev/"
                },
                {
                    title: "K8 Docs",
                    href: "https://kubernetes.io/docs/reference/"
                },
                {
                    title: "kubectl",
                    href: "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands"
                },
                {
                    title: "Devdocs",
                    href: "https://devdocs.io/kubernetes/"
                },
            ]
        },
    ]

    /* COMPONENTS */
    const SearchBar = ({ placeholder }) => {
        return (
            <div className="relative max-w-xl mx-auto mb-20">
                <div className="relative">
                    <input
                        type="text"
                        placeholder={placeholder}
                        className="w-full px-5 py-3 pl-11 text-[15px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">
                        ⌘K
                    </div>
                </div>
            </div>
        );
    };


    const Card = ({ title, href, links, children, external }) => {
        return (
            <div
                className="group block p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors duration-200"
            >
                <div className="flex flex-col justify-between h-full">

                    {/* Title with external link arrow */}
                    <div className="">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            {title}
                            {/* {external && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3D3D3A" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                            )} */}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-[15px] leading-relaxed">
                            {children}
                        </p>
                    </div>

                    <div className="flex flex-row-reverse flex-wrap-reverse mt-6 gap-2">
                        {links.map(item => {
                            return (
                                <button className="
                                    inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-small transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive 
                                    border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 
                                    h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5">
                                    <a href={item.href} className="">{item.title}</a>
                                </button>
                            )
                        })}
                        {/* {links.map(item => {
                            return (
                                <button href={item.href} className="flex text-primary underline-offset-4 hover:underline">
                                    <p className="text-xs italic">{item.title}</p>
                                </button>
                            )
                        })} */}
                    </div>
                </div>
            </div >
        );
    };


    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-8 py-20">
                {/* Main Heading */}
                <div className="text-center mb-16">
                    <h1 className="text-[56px] leading-tight font-normal text-black mb-5" style={{ fontFamily: 'Georgia, serif' }}>
                        Zach Simms Docs
                    </h1>
                    <p className="text-[17px] text-gray-700 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                        I don't like to jump around for docs and my notes, so I'm putting it all here
                    </p>
                </div>

                {/* Search Bar */}
                {/* <SearchBar placeholder="Ask Claude about docs..." /> */}

                {/* Navigation Card Section */}
                {/* <section className="mb-20">
                    <h2 className="text-[32px] font-normal text-black mb-8 text-center" style={{ fontFamily: 'Georgia, serif' }}>
                        Top Sections
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {nav_cards.map(item => {
                            return (
                                <Card title={item.title} href={item.href}>
                                    {item.content}
                                </Card>
                            )
                        })}
                    </div>
                </section> */}

                {/* Resources Section */}
                <section className="mb-20">
                    <h2 className="text-[32px] font-normal text-black mb-8 text-center" style={{ fontFamily: 'Georgia, serif' }}>
                        Top Resources
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {resources_cards.map(item => {
                            return (
                                <Card title={item.title} links={item.links}>
                                    {item.content}
                                </Card>
                            )
                        })}
                    </div>
                </section>

                {/* Learning Resources Section */}
                {/* <section className="mb-20">
                    <h2 className="text-[32px] font-normal text-black mb-8 text-center" style={{ fontFamily: 'Georgia, serif' }}>
                        Learning resources
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <Card title="Anthropic Courses" href="https://anthropic.skilljar.com/" external>
                            Explore Anthropic's educational courses and projects.
                        </Card>
                        <Card title="Claude Cookbook" href="https://platform.claude.com/cookbooks">
                            See replicable code samples and implementations.
                        </Card>
                        <Card title="Claude Quickstarts" href="https://github.com/anthropics/anthropic-quickstarts" external>
                            Deployable applications built with our API.
                        </Card>
                    </div>
                </section> */}
            </div>

        </main>
    );
}