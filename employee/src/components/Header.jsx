//This is a modified header from tailwind. it will wrap all routes (see app.js)
//And render all wrapped compoenets as children (see end of component for render)

import { Fragment, useContext } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { LoginContex } from "../App"; // needed inport to access context

const navigation = [
  { name: "Employees", href: "/Employees" },
  { name: "Customers", href: "/Customers" },
  { name: "Dictionary", href: "/Dictionary" },
];

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({ children }) {
  const [loggedIn, changeLoggedIn] = useContext(LoginContex); //accessing context

  //will log user out and navigate back to the login page see ternary navlink below for func onClick func call
  let logOut = () => {
    console.log("logging out...");
    changeLoggedIn(false);
    localStorage.clear();
  };

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-14 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    {/* <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  /> */}
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) => {
                            return (
                              "px-3 py-2 rounded-md text-sm font-medium no-underline " +
                              (isActive
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white")
                            );
                          }}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                      {/* Login/logout link seperated from Navigation array for conditional rendering using contex */}
                      {loggedIn ? (
                        <NavLink
                          to={"/login"}
                          onClick={logOut}
                          className="px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-700 hover:text-white font-medium no-underline"
                        >
                          Logout
                        </NavLink>
                      ) : (
                        <NavLink
                          to={"/login"}
                          className="px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-700 hover:text-white font-medium no-underline"
                        >
                          Login
                        </NavLink>
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
            {/* Mobile nav link display */}
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => {
                      return (
                        "block rounded-md px-3 py-2 text-base font-medium no-underline " +
                        (isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white")
                      );
                    }}
                  >
                    {item.name}
                  </NavLink>
                  // end of mobile nav link display
                ))}
                {loggedIn ? (
                  <NavLink
                    to={"/login"}
                    onClick={logOut}
                    className="px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-700 hover:text-white font-medium no-underline"
                  >
                    Logout
                  </NavLink>
                ) : (
                  <NavLink
                    to={"/login"}
                    className="px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-700 hover:text-white font-medium no-underline"
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="bg-gray-300">
        <div className="max-w-7xl mx-auto min-h-screen px-3 py-2">
          {children}
        </div>
      </div>
      <footer className="text-white">Example</footer>
    </>
  );
}
