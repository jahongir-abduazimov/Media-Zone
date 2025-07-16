import { Link, useLocation } from "react-router-dom";
import {
  DashboardIcon,
  EmployeeIcon,
  IncomeExpenseIcon,
} from "../../assets/icons/icon";
import { LuLogOut, LuTrendingUpDown } from "react-icons/lu";
import LogoutModal from "../LogoutModal";
import { useState } from "react";
import { MdOutlineMeetingRoom } from "react-icons/md";
import Logo from "../../assets/img/logo.png"

const Aside = () => {
  const pathname = useLocation().pathname;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <LogoutModal
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
      />
      <div className="h-screen min-w-[272px] bg-white z-50 border-r border-[#E1E4EA] overflow-y-auto scrollbar-none pb-10">
        <div className="h-[88px] px-4 pt-[17px]">
          <div className="border-b border-[#E1E4EA] pb-4">
            <Link to={"/"} className="font-semibold text-4xl">
              <img src={Logo} alt="logo" width={200} />
            </Link>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex flex-col gap-2 pr-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-[6px] h-5 rounded-r-xl duration-200 ${
                  pathname === "/" ? "bg-[#8C52FE]" : "bg-white"
                }`}
              />
              <Link
                to="/"
                className={`flex rounded-lg duration-200 items-center gap-2 px-3 py-2 w-full ${
                  pathname === "/" ? "bg-[#F5F7FA]" : "hover:bg-[#F5F7FA]"
                }`}
              >
                <DashboardIcon
                  color={pathname === "/" ? "#8C52FE" : "#525866"}
                />
                <span
                  className={`text-base font-medium duration-200 ${
                    pathname === "/" ? "text-[#0E121B]" : "text-[#525866]"
                  }`}
                >
                  Dashboard
                </span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 pr-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-[6px] h-5 rounded-r-xl duration-200 ${
                  pathname === "/income-expense" ? "bg-[#8C52FE]" : "#fff"
                }`}
              />
              <Link
                to="/income-expense"
                className={`flex rounded-lg duration-200 items-center gap-2 px-3 py-2 w-full ${
                  pathname === "/income-expense"
                    ? "bg-[#F5F7FA]"
                    : "hover:bg-[#F5F7FA]"
                }`}
              >
                <IncomeExpenseIcon
                  color={pathname === "/income-expense" ? "#8C52FE" : "#525866"}
                />
                <span
                  className={`text-base font-medium duration-200 ${
                    pathname === "/income-expense"
                      ? "text-[#0E121B]"
                      : "text-[#525866]"
                  }`}
                >
                  Kirim-chiqim
                </span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 pr-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-[6px] h-5 rounded-r-xl duration-200 ${
                  pathname === "/clients" ? "bg-[#8C52FE]" : "#fff"
                }`}
              />
              <Link
                to="/clients"
                className={`flex rounded-lg duration-200 items-center gap-2 px-3 py-2 w-full ${
                  pathname === "/clients"
                    ? "bg-[#F5F7FA]"
                    : "hover:bg-[#F5F7FA]"
                }`}
              >
                <EmployeeIcon
                  color={pathname === "/clients" ? "#8C52FE" : "#525866"}
                />
                <span
                  className={`text-base font-medium duration-200 ${
                    pathname === "/clients"
                      ? "text-[#0E121B]"
                      : "text-[#525866]"
                  }`}
                >
                  Mijozlar
                </span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 pr-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-[6px] h-5 rounded-r-xl duration-200 ${
                  pathname === "/estimate" ? "bg-[#8C52FE]" : "#fff"
                }`}
              />
              <Link
                to="/estimate"
                className={`flex rounded-lg duration-200 items-center gap-2 px-3 py-2 w-full ${
                  pathname === "/estimate"
                    ? "bg-[#F5F7FA]"
                    : "hover:bg-[#F5F7FA]"
                }`}
              >
                <LuTrendingUpDown
                  color={pathname === "/estimate" ? "#8C52FE" : "#525866"}
                />
                <span
                  className={`text-base font-medium duration-200 ${
                    pathname === "/estimate"
                      ? "text-[#0E121B]"
                      : "text-[#525866]"
                  }`}
                >
                  Taxminiy hisob
                </span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 pr-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-[6px] h-5 rounded-r-xl duration-200 ${
                  pathname.slice(0, 6) === "/rooms" ? "bg-[#8C52FE]" : "#fff"
                }`}
              />
              <Link
                to="/rooms"
                className={`flex rounded-lg duration-200 items-center gap-2 px-3 py-2 w-full ${
                  pathname.slice(0, 6) === "/rooms"
                    ? "bg-[#F5F7FA]"
                    : "hover:bg-[#F5F7FA]"
                }`}
              >
                <MdOutlineMeetingRoom
                  color={pathname.slice(0, 6) === "/rooms" ? "#8C52FE" : "#525866"}
                />
                <span
                  className={`text-base font-medium duration-200 ${
                    pathname.slice(0, 6) === "/rooms"
                      ? "text-[#0E121B]"
                      : "text-[#525866]"
                  }`}
                >
                  Xonalar
                </span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 pr-4">
            <div className="flex items-center gap-3">
              <div className={`w-[6px] h-5 rounded-r-xl duration-200`} />
              <button
                onClick={() => {
                  setIsOpen(true);
                }}
                className={`flex rounded-lg duration-200 hover:bg-[#F5F7FA] items-center gap-2 px-3 py-2 w-full cursor-pointer`}
              >
                <LuLogOut className="rotate-180 text-[#525866] text-lg" />
                <span
                  className={`text-base font-medium text-[#525866] duration-200`}
                >
                  Chiqish
                </span>
              </button>
            </div>
          </div>
          {/* <Menu
          // onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={menu}
        /> */}
        </div>
      </div>
    </>
  );
};

export default Aside;
