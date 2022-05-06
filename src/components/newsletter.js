import * as React from "react"


const newsletter = ({formID, url}) => {

    return (
        <div id={formID} className=" inline-block">
            <div id="revue-embed">
            <form
                action= {url}
                method="post"
                id="revue-form"
                name="revue-form"
                target="_blank">
                <div className="revue-form-group">
                <input
                    placeholder="email@example.com"
                    type="email"
                    name="member[email]"
                    id="member_email"
                ></input>
                </div>

                <div className="revue-form-actions">
                <button
                    type="submit"
                    onClick={subscribeClick}
                    name="member[subscribe]"
                    id="member_submit">
                    Subscribe
                </button>
                </div>
            </form>
            </div>
        </div>
    )
}


function subscribeClick(e) {
    e.preventDefault();
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

export default newsletter