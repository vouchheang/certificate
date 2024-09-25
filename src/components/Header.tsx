"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface HeaderData {
  attributes: {
    logo: {
      data: {
        attributes: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
    navbar: {
      label: string;
      path: string;
    }[];
    button: {
      label: string;
      type: string;
      color: string;
    };
    language: {
      data: {
        attributes: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
  };
}

async function fetchheaderData(): Promise<{
  headerData: HeaderData[];
}> {
  try {
    const res1 = await fetch(
      "https://strapi-dev.seksa.today/api/headers?populate=*",
      {
        cache: "no-store",
      }
    );

    if (!res1.ok) {
      throw new Error("Network response was not ok");
    }

    const data1 = await res1.json();

    return { headerData: data1.data };
  } catch (error) {
    console.error("Error fetching home data:", error);
    return { headerData: [] };
  }
}
export default async function Header() {
  const { headerData } = await fetchheaderData();
  let isMenuOpen = false;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  };

  const handleLinkClick = () => {
    isMenuOpen = false;
    document.body.style.overflow = "auto";
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#FFFFFF] py-6 max-sm:py-4 shadow-sm z-50 max-sm:h-[4rem]">
      <div className="mx-auto flex items-center justify-between px-4">
        <div className="w-[140px] h-[25px]">
          <a href="/">
            <Image
              src={`https://strapi-dev.seksa.today${headerData[0].attributes.logo.data.attributes.url}`}
              alt="Logo"
              width={500}
              height={50}
              className="w-full h-auto"
            />
          </a>
        </div>
        <button
          className="sm:hidden text-[#717171] "
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
        >
          <FontAwesomeIcon
            icon={isMenuOpen ? faTimes : faBars}
            size="xl"
            className="max-md:ml-[1rem]"
          />
        </button>
        <nav
          id="primary-navigation"
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-col sm:flex sm:flex-row sm:space-x-6 font-Quicksand text-[16px] leading-[20px] font-bold 
            w-full sm:w-auto max-sm:mb-6 sm:mt-0 sm:justify-between sm:items-center
            absolute top-0 left-0 bg-white sm:static sm:bg-transparent z-40 sm:z-auto
            p-4 sm:p-0 sm:shadow-none shadow-lg transition-transform transform sm:translate-y-0
            ${
              isMenuOpen
                ? "h-screen translate-y-[4rem] overflow-hidden"
                : "-translate-y-full h-0"
            }`}
        >
          <a
            href={headerData[0]?.attributes.navbar[0].path}
            className="text-[#717171] px-4 py-2 sm:px-0 sm:py-0 text-center sm:text-left"
            onClick={handleLinkClick}
          >
            {headerData[0]?.attributes.navbar[0].label}
          </a>
          <a
            href={headerData[0]?.attributes.navbar[1].path}
            className="text-[#717171] px-4 py-2 sm:px-0 sm:py-0 text-center sm:text-left"
            onClick={handleLinkClick}
          >
            {headerData[0]?.attributes.navbar[1].label}
          </a>
          <a
            href={headerData[0]?.attributes.navbar[2].path}
            className="text-[#717171] px-4 py-2 sm:px-0 sm:py-0 text-center sm:text-left"
            onClick={handleLinkClick}
          >
            {headerData[0]?.attributes.navbar[2].label}
          </a>
          <div className="w-[1.5px] h-[30px] bg-[#EDEDED] mr-[20px]"></div>
          <Image
            src={`https://strapi-dev.seksa.today${headerData[0]?.attributes.language.data.attributes.url}`}
            width={33}
            height={40}
            alt="description"
          />

          <a href="/login">
            <button
              typeof={headerData[0]?.attributes.button.type}
              className={`bg-[${headerData[0]?.attributes.button.color}] text-white rounded-[6px] sm:w-[73px] h-[40px] px-2 py-1 sm:px-0 sm:py-0 mt-4 sm:mt-0 mx-auto sm:mx-0`}
              onClick={handleLinkClick}
            >
              {headerData[0]?.attributes.button.label}
            </button>
          </a>
        </nav>
      </div>
    </header>
  );
}
