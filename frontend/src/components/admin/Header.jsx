function Header({ pageTitle }) {
    return (
        <header className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-200">
                {pageTitle}
            </h1>
        </header>
    )
}

export default Header;
