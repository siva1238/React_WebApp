import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as FcIcons from "react-icons/fc";

export const SideBarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: `/users`,
    icon: <FaIcons.FaRegUser />,
    cName: "nav-text",
  },
  {
    title: "Products",
    path: "/products",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "HOC",
    path: "/hoc",
    icon: <AiIcons.AiFillProfile />,
    cName: "nav-text",
  },
  {
    title: "ToDo List",
    path: "/todo",
    icon: <FcIcons.FcTodoList />,
    cName: "nav-text",
  },
  {
    title: "Features",
    path: "/features",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <AiIcons.AiOutlineLogout />,
    cName: "nav-text",
  },
];
