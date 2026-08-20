import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logoSvg from '../assets/keepcodein.svg';
import { CiSearch } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { GrServices } from "react-icons/gr";
import { AiFillPieChart } from "react-icons/ai";
import { MdAutoGraph } from "react-icons/md";
import { GrContactInfo } from "react-icons/gr";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Why Us", href: "#why-choose-us" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const NAV_ICONS = {
  "Home": IoHomeOutline,
  "Services": GrServices,
  "Case Studies": AiFillPieChart,
  "Why Us": MdAutoGraph,
  "About": IoHomeOutline,
  "Contact": GrContactInfo,
};

export default function Header() {
  return (
    <Disclosure as="nav" className="bg-[#110D2E] w-full z-50 fixed top-0">
      {({ open, close }) => (
        <>
          <div className="mx-auto container px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between gap-2">
              <div className="shrink-0">
                <img className="block h-10 w-auto" src={logoSvg} alt="Keepcodein logo" />
              </div>

              <div className="hidden xl:flex flex-1 justify-center px-2">
                <div className="p-[1px] relative bg-[#110D2E] opacity-60 rounded-full w-full max-w-sm bg-gradient-to-r from-[#FC466B] to-[#3F5EFB]">
                  <input className="px-3 2xl:py-2 py-1 w-full text-[#3F5EFB] border-none rounded-full bg-inherit focus:outline-none" type="text" placeholder="Search..." aria-label="Search" />
                  <button type="button" className="absolute right-0 top-0 2xl:mt-3 mt-2 mr-4">
                    <CiSearch className="h-5 w-5 fill-current text-white" />
                  </button>
                </div>
              </div>

              <div className="hidden lg:flex items-center">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-md px-3 py-2 font-medium text-sm 2xl:text-lg text-gray-300 hover:text-[#6318F1] hover:scale-105 duration-200 whitespace-nowrap"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="hidden lg:block shrink-0">
                <a
                  href="#contact"
                  className="text-nowrap 2xl:px-6 px-3 py-2 bg-[#6318F1] text-xs xl:text-sm text-white font-bold rounded-full transition-transform hover:shadow-lg hover:bg-gradient-to-r hover:from-[#FC466B]/40 hover:to-[#3F5EFB]/40 hover:scale-105 duration-150"
                >
                  Apply Now
                </a>
              </div>

              <div className="lg:hidden shrink-0">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden bg-[#080326] mx-4 py-4 pb-8 bg-gradient-to-r from-[#FC466B]/10 to-[#3F5EFB]/10">
            <div className="space-y-3 flex flex-col px-6 pt-2">
              {NAV_LINKS.map((link) => {
                const Icon = NAV_ICONS[link.label];
                return (
                  <Disclosure.Button
                    key={link.href}
                    as="a"
                    href={link.href}
                    onClick={close}
                    className="block rounded-md px-6 py-4 bg-gradient-to-r from-[#FC466B]/5 to-[#3F5EFB]/5 text-base font-medium text-gray-300 hover:bg-gradient-to-r hover:from-[#FC466B] hover:to-[#3F5EFB] hover:opacity-60"
                  >
                    <div className="flex gap-x-3">
                      <Icon size={25} />
                      <span className="text-xl">{link.label}</span>
                    </div>
                  </Disclosure.Button>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
