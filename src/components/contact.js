import React from "react";
import { ExtLink } from "./atoms";
// import MailChimp from "./mailchimp";
import Revue from "./revue";

export const Contact = () => {
  return (
    <div className="mt-32 full-width-container bg-secondary ">
      <div className="m-auto px-10 md:px-20 container max-w-screen-xl mx-auto pt-16 text-gray-900">
        <h1 className="text-3xl font-semibold mb-3 text-primary">
          Join the Newsletter.
          <span role="img" aria-label="wave">
            {/* 👋 */}
          </span>
        </h1>
        {/* <MailChimp emailFieldID="footerform" /> */}
        <Revue formID="contact_form" />
        <p className="mt-4  text-secondary">
          Subscribe to get a monthly newsletter on Applied AI and HCI .
        </p>
        <p className="mt-1  text-secondary">
          Feel free to reach out!{" "}
          <ExtLink link="https://twitter.com/vykthur" newTab>
            Twitter
          </ExtLink>
          ,{" "}
          <ExtLink link="https://github.com/victordibia" newTab>
            GitHub
          </ExtLink>
          ,{" "}
          <ExtLink link="https://www.linkedin.com/in/dibiavictor/" newTab>
            LinkedIn
          </ExtLink>{" "}
        </p>
        .
      </div>
    </div>
  );
};

export default Contact;
