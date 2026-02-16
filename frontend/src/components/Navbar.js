import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeuser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
function Navbar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const isAuthed = user && user !== "";

  function handleLogout() {
    dispatch(removeuser());
  }

  return (
    <div className="border shadow-xl w-full bg-white">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/">
          <h1 className="cursor-pointer text-2xl sm:text-3xl font-extrabold">
            myCrypto<span className="text-blue-700">Tracker</span>
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          {isAuthed && (
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center rounded-md border px-3 py-2 text-gray-700 hover:bg-gray-50"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              <span className="text-lg">{isOpen ? "Close" : "Menu"}</span>
            </button>
          )}

          {isAuthed && (
            <div className="hidden md:flex items-center gap-6 font-semibold text-lg">
              <Link to="/top10" className="hover:text-blue-600">
                Top10
              </Link>
              <Link to="/trending" className="hover:text-blue-600">
                Trending
              </Link>
              <Link to="/watchlist" className="hover:text-blue-600">
                Watchlist
              </Link>
            </div>
          )}

          <div className="hidden sm:flex items-center gap-3">
            {isAuthed ? (
              <button
                onClick={handleLogout}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg"
              >
                Log out
              </button>
            ) : (
              <>
                <Link to="/login">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
                    Login
                  </button>
                </Link>
                <Link to="/signin">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
                    Signin
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {isAuthed && (
        <div className={`${isOpen ? "block" : "hidden"} md:hidden px-4 pb-4`}>
          <div className="flex flex-col gap-3 font-semibold text-lg">
            <Link to="/top10" className="hover:text-blue-600">
              Top10
            </Link>
            <Link to="/trending" className="hover:text-blue-600">
              Trending
            </Link>
            <Link to="/watchlist" className="hover:text-blue-600">
              Watchlist
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={handleLogout}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg w-full"
            >
              Log out
            </button>
          </div>
        </div>
      )}

      {!isAuthed && (
        <div className="sm:hidden px-4 pb-4 flex flex-col gap-2">
          <Link to="/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg w-full">
              Login
            </button>
          </Link>
          <Link to="/signin">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg w-full">
              Signin
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
