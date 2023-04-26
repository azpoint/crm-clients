import { Outlet, Link, useLocation } from "react-router-dom";

function Layout() {
    const location = useLocation();

    return (
        <div className="md:flex md:min-h-screen">
            <aside className="md:w-1/4 bg-blue-800 px-5 py-10">
                <h2 className="md:text-2xl lg:text-4xl font-bold text-center text-gray-100">
                    CRM - Clients
                </h2>

                <nav className="mt-10">
                    <Link
                        to="/"
                        className={`${
                            location.pathname === "/"
                                ? "text-blue-300"
                                : "text-gray-100"
                        } text-2xl block mt-2 hover:text-blue-300 text-gray-100`}
                    >
                        Clients
                    </Link>
                    <Link
                        to="/clients/new"
                        className={`${
                            location.pathname === "/clients/new"
                                ? "text-blue-300"
                                : "text-gray-100"
                        } text-2xl block mt-2 hover:text-blue-300 text-gray-100`}
                    >
                        New Clients
                    </Link>
                </nav>
            </aside>

            <main className="md:w-3/4 p-10 md:h-screen overflow-scroll">
                <Outlet />
            </main>
        </div>
    );
}
export default Layout;
