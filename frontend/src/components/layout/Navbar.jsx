import UserDropdown from "./UserDropdown";

function Navbar() {
    return (
        <header className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">

            <h1 className="text-xl font-bold text-blue-600">
                LAT BIOSKOP
            </h1>

            <UserDropdown />

        </header>
    );
}

export default Navbar;