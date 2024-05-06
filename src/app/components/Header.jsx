import Link from "next/link";

function Header() {
  return (
    <header className="flex items-center justify-between lg:justify-around w-full lg:h-[60px] md:h-[60px] h-[60px] bg-black text-white px-10">
      <Link className="text-xl cursor-pointer hover:text-gray-300 " href="/">
        JustMovies
      </Link>
      <Link
        className=" font-semibold cursor-pointer text-black hover:bg-gray-300 bg-white rounded p-1 pl-2 pr-2  "
        href="/Favorites"
      >
        Meus Filmes
      </Link>
    </header>
  );
}

export default Header;
