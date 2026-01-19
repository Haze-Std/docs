export default Card = ({ title, href, children, external }) => {
  return (
    <a
      href={href}
      className="group block p-8 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors duration-200"
    >
      <div>
        {/* Icon */}
        {/* <div className="mb-3 text-2xl">
          {icon}
        </div> */}

        {/* Title with external link arrow */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          {title}
          {external && (
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          )}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-[15px] leading-relaxed">
          {children}
        </p>
        <p>Hello</p>
      </div>
    </a>
  );
};
