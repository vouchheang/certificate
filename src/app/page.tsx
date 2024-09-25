import Image from "next/image";
import React from "react";
import Background from "../images/background.png";
import Link from "next/link";
import Button from "../components/Button";

interface HomeData {
  attributes: {
    heading: string;
    subheading: string;
    sitemap: string;
    companyInfo: string;
    
    uploadbtn: {
      label: string;
      color: string;
    };
    paragraph: {
      heading: string;
      text: string;
    }[];
    sponsor1: {
      data: {
        attributes: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
    sponsor2: {
      data: {
        attributes: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
    sponsor3: {
      data: {
        attributes: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
    sponsor4: {
      data: {
        attributes: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
    sponsor5: {
      data: {
        attributes: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
    links: {
      label: string;
      path: string;
    }[];
  };
}
interface CardData {
  attributes: {
    card: {
      text: string;
      icon: {
        data: {
          attributes: {
            url: string;
            width: number;
            height: number;
          };
        };
      };
    }[];
  };
}
export async function fetchhomeData(): Promise<{
     homeData: HomeData[];
     cardData: CardData[];
   }> {
     try {
       const [res1, res2] = await Promise.all([
         fetch("https://strapi-dev.seksa.today/api/homes?populate=*", {
           next: { revalidate: 60 }, // Revalidate every 60 seconds
         }),
         fetch(
           "https://strapi-dev.seksa.today/api/homes?populate[card][populate]=*",
           { next: { revalidate: 60 } }
         ),
       ]);
       if (!res1.ok || !res2.ok) {
         throw new Error("Network response was not ok");
       }

       const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

       return { homeData: data1.data, cardData: data2.data };
     } catch (error) {
       console.error("Error fetching home data:", error);
       return { homeData: [], cardData: [] };
     }
   }
export default async function HomePage() {
  const { homeData, cardData } = await fetchhomeData();

  return (
    <div className="flex flex-col">
      <div
        className="bg-gray-50"
        style={{ backgroundImage: `url(${Background.src})` }}
      >
        <div className="w-full max-w-screen-xl px-4 py-10 mx-auto flex flex-col items-center mt-[3.5rem]">
          <div className="text-center max-md:mb-7 lg:mb-7 ">
            <h2 className="w-[75%] m-auto sm:text-2xl lg:text-2xl font-Quicksand text-gray-900 font-bold lg:space-y-4 max-md:text-1xl">
              {homeData[0]?.attributes.heading}
            </h2>
          </div>
          <div className="flex justify-center w-8/12 max-w-4xl bg-[#00844C] bg-opacity-10 rounded-md shadow-sm border-dashed border-green-500 border-2 p-6">
            <div className="flex flex-col items-center w-full max-w-lg">
              <Image
                src={`https://strapi-dev.seksa.today${cardData[0]?.attributes.card[3].icon.data.attributes.url}`}
                width={500}
                height={500}
                alt="Upload Icon"
                className="w-20 h-20"
              />
            
              <p className="text-[#00844C] font-bold text-sm text-center mt-4 w-[75%]">
                {cardData[0]?.attributes.card[3].text}
              </p>
              <div className="mt-4"><Button label="Upload"/></div>
            </div>
          </div>
        </div>

        <div className="w-full bg-[#F8F8F8] py-10">
          <div className="max-w-screen-xl px-4 mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-Quicksand text-[#000000] font-bold mb-4">
              {homeData[0]?.attributes.paragraph[0].heading}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-[#000000] mb-8">
              {homeData[0]?.attributes.paragraph[0].text}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mx-auto w-full max-w-screen-lg p-4">
              <div className="flex flex-col items-center rounded-md p-4 max-w-xs">
                <Image
                  src={`https://strapi-dev.seksa.today${cardData[0]?.attributes.card[0].icon.data.attributes.url}`}
                  width={500}
                  height={500}
                  alt="Secure Icon"
                  className="w-20 h-20 mb-2"
                />
                <p className="text-[#00844C] text-center w-[70%]">
                  {cardData[0]?.attributes.card[0].text}
                </p>
              </div>

              <div className="flex flex-col items-center rounded-md p-4 max-w-xs">
                <Image
                  src={`https://strapi-dev.seksa.today${cardData[0]?.attributes.card[1].icon.data.attributes.url}`}
                  width={500}
                  height={500}
                  alt="Save Time Icon"
                  className="w-20 h-20 mb-2"
                />
                <p className="text-[#00844C] text-center w-[70%]">
                  {cardData[0]?.attributes.card[1].text}
                </p>
              </div>

              <div className="flex flex-col items-center rounded-md p-4 max-w-xs">
                <Image
                  src={`https://strapi-dev.seksa.today${cardData[0]?.attributes.card[2].icon.data.attributes.url}`}
                  width={500}
                  height={500}
                  alt="Certification Icon"
                  className="w-20 h-20 mb-2"
                />
                <p className="text-[#00844C] text-center w-[70%]">
                  {cardData[0]?.attributes.card[2].text}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-white py-10 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-Quicksand text-[#222222] font-bold mb-4">
            {homeData[0]?.attributes.paragraph[1].heading}
          </h2>
          <p className="text-sm w-[45%] max-sm:w-[90%] m-auto sm:text-base lg:text-lg text-[#222222] mb-8">
            {homeData[0]?.attributes.paragraph[1].text}
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <Image
              src={`https://strapi-dev.seksa.today${homeData[0]?.attributes.sponsor1.data.attributes.url}`}
              width={500}
              height={500}
              alt="Sponsor 1"
              className="w-24 h-24"
            />
            <Image
              src={`https://strapi-dev.seksa.today${homeData[0]?.attributes.sponsor2.data.attributes.url}`}
              width={500}
              height={500}
              alt="Sponsor 2"
              className="w-24 h-24"
            />
            <Image
              src={`https://strapi-dev.seksa.today${homeData[0]?.attributes.sponsor3.data.attributes.url}`}
              width={500}
              height={500}
              alt="Sponsor 3"
              className="w-24 h-24"
            />
            <Image
              src={`https://strapi-dev.seksa.today${homeData[0]?.attributes.sponsor4.data.attributes.url}`}
              width={500}
              height={500}
              alt="Sponsor 4"
              className="w-24 h-24"
            />
            <Image
              src={`https://strapi-dev.seksa.today${homeData[0]?.attributes.sponsor5.data.attributes.url}`}
              width={500}
              height={500}
              alt="Sponsor 5"
              className="w-24 h-24"
            />
          </div>
        </div>
      </div>
      <footer className="w-[18] bg-white border-t border-[#E7E7E7] py-10">
        <div className="max-w-screen-xl px-4 mx-auto flex flex-row sm:flex-row justify-between">
          <div className="text-left ml-[1rem] space-y-4 mt-[0.2rem]">
            <h4 className="text-lg sm:text-xl font-Quicksand text-gray-[#222222] lg:opacity-40 font-bold max-sm:text-gray-400">
              {homeData[0]?.attributes.sitemap}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={homeData[0]?.attributes.links[0].path}
                  className="text-[#00844C] hover:text-[#005a40]"
                >
                  {homeData[0]?.attributes.links[0].label}
                </a>
              </li>
              <li>
                <Link
                  href={homeData[0]?.attributes.links[1].path}
                  className="text-[#00844C] hover:text-[#005a40]"
                  scroll={false}
                >
                  {homeData[0]?.attributes.links[1].label}
                </Link>
              </li>
              <li>
                <a
                  href={homeData[0]?.attributes.links[2].path}
                  target="_blank"
                  className="text-[#00844C] hover:text-[#005a40]"
                >
                  {homeData[0]?.attributes.links[2].label}
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4 mr-[2rem]  lg:mr-[13rem]">
            <h4 className="text-lg sm:text-xl font-Quicksand text-[#222222] font-bold lg:opacity-40 max-sm:text-gray-400">
              {homeData[0]?.attributes.companyInfo}
            </h4>
            <ul className="space-y-2 ">
              <li>
                <a
                  href={homeData[0]?.attributes.links[3].path}
                  className="text-[#00844C] hover:text-[#005a40]"
                >
                  {homeData[0]?.attributes.links[3].label}
                </a>
              </li>
              <li>
                <a
                  href={homeData[0]?.attributes.links[4].path}
                  className="text-[#00844C] hover:text-[#005a40]"
                >
                  {homeData[0]?.attributes.links[4].label}
                </a>
              </li>
              <li>
                <a
                  href={homeData[0]?.attributes.links[5].path}
                  className="text-[#00844C] hover:text-[#005a40]"
                >
                  {homeData[0]?.attributes.links[5].label}
                </a>
              </li>
              <li>
                <a
                  href={homeData[0]?.attributes.links[6].path}
                  target="_blank"
                  className="text-[#00844C] hover:text-[#005a40]"
                >
                  {homeData[0]?.attributes.links[6].label}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
