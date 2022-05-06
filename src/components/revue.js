import React, { useEffect, useState } from "react";
import { ExtLink } from "./atoms";
// import { ExtLink } from "./atoms";
// import addToMailchimp from "gatsby-plugin-mailchimp";
import { LinkIcon } from "./icons";

export const Revue = ({ formID = "contact_form" }) => {
  const loadDuration = 800;
  const [currentForm, setCurrentForm] = useState(null);

  useEffect(() => {
    setCurrentForm(document.getElementById(formID));
  }, [formID]);

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function submitSubscription() {
    const email = currentForm.querySelector("#member_email").value;
    const isEmailValid = validateEmail(email);
    const emailError = currentForm.querySelector("#email_error");
    const subSuccess = currentForm.querySelector("#subscribe_success");
    const subLoading = currentForm.querySelector("#subscribe_loading");
    const revueForm = currentForm.querySelector("#revue-form");

    if (isEmailValid) {
      subLoading.classList.remove("hidden");
      emailError.classList.add("hidden");
      setTimeout(() => {
        subLoading.classList.add("hidden");
        subSuccess.classList.remove("hidden");
        revueForm.submit();
      }, loadDuration);
    } else {
      subLoading.classList.remove("hidden");
      setTimeout(() => {
        resetViews();
        emailError.classList.remove("hidden");
      }, loadDuration);
    }
  }

  function resetViews() {
    currentForm.querySelector("#subscribe_success").classList.add("hidden");
    currentForm.querySelector("#subscribe_loading").classList.add("hidden");
    currentForm.querySelector("#email_error").classList.add("hidden");
  }

  function subscribeClick(e) {
    e.preventDefault();
    resetViews();
    submitSubscription();
  }

  return (
    <div className=" ">
      <div id={formID} className=" inline-block">
        <div id="revue-embed">
          <form
            action="https://www.getrevue.co/profile/victordibia/add_subscriber"
            method="post"
            id="revue-form"
            name="revue-form"
            target="_blank"
            className="inline-block  "
          >
            <div className="revue-form-group inline-block">
              <input
                placeholder="email@example.com"
                className={
                  " w-60 border revue-form-field shadow-lg text-gray-800 px-3 focus:outline-none p-2 rounded-sm rounded-r-none"
                }
                type="email"
                name="member[email]"
                id="member_email"
              ></input>
            </div>

            <div className="revue-form-actions inline-block">
              <button
                className="mt-2 shadow-lg duration-500 hover:bg-green-900 hover:border-green-900 bg-green-700 px-4 py-2 border border-green-700 focus:outline-none  text-white   rounded-sm rounded-l-none "
                type="submit"
                onClick={subscribeClick}
                name="member[subscribe]"
                id="member_submit"
              >
                <span className="mr-2 ">
                  <span className="hidden" id="subscribe_loading">
                    {" "}
                    <LinkIcon icon="loading" />{" "}
                  </span>{" "}
                  Subscribe
                </span>
              </button>
            </div>
            <div className="text-primary text-sm mt-1">
              {" "}
              Powered by Revue.{" "}
              <span className="text-xs">
                {" "}
                <ExtLink link="https://www.getrevue.co/privacy" newTab>
                  Privacy Policy.
                </ExtLink>
              </span>{" "}
            </div>
          </form>
        </div>
        <span id="email_error" className="hidden">
          <div className=" text-left p-2 mt-3 rounded-sm block text-red-500 border border-red-500  text-sm">
            Please provide a valid email address.
          </div>
        </span>
        <span id="subscribe_success" className="hidden">
          <div className=" text-left p-2 mt-3 rounded-sm block text-green-500 border border-green-500  text-sm">
            Thanks for subscribing!.
          </div>
        </span>
      </div>
    </div>
  );
};

export default Revue;
