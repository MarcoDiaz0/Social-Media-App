import { Link, useLocation } from "react-router-dom";
import "../App.css";
import LogRejBtn from "./LogRejBtn";
import UserPLogOBtn from "./UserPLogOBtn";
export default function NavBar() {
  const { pathname: location } = useLocation();
  return (
    <div  className="bg-[#03012C] top-0 fixed text-white flex justify-between items-center w-full">
      <div className="flex p-2 text-2xl">
        {[
          { route: "/", title: "Home" },
          { route: "/profile", title: "Profile" },
          { route: "/settings", title: "Settings" },
        ].map(({ route, title }) => (
          <Link
            to={route}
            key={title}
            className={`m-2  duration-200 ${
              location === route && "sectionNow"
            }`}
          >
            {title}
          </Link>
        ))}
      </div>
      {localStorage.getItem("token") ? <UserPLogOBtn /> : <LogRejBtn />}
    </div>
  );
}
