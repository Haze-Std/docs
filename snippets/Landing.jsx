import SearchBar from '/snippets/components/SearchBar.jsx';
import Card from '/snippets/components/Card.jsx';


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
            title: "MDN | HTML",
            href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
            content: "The latest HTML specification, plus tutorials and references for HTML developers."
        },
        {
            title: "MDN | CSS",
            href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
            content: "The latest CSS specification, plus tutorials and references for CSS developers."
        },
        {
            title: "MDN | JavaScript",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
            content: "THE repository of facts about the JavaScript language"
        },
        {
            title: "React.js",
            href: "https://react.dev/reference/react",
            content: "Detailed reference documentation for working with React"
        },
        {
            title: "Next.js",
            href: "https://nextjs.org/docs",
            content: "Next.js is a React framework for building full-stack web applications."
        },
        {
            title: "Convex Docs",
            href: "https://docs.convex.dev/home",
            content: "Convex is the open source, reactive database where queries are TypeScript code running right in the database."
        },
        {
            title: "K8 Spec Explorer",
            href: "https://kubespec.dev/",
            content: "Find the documentation for all Kubernetes resources, properties, types, and examples."
        },
    ]

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
                                <Card title={item.title} href={item.href}>
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