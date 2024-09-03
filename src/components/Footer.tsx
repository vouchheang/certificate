function Footer() {
  return (
    <div className=" p-5 bg-[#00844C]">
      <p className="text-xs sm:text-sm md:te text-white">
        ©2023 Sala, Co. |{" "}
        <a href="https://www.sala.co/privacy-policy" className="underline">
          Privacy Policy
        </a>{" "}
        |{" "}
        <a href="https://www.sala.co/release-notes" className="underline">
          Release Notes
        </a>
      </p>
    </div>
  );
}

export default Footer;
