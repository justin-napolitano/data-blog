import React from "react";
import { NavLink, SocialMediaIcons } from "./atoms";
import pagelinks from "../data/pagelinks";
import { Link } from "gatsby";

const Footer = (_) => {
  return (
    <footer className="relative w-full h-56 text-secondary overflow-hidden bg-secondary">
      <div className="container h-full md:max-w-screen-md lg:max-w-screen-xl m-auto px-5 md:px-20 pb-12 pt-24">
        <div className="container flex-col justify-between md:space-y-8">
          <nav className="hidden lg:flex flex-row items-center space-x-6 justify-center md:justify-end text-sm">
            {pagelinks.map((link, i) => {
              return (
                <NavLink key={"linkitem" + i} to={link.url} title={link.label}>
                  {link.label}
                </NavLink>
              );
            })}
          </nav>
          <div className="flex flex-col-reverse md:flex-row md:justify-between space-y-reverse space-y-8 md:space-y-0">
            <span
              className="text-xs tracking-wider self-center md:self-end"
              aria-label="Copyright"
            >
              © 2020-present Victor Dibia. All Rights Reserved.{" "}
              <span className="text-accent hover:underline">
                <Link to="/privacy"> Privacy Policy</Link>
              </span>
            </span>
            <SocialMediaIcons iconsSize={8} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
