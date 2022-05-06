import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { LinkIcon } from "./icons";
import countBy from "lodash/countBy";
import sortBy from "lodash/sortBy";
import { kebabCase } from "lodash";

export const NavLink = ({ to, children, title = "Link", selected = false }) => {
  const textColor = selected ? "text-accent" : "text-secondary";
  const style = `font-normal  hover:text-accent transition duration-150 ${textColor}`;
  return (
    <Link to={to} title={title}>
      <span className={style}>{children}</span>
    </Link>
  );
};

export const useScript = (src) => {
  // Keep track of script status ("idle", "loading", "ready", "error")
  const [status, setStatus] = useState(src ? "loading" : "idle");

  useEffect(
    () => {
      // Allow falsy src value if waiting on other data needed for
      // constructing the script URL passed to this hook.
      if (!src) {
        setStatus("idle");
        return;
      }

      // Fetch existing script element by src
      // It may have been added by another intance of this hook
      let script = document.querySelector(`script[src="${src}"]`);

      if (!script) {
        // Create script
        script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.setAttribute("data-status", "loading");
        // Add script to document body
        document.body.appendChild(script);

        // Store status in attribute on script
        // This can be read by other instances of this hook
        const setAttributeFromEvent = (event) => {
          script.setAttribute(
            "data-status",
            event.type === "load" ? "ready" : "error"
          );
        };

        script.addEventListener("load", setAttributeFromEvent);
        script.addEventListener("error", setAttributeFromEvent);
      } else {
        // Grab existing script status from attribute and set to state.
        setStatus(script.getAttribute("data-status"));
      }

      // Script event handler to update status in state
      // Note: Even if the script already exists we still need to add
      // event handlers to update the state for *this* hook instance.
      const setStateFromEvent = (event) => {
        setStatus(event.type === "load" ? "ready" : "error");
      };

      // Add event listeners
      script.addEventListener("load", setStateFromEvent);
      script.addEventListener("error", setStateFromEvent);

      // Remove event listeners on cleanup
      return () => {
        if (script) {
          script.removeEventListener("load", setStateFromEvent);
          script.removeEventListener("error", setStateFromEvent);
        }
      };
    },
    [src] // Only re-run effect if script src changes
  );

  return status;
};

export const SocialMediaIcons = ({ iconSize = 8 }) => {
  iconSize = " h-" + iconSize + " w-" + iconSize + " ";
  return (
    <div className="flex flex-row items-center space-x-4 justify-center  ">
      {/* <span>
      <a
        href="mailto:hey@jeffjadulco.com"
        aria-label="Email hey@jeffjadulco.com"
        title="Email"
      >
        <svg
          aria-hidden="true"
          className="h-8 w-8 text-secondary hover:text-accent transition duration-300"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
        >
          <path d="M25 5H5a2.497 2.497 0 00-2.487 2.5l-.013 15C2.5 23.875 3.625 25 5 25h20c1.375 0 2.5-1.125 2.5-2.5v-15C27.5 6.125 26.375 5 25 5zm-.5 5.313l-8.838 5.524c-.4.25-.925.25-1.325 0L5.5 10.314a1.063 1.063 0 111.125-1.8L15 13.75l8.375-5.238a1.062 1.062 0 111.125 1.8z" />
        </svg>
      </a>
    </span> */}
      <span>
        <a
          href="https://twitter.com/vykthur"
          aria-label="Visit Twitter profile"
          title="Visit Twitter profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            aria-hidden="true"
            className={
              iconSize +
              " text-secondary hover:text-accent transition duration-500"
            }
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
          >
            <path d="M15 1.875C7.752 1.875 1.875 7.752 1.875 15S7.752 28.125 15 28.125 28.125 22.248 28.125 15 22.248 1.875 15 1.875zm6.308 9.894c.008.137.008.28.008.421 0 4.301-3.275 9.255-9.26 9.255a9.228 9.228 0 01-4.998-1.459c.263.03.515.041.785.041a6.528 6.528 0 004.04-1.388 3.255 3.255 0 01-3.041-2.256c.5.073.952.073 1.468-.059a3.251 3.251 0 01-2.605-3.193v-.041c.43.243.938.392 1.468.413a3.255 3.255 0 01-1.45-2.707c0-.606.158-1.16.442-1.64a9.237 9.237 0 006.709 3.4c-.46-2.211 1.192-4.001 3.179-4.001.937 0 1.781.392 2.376 1.025a6.427 6.427 0 002.065-.782 3.239 3.239 0 01-1.43 1.79 6.438 6.438 0 001.875-.507 6.821 6.821 0 01-1.631 1.688z" />
          </svg>
        </a>
      </span>
      <span>
        <a
          href="https://github.com/victordibia"
          aria-label="Visit GitHub profile"
          title="Visit GitHub profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            aria-hidden="true"
            className={
              iconSize +
              " text-secondary hover:text-accent transition duration-500"
            }
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
          >
            <path d="M14.988 2.235C7.743 2.232 1.875 8.098 1.875 15.337c0 5.724 3.67 10.59 8.783 12.378.689.173.583-.317.583-.65v-2.271c-3.975.466-4.137-2.165-4.403-2.605-.54-.92-1.814-1.154-1.433-1.593.906-.466 1.828.117 2.898 1.696.773 1.145 2.282.952 3.047.762a3.695 3.695 0 011.016-1.781c-4.119-.739-5.836-3.253-5.836-6.24 0-1.451.478-2.784 1.415-3.86-.597-1.772.056-3.29.144-3.515 1.702-.152 3.471 1.219 3.61 1.327.966-.26 2.07-.398 3.307-.398 1.242 0 2.35.143 3.325.407.331-.252 1.972-1.43 3.554-1.286.085.226.723 1.708.16 3.457.95 1.078 1.433 2.423 1.433 3.876 0 2.994-1.728 5.51-5.859 6.237a3.733 3.733 0 011.116 2.666v3.296c.024.264 0 .525.44.525 5.188-1.75 8.924-6.65 8.924-12.425 0-7.242-5.872-13.105-13.11-13.105z" />
          </svg>
        </a>
      </span>
      <span>
        <a
          href="https://www.linkedin.com/in/dibiavictor/"
          aria-label="Visit LinkedIn profile"
          title="Visit LinkedIn profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            aria-hidden="true"
            className={
              iconSize +
              " text-secondary hover:text-accent transition duration-500"
            }
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <path d="M27.5 3.5h-23c-.553 0-1 .447-1 1v23c0 .553.447 1 1 1h23c.553 0 1-.447 1-1v-23c0-.553-.447-1-1-1zM10.916 24.803h-3.71V12.872h3.71v11.931zM9.062 11.241a2.15 2.15 0 110-4.301 2.15 2.15 0 010 4.3zm15.741 13.562h-3.706V19c0-1.384-.025-3.162-1.928-3.162-1.928 0-2.225 1.506-2.225 3.062v5.903H13.24V12.872h3.556v1.631h.05c.494-.937 1.703-1.928 3.51-1.928 3.756 0 4.446 2.472 4.446 5.684v6.544z" />
          </svg>
        </a>
      </span>

      {/* <span>
      <a
        href="https://www.instagram.com/jeffjadulco/"
        aria-label="Visit Instagram profile"
        title="Visit Instagram profile"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          aria-hidden="true"
          className="h-8 w-8 text-secondary hover:text-accent transition duration-300"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
        >
          <path d="M16 11.834A4.174 4.174 0 0011.834 16 4.174 4.174 0 0016 20.166 4.174 4.174 0 0020.166 16 4.174 4.174 0 0016 11.834zM28.494 16c0-1.725.015-3.434-.081-5.156-.097-2-.554-3.775-2.016-5.238-1.466-1.465-3.238-1.919-5.238-2.015-1.725-.097-3.434-.082-5.156-.082-1.725 0-3.434-.015-5.156.082-2 .096-3.775.553-5.238 2.015-1.465 1.466-1.918 3.238-2.015 5.238-.097 1.725-.081 3.434-.081 5.156 0 1.722-.016 3.434.08 5.156.098 2 .554 3.775 2.016 5.238 1.466 1.465 3.238 1.919 5.238 2.015 1.725.097 3.434.082 5.156.082 1.725 0 3.434.015 5.156-.082 2-.096 3.775-.553 5.238-2.015 1.466-1.466 1.919-3.238 2.016-5.238.1-1.722.08-3.431.08-5.156zM16 22.41A6.4 6.4 0 019.59 16 6.4 6.4 0 0116 9.59 6.4 6.4 0 0122.41 16 6.4 6.4 0 0116 22.41zm6.672-11.585a1.495 1.495 0 01-1.497-1.497c0-.828.669-1.497 1.497-1.497a1.495 1.495 0 011.383 2.07 1.495 1.495 0 01-1.383.924z" />
        </svg>
      </a>
    </span> */}
    </div>
  );
};

export const postJSONData = (url, authToken, postData) => {
  console.log(url, authToken, postData);
  return fetch(url, {
    method: "post",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + authToken,
    },
  })
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return Promise.reject(response.status);
      }
      return response.json().then(function (data) {
        return data;
      });
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
};
export const PreviousNext = ({ previous, next }) => {
  return (
    <div className="flex mt-10">
      <div className="flex-1  no-underline">
        {next && (
          <Link className="no-underline" to={next.fields.slug} rel="next">
            <span className="border no-underline  p-2 mr-2 "> ← Previous </span>
          </Link>
        )}
      </div>
      <div className="flex-1 text-right no-und">
        {previous && (
          <Link className="no-und" to={previous.fields.slug} rel="prev">
            <span className="border p-2 mr-2 no-und"> Next → </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export const BlogTitle = ({ children }) => {
  return (
    <h1
      id="introduction"
      className="text-2xl font-bold text-accent tracking-tight"
    >
      {children}
    </h1>
  );
};

export const BlogTitleInfo = ({ timeToRead, date, datetime }) => {
  return (
    <div className="mb-2 text-sm text-tertiary tracking-normal">
      <span>
        <time dateTime={datetime}>{date}</time>
      </span>
      <span> • </span>
      <span>{timeToRead} minute read</span>
    </div>
  );
};

export const Heading = ({ children }) => {
  return (
    <h2 className="relative mt-12 mb-3 text-2xl font-bold text-accent">
      {children}
    </h2>
  );
};

export const LinksList = ({ links }) => {
  const linksList = links?.map((link, i) => {
    return (
      <a
        key={i + "linkrow"}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mr-2 text-accent  hover:text-secondary"
      >
        {" "}
        <LinkIcon icon={link.label.toLocaleLowerCase()} />
        {link.label}
      </a>
    );
  });

  return <>{linksList}</>;
};

export const SubString = ({ text, textLength }) => {
  return (
    <>
      {text.substring(0, textLength) +
        (textLength < text.length ? " ... " : "")}
    </>
  );
};

export const SubHeading = ({ children }) => {
  return (
    <h2 className="relative mt-6 mb-2 text-lg font-semibold text-primary">
      {children}
    </h2>
  );
};

export const Paragraph = ({ children }) => {
  return (
    <p className=" max-w-screen-md mb-4 font-normal text-base leading-relaxed md:leading-normal text-tertiary">
      {children}
    </p>
  );
};

export const Strong = ({ children }) => {
  return <strong className="font-semibold text-accent">{children}</strong>;
};

export const ExtLink = ({ children, link, title, newTab }) => {
  if (newTab) {
    return (
      <a
        titlee={title}
        href={link}
        className="text-accent hover:text-accent hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  } else {
    return (
      <a
        href={link}
        className="font-medium text-accent hover:text-accent hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
};

export const ProjectLink = ({ label, url }) => {
  return (
    <span className="font-medium text-tertiary hover:text-accent">
      <a href={url} target="_blank" rel="noopener noreferrer">
        {label}
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="inline-block w-4 h-4 mb-1"
        >
          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
        </svg>
      </a>
    </span>
  );
};

export const Button = ({ children, link, width }) => {
  let padding = "px-4 py-2";

  if (width === "wide") {
    padding = "px-8 py-2";
  } else if (width === "wider") {
    padding = "px-16 py-2";
  } else if (width === "widest") {
    padding = "px-20 py-2";
  }

  const className = `${padding} rounded accent-gradient text-on-accent`;

  return (
    <a
      className={className}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export const MonthName = (monthIndex) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[(monthIndex - 1) % monthNames.length];
};

export const Separator = () => {
  return (
    <div className="mt-8 mb-6">
      <span className="separatorline"></span>
    </div>
  );
};

export const Callout = ({ children, title = null }) => {
  return (
    <aside className="relative bg-secondary border-l-2 mt-4 border-accent pl-5 pr-3 py-2 pb-2 rounded-r text-base">
      <span className="-ml-10 mt-5 absolute  text-accent ">
        <div
          style={{ paddingTop: "3px" }}
          className="  rounded-full h-10 w-10 pl-2  bg-primary   border-accent border-2  "
        >
          <LinkIcon icon="info" />
        </div>
      </span>
      <div className="ml-2">
        {title && <div className="font-semibold mt-1">{title}</div>}
        {children}
      </div>
    </aside>
  );
};

export const Highlight = ({ children }) => {
  return <span className=" border-accent border-b  px-1">{children}</span>;
};

export const CalloutLink = ({ title = "", link = "", description = null }) => {
  return (
    <div className="rounded p-2 px-3 bg-secondary">
      <div className="">
        <span className="text-accent">
          <LinkIcon icon="linklite" />{" "}
        </span>
        <ExtLink link={link}>{title}</ExtLink>
      </div>
      <div className="text-sm mt-1 text-normal">{description}</div>
    </div>
  );
};

export const CalloutQuote = ({ children, sourceUrl, sourceText }) => {
  return (
    // <aside className=" bg-secondary  pl-3 pr-3 py-2 pb-2 rounded  text-base">
    //   <div className="flex flex-row">
    //     <div className="text-3xl text-accent mr-2">&ldquo;</div>
    //     <div className="flex-grow">{children}</div>
    //     <div className="text-3xl text-accent ml-2   flex flex-col">
    //       <div className="flex-grow"></div>
    //       <div className=" ">&rdquo;</div>
    //     </div>
    //   </div>

    //   {sourceUrl && (
    //     <div>
    //       {" "}
    //       Source :{" "}
    //       <ExtLink link={sourceUrl} newTab>
    //         {sourceText}
    //       </ExtLink>{" "}
    //     </div>
    //   )}
    // </aside>
    <aside className="relative mt-4 border-accent bg-secondary  border-l-2   pl-5 pr-3 py-2 pb-2 rounded-r text-base">
      <span className="-ml-10 mt-5 absolute  text-accent ">
        <div
          style={{ paddingTop: "3px" }}
          className="  rounded-full h-10 w-10 pl-3  bg-primary   border-accent border-2   items-center   "
        >
          <LinkIcon icon="quote" size={3} />
        </div>
      </span>
      <div className="ml-2">{children}</div>
      {sourceUrl && (
        <div className="ml-2 mt-2 text-sm">
          {" "}
          Source :{" "}
          <ExtLink link={sourceUrl} newTab>
            {sourceText}
          </ExtLink>
          .{" "}
        </div>
      )}
    </aside>
  );
};

export const CalloutOrange = ({ children }) => {
  return (
    <aside className="relative mt-4 border-yellow-500 bg-secondary  border-l-2   pl-5 pr-3 py-2 pb-2 rounded-r text-base">
      <span className="-ml-10 mt-5 absolute  text-yellow-500 ">
        <div
          style={{ paddingTop: "1px" }}
          className="  rounded-full h-10 w-10 pl-2 bg-primary   border-yellow-500 border-2   items-center   "
        >
          <LinkIcon icon="warning" />
        </div>
      </span>
      <div className="ml-2">{children}</div>
    </aside>
  );
};

export const ArrowMore = ({ children, link, size = "lg" }) => {
  return (
    <div
      className={"  inline-block pr-3 group  hover:text-accent text-" + size}
    >
      <Link to={link}>
        {" "}
        <span className="transition pgroup-hover:inline hidden">-</span>
        {"->"}
        <span className="ml-1 transition inline-block transform duration-500 group-hover:translate-x-3 ">
          {children}
        </span>
      </Link>{" "}
    </div>
  );
};

export const Blob = (_) => {
  return (
    <div aria-hidden="true">
      <div className="relative blob h-48 md:h-56 lg:h-64">
        <svg
          className="blob-rotate-faster h-full text-fill-primary fill-current"
          viewBox="0 0 278 279"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M137.896 0.127761C167.59 -0.638578 198.383 1.62824 222.877 18.4301C247.738 35.4836 263.129 63.014 271.706 91.9151C280.118 120.258 280.513 150.661 270.364 178.43C260.457 205.538 239.342 225.92 216.353 243.372C192.903 261.174 167.336 278.631 137.896 278.994C108.28 279.358 81.0666 263.928 58.0226 245.322C35.8955 227.455 20.5343 203.415 11.0775 176.594C1.41508 149.191 -4.23875 119.749 3.91245 91.8587C12.2111 63.4638 31.6331 39.4483 56.0438 22.7357C79.9856 6.34414 108.89 0.876363 137.896 0.127761Z" />
        </svg>
      </div>
    </div>
  );
};

export const countAndSort = (arr) => {
  arr = countBy(arr);
  arr = sortBy(
    Object.keys(arr).map((x) => ({ name: x, value: arr[x] })),
    "value"
  ).reverse();
  return arr;
};

export const BlobHeader = (_) => {
  return (
    <div aria-hidden="true">
      <div className="blob-bg absolute">
        <svg
          className="block m-auto  h-64 text-fill-secondary fill-current"
          viewBox="0 0 109 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="victor-logo"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="blob"
              transform="translate(0.057751, 0.303370)"
              className="text-fill-secondary fill-current"
              fillRule="nonzero"
            >
              <path
                d="M208,0 L208,25.7566303 L55.7733942,25.9141779 L53.4800348,27.446196 L53.4800348,28.7677967 L53.0247511,29.2066311 L37.0145443,29.2066566 L36.708,29.607 L36.7096684,29.6193501 L36.749433,29.6330497 C36.7771841,29.6427037 36.7913404,29.6716094 36.7810596,29.6976281 L36.7810596,29.6976281 L36.7573858,29.7577799 L36.7573858,29.8934364 C36.7573879,29.902398 36.7548337,29.9111972 36.7499879,29.9189224 L36.7499879,29.9189224 L36.7324174,29.9470084 L36.7477684,30.0489458 C36.7492969,30.0590261 36.7475234,30.0693038 36.7426825,30.0784184 L36.7426825,30.0784184 L36.6695342,30.2155482 C36.6641004,30.2257402 36.6551334,30.2338993 36.6441035,30.2386877 L36.6441035,30.2386877 L36.3983031,30.345305 L36.2963025,30.449669 C36.2929648,30.4530958 36.2891369,30.4560729 36.284928,30.4585154 L36.284928,30.4585154 L36.2148314,30.4989944 L36.2004052,30.5101741 L36.2348061,30.6141048 C36.2364026,30.618932 36.2372133,30.6239573 36.2372107,30.6290111 L36.2372107,30.6290111 L36.2372107,30.816853 C36.2371991,30.8356517 36.2259967,30.852873 36.2081733,30.8614918 L36.2081733,30.8614918 L35.9608009,30.9811155 C35.9642456,30.9906321 35.9645676,31.0008981 35.9617255,31.0105881 L35.9617255,31.0105881 L35.9066101,31.1984233 C35.9043442,31.2061089 35.9001601,31.213179 35.8944032,31.2190494 L35.8944032,31.2190494 L35.7941596,31.3215068 C35.7919848,31.3237249 35.7896017,31.3257553 35.787039,31.3275733 L35.787039,31.3275733 L35.4131599,31.5924733 C35.4072009,31.5966982 35.4003658,31.5997091 35.3930927,31.6013131 L35.3930927,31.6013131 L35.2387508,31.6352055 C35.2322942,31.636611 35.2256156,31.6368823 35.2190535,31.6360055 L35.2190535,31.6360055 L35.0420551,31.6126928 L34.8559015,31.6920841 C34.8406281,31.6986256 34.8229675,31.6980828 34.8081841,31.6906175 L34.8081841,31.6906175 L34.7079405,31.6399054 C34.6918851,31.6317501 34.6813613,31.6164966 34.6800128,31.5994264 L34.6800128,31.5994264 L34.6713201,31.4918558 L34.6557842,31.4329173 L34.4121108,30.985382 C34.4095536,30.9806686 34.407806,30.9756065 34.4069324,30.9703824 L34.4069324,30.9703824 L34.3630989,30.7133756 L34.1475381,30.318459 C34.1450761,30.31393 34.1433613,30.3090771 34.1424522,30.304066 L34.1424522,30.304066 L34.1063867,30.107731 C34.1050426,30.100463 34.1054216,30.0930068 34.1074969,30.0858915 L34.1074969,30.0858915 L34.1526251,29.9318555 C34.1547075,29.924672 34.1584662,29.9180117 34.1636296,29.9123559 L34.1636296,29.9123559 L34.2598968,29.8072119 L34.2598968,29.7260807 L34.2336337,29.5515051 L34.2259583,29.515786 L34.0670851,29.1688082 L33.7987207,28.8749556 C33.7819795,28.8565842 33.7815524,28.829647 33.7977036,28.8108173 L33.7977036,28.8108173 L33.8616043,28.7360925 L33.8772327,28.6327684 L33.8857405,28.4727598 L33.8645635,28.4074015 L33.6153416,28.4217878 C33.6031748,28.4225168 33.5911062,28.4193377 33.5811256,28.4127747 L33.5811256,28.4127747 L33.51704,28.3704758 C33.5104935,28.3661657 33.5050587,28.3605372 33.5011341,28.3540029 L33.5011341,28.3540029 L33.4317774,28.2381991 L33.353358,28.2270194 L32.8916271,28.3931819 C32.8811199,28.3969864 32.8696013,28.3975928 32.8587057,28.3949151 L32.8587057,28.3949151 L32.7291473,28.362756 L32.5507617,28.362756 L32.3991941,28.4493471 C32.3796694,28.4604866 32.3547577,28.4588004 32.3371429,28.4451472 L32.3371429,28.4451472 L31.9723264,28.1623944 C31.9666258,28.1579646 31.9619658,28.1524761 31.95864,28.1462748 L31.95864,28.1462748 L31.9035245,28.0439041 C31.9013328,28.0398186 31.8997462,28.035472 31.8988085,28.0309844 L31.8988085,28.0309844 L31.8839199,27.9605995 L31.7582454,27.8436691 C31.7549828,27.8406137 31.7521544,27.8371766 31.7498302,27.8334427 L31.7498302,27.8334427 L31.6586492,27.6878131 C31.6544137,27.6810793 31.6519123,27.6735124 31.6513436,27.6657137 L31.6513436,27.6657137 L31.6423735,27.5369903 L31.6423735,27.5369903 L31.6423735,27.5301438 L31.6513436,27.4108735 C31.6525263,27.3953234 31.6613399,27.3811681 31.6752023,27.3725544 L31.6752023,27.3725544 L31.7640714,27.3171692 L31.7790525,27.1681663 L31.7711921,27.1239541 C31.7695964,27.1149977 31.7706191,27.1058034 31.7741515,27.0973481 L31.7741515,27.0973481 L31.7891325,27.061549 L31.7976403,26.9238992 C31.7982152,26.9148716 31.801378,26.9061567 31.8067953,26.8986731 L31.8067953,26.8986731 L31.99822,26.6337732 C31.9996485,26.6318042 32.0012245,26.6299329 32.0029361,26.6281733 L32.0029361,26.6281733 L32.0946718,26.5335424 L32.2319982,26.3963259 L32.2319982,26.3963259 L32.2413382,26.3888661 L32.358,26.315 L31.3459197,25.7566303 L0,25.7566303 L0,0 L208,0 Z"
                id="Combined-Shape"
              ></path>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export const BlogTags = ({ tagDictionary, relatedTags }) => {
  // console.log(relatedTags);
  const tags = tagDictionary ? Object.keys(tagDictionary) : relatedTags;
  const tagsList = tags.map((tag, i) => {
    const tagValue = tagDictionary ? tag : tag.fieldValue;
    const tagCount = tagDictionary ? tagDictionary[tag].length : tag.totalCount;
    return (
      <span
        className="text-sm whitespace-nowrap hover:text-accent hover:underline mr-3"
        key={"blogtagitem" + i}
      >
        <Link to={`/blogtags/${kebabCase(tagValue)}/`}>
          {tagValue} ({tagCount})
        </Link>
        {i !== tags.length - 1 && ","}
      </span>
    );
  });
  return tagsList;
};

export const BlobFooter = (_) => {
  return (
    <div aria-hidden="true">
      <div className="blob-bg relative">
        <svg
          className="blob-rotate h-64 text-fill-secondary fill-current"
          viewBox="0 0 715 693"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M359.408 0.499261C434.083 0.69572 509.059 15.4608 570.136 58.4268C631.828 101.825 675.247 166.543 697.772 238.528C720.119 309.946 720.46 387.141 695.015 457.515C670.121 526.365 618.875 581.064 558.794 622.901C499.694 664.055 431.329 687.499 359.408 691.212C284.339 695.087 205.553 688.115 144.481 644.291C83.2293 600.338 54.1113 526.936 30.6392 455.293C7.11277 383.484 -10.9409 307.559 10.4113 235.074C32.1072 161.421 84.1477 100.148 147.872 57.3159C209.988 15.5657 284.566 0.302364 359.408 0.499261Z" />
        </svg>
      </div>
    </div>
  );
};

export const Tags = ({ tags }) => {
  const tagsList = tags.map((tag, i) => {
    return (
      <span className="text-sm " key={"tagitem" + i}>
        {" "}
        <span className="hover:text-accent hover:underline">
          {" "}
          <Link to={`/blogtags/${kebabCase(tag)}/`}>{tag}</Link>
        </span>
        {tags.length !== i + 1 ? "," : ""}{" "}
      </span>
    );
  });
  return (
    <>
      {" "}
      <LinkIcon icon={"tags"} /> {tagsList}
    </>
  );
};

export const Posts = ({ data }) => {
  const Post = ({ post }) => {
    return (
      <li className="transition duration-500 ease-in-out -mx-5  px-5 py-3 hover:bg-secondary   rounded">
        <div className="mr-4  flex flex-col sm:flex-row sm:justify-between sm:items-start ">
          <div className=" flex ">
            <img
              alt={post.title}
              className=" inline-block   rounded object-cover  border-b-2  border-secondary h-24 w-24 mr-3"
              src={
                post.image
                  ? "/images/thumbnails/" + post.image
                  : "/images/thumbnails/blog/og-card.png"
              }
            />
            <div className="flex-1">
              <Link to={post.slug}>
                <h3 className="text-xl capitalize  font-semibold group-hover:text-accent">
                  {post.title}
                </h3>
                <h4 className="font-medium text-tertiary">
                  {post.description}
                </h4>
              </Link>
            </div>
          </div>
          <div className="flex-auto   text-sm text-right ml-5">
            {" "}
            {post.date}
            <div className="ml-24  ">
              <Tags tags={post.tags} />
            </div>
          </div>
        </div>
      </li>
    );
  };

  return (
    <ul className="divide-y divide-subtle">
      {data.map(({ node }) => {
        const post = {
          slug: node.fields.slug,
          title: node.frontmatter.title,
          date: node.frontmatter.date,
          description: node.frontmatter.description,
          tags: node.frontmatter.tags,
          image: node.frontmatter.seoImage,
        };
        return <Post key={node.id} post={post} />;
      })}
    </ul>
  );
};
