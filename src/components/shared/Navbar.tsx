export default async function Navbar() {
    return (
        <div className="flex w-full items-center justify-center ">
            <nav className="flex w-[95%] items-center justify-between bg-gray-700 p-4">
                <h2 className="text-2xl font-bold">Gobadi</h2>
                <ul className="flex items-center gap-6">
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </nav>
        </div>
    );
}