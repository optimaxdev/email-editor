import { Config, Section, STORE_VIEWS, DEFAULT_CONFIG } from "../types";

export const generateHTML = (config: Config): string => {
  const store = STORE_VIEWS[config.storeView];

  const sectionsHTML = config.sections
    .map((section) => {
      switch (section.type) {
        case "h1":
          return `<tr><td style="padding: 0 20px 16px 20px;"><h1 style="font-size: 24px; font-weight: 700; line-height: 32px; color: ${store.textColor}; margin: 0; ">${section.text || ""}</h1></td></tr>`;
        case "h2":
          return `<tr><td style="padding: 0 20px 16px 20px;"><h2 style="font-size: 18px; font-weight: 700; line-height: 26px; color: ${store.textColor}; margin: 0; ">${section.text || ""}</h2></td></tr>`;
        case "p":
          if (!section.text || section.text.trim() === "") return "";
          return `<tr><td style="padding: 0 20px 16px 20px; font-size: 16px; font-weight: 400; line-height: 24px; color: ${store.textColor};"><p style="margin: 0;">${section.text}</p></td></tr>`;
        case "divider":
          return `<tr><td style="padding: 0 20px 16px 20px;"><div style="height: 1px; background-color: #DEDEDE;"></div></td></tr>`;
        case "callout":
          return `
          <tr><td style="padding: 0 20px 16px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 4px; background-color: #ffffff; border-collapse: separate;">
              <tr>
                <td width="4" style="background-color: ${store.calloutBorderColor}; border-radius: 4px 0 0 4px; font-size: 0; line-height: 0;">&nbsp;</td>
                <td style="padding: 16px; ">
                  <div style="font-size: 16px; font-weight: 400; line-height: 24px; color: ${store.textColor};">
                    ${section.text || ""}
                  </div>
                  ${
                    section.showButton
                      ? `
                  <div style="padding-top: 16px;">
                    <a href="${section.url || "#"}" style="background-color: ${store.buttonBgColor}; color: ${store.buttonTextColor}; padding: 0px 20px;height:32px; line-height:32px; text-align: center; border-radius: 20px; font-size: 14px; font-weight: 700; text-decoration: none; display: inline-block;">${section.buttonText || "Upload Now"}</a>
                  </div>`
                      : ""
                  }
                </td>
              </tr>
            </table>
          </td></tr>`;
        case "examlink":
          return `
          <tr><td style="padding: 0 20px 16px 20px;">
          {% unless exam %}
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 4px; background-color: #ffffff; border-collapse: separate;">
          <tr>
          <td width="4" style="background-color: ${store.calloutBorderColor}; border-radius: 4px 0 0 4px; font-size: 0; line-height: 0;">&nbsp;</td>
          <td style="padding: 16px;">
          <div style="font-size: 16px; font-weight: 400; line-height: 24px; color: ${store.textColor};">
          ${section.text || ""}
          </div>
                  <div style="padding-top: 16px;">
                    <a href={{ exam.link }} style="background-color: ${store.buttonBgColor}; color: ${store.buttonTextColor}; padding: 0px 20px;height:32px; line-height:32px; text-align: center; border-radius: 20px; font-size: 14px; font-weight: 700; text-decoration: none; display: inline-block;">Start Test  </a>
                  </div>
                  </td>
                  </tr>
                  </table>
                  {% endunless %}
          </td></tr>`;
        default:
          return "";
      }
    })
    .join("");

  return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600">
    <title>${config.storeView}.com</title>
    <style>
        @media only screen and (min-width: 420px) {
            body { font-family: Roboto !important; }
            .desktop-version-width { width: 524px !important; }
            img.desktop-version-logo { width: 159px !important; }
            td.desktop-version-width-height { height: 32px !important; }
            td.trans-txt-d-b-top { height: 16px; }
            .colored { display: block !important; }
            .logomobile { display: none !important; }
            span.trans-txt-d-normal { font-size: 16px !important; }
            .trans-txt-d-inline { display: inline !important; font-size: 16px !important; }
            td.footer-width-txt { width: 370px !important; }
        }
    </style>
</head>
<body style="background: #FBFBFB; margin:auto; max-width:600px; font-family: Helvetica, Roboto, sans-serif; margin-top:40px; font-size: 16px;">
    ${
      config.showLogo
        ? `<table border="0" cellpadding="0" cellspacing="0" align="center" style="padding: 0px 20px 0px 20px;display: block;">
        <tbody>
            <tr><td height="40"></td></tr>
            <tr>
                <td>
                    <a href="${store.shopUrl}">
                        <img width="100" class="desktop-version-logo" style="max-width: 159px; width: 100px;" src="${store.logoSrc}" alt="${store.logoAlt}">
                    </a>
                </td>
            </tr>
            <tr><td class="desktop-version-width-height" height="32"></td></tr>
        </tbody>
    </table>`
        : ""
    }

    <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center">
        <tbody>
${sectionsHTML}
            ${
              config.showSignature
                ? `
            <tr>
                <td style="padding: 16px 20px 32px 20px; font-family: Roboto, sans-serif;">
                    <p style="margin: 0; font-size: 16px; color: ${store.textColor}; font-weight: 400;">${config.signatureBest}</p>
                    <p style="margin: 0; font-size: 16px; color: ${store.textColor}; font-weight: 400;">${config.signatureName}</p>
                </td>
            </tr>`
                : ""
            }

            ${
              config.showDisclaimer
                ? `
            <tr>
                <td style="padding: 0 20px 0 20px;">
                    <div style="height: 1px; background-color: #DEDEDE;"></div>
                </td>
            </tr>
            <tr>
                <td style="padding: 32px 20px 0 20px; font-size: 12px; color: #3A4850; line-height: 18px; font-family: Roboto, sans-serif;">
                    ${config.disclaimerText}
                </td>
            </tr>`
                : ""
            }

            <tr><td height="40"></td></tr>

            ${config.showFooter ? `${store.footerHtml}` : ""}
        </tbody>
    </table>
</body>
</html>`;
};

const isExamLinkTemplate = (rawHtml: string, button: Element | null) => {
  const hasExamLinkMarker = /\{\%\s*if\s+exam\s*\%\}|exam\.link/i.test(rawHtml);
  const isStartTestButton =
    (button?.textContent || "").replace(/\s+/g, " ").trim().toLowerCase() ===
    "start test";

  return hasExamLinkMarker && isStartTestButton;
};

export const parseImportedEmail = (html: string): Partial<Config> => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const sections: Section[] = [];
  let importedSigBest = DEFAULT_CONFIG.signatureBest;
  let importedSigName = DEFAULT_CONFIG.signatureName;
  let importedDisclaimer = DEFAULT_CONFIG.disclaimerText;

  let hasLogo =
    !!doc.querySelector("img.desktop-version-logo") ||
    html.includes("gusalogo.png");
  let hasSignature = false;
  let hasDisclaimer = false;
  let hasFooter =
    !!doc.querySelector(".v4-footer-table") ||
    !!doc.querySelector(".trans-txt-d-bc") ||
    html.includes("Need help with your order?");

  const rows = Array.from(doc.querySelectorAll("tr"));
  const footerStartIndex = rows.findIndex(
    (tr) => tr.closest(".v4-footer-table") || tr.closest(".trans-txt-d-bc"),
  );

  rows.forEach((tr, index) => {
    if (footerStartIndex !== -1 && index >= footerStartIndex) return;

    const td = tr.querySelector("td") as HTMLElement | null;
    if (!td) return;

    const style = td.getAttribute("style") || "";
    const innerHTML = td.innerHTML;
    const textContent = td.textContent || "";

    if (innerHTML === "" && textContent === "") return;

    const height = td.getAttribute("height");
    if (height && ["40", "32", "12", "24"].includes(height)) {
      if (!textContent || textContent.length < 2) return;
    }

    const div = td.querySelector("div");
    if (
      div &&
      !td.querySelector("p") &&
      !td.querySelector("h1") &&
      !td.querySelector("h2")
    ) {
      const divStyle = div.getAttribute("style") || "";
      if (
        divStyle.includes("background-color") ||
        divStyle.includes("border") ||
        divStyle.includes("height: 1px")
      ) {
        if (!textContent || textContent.length < 5) {
          sections.push({
            id: Math.random().toString(36).substr(2, 9),
            type: "divider",
            text: "",
          });
          return;
        }
      }
    }

    const nestedTable = td.querySelector("table");
    if (nestedTable) {
      const borderCell = nestedTable.querySelector(
        'td[width="4"]',
      ) as HTMLElement | null;
      const bcStyle = borderCell?.getAttribute("style") || "";
      const isBlue = bcStyle.includes("#277BDA");

      if (isBlue || bcStyle.includes("background")) {
        const contentCells = nestedTable.querySelectorAll("td");
        let contentText = "";
        let button = nestedTable.querySelector("a");

        contentCells.forEach((cell) => {
          const cellStyle = cell.getAttribute("style") || "";
          if (!cellStyle.includes("width") || !cellStyle.includes("#")) {
            const divs = cell.querySelectorAll("div");
            if (divs.length > 0) {
              contentText = divs[0].innerHTML;
            } else {
              contentText = cell.innerHTML;
            }
          }
        });

        if (contentText) {
          const isExamLink = isExamLinkTemplate(html, button);

          sections.push({
            id: Math.random().toString(36).substr(2, 9),
            type: isExamLink ? "examlink" : "callout",
            text: contentText,
            showButton: !!button,
            buttonText: button?.textContent || "Upload Now",
            url: button?.getAttribute("href") || "",
          });
          return;
        }
      }
    }

    const ps = td.querySelectorAll("p");
    if (ps.length >= 2) {
      const p1Text = ps[0].innerHTML;
      const p2Text = ps[1].innerHTML;

      if (
        p1Text.length > 0 &&
        p1Text.length < 30 &&
        p2Text.length > 0 &&
        p2Text.length < 100
      ) {
        const allText = td.textContent || "";
        if (allText.includes("Best") || allText.includes("Regards")) {
          importedSigBest = p1Text;
          importedSigName = p2Text;
          hasSignature = true;
          return;
        }
      }
    }

    if (
      style.includes("font-size: 12px") ||
      style.includes("font-size: 11px")
    ) {
      if (innerHTML.length > 100) {
        importedDisclaimer = innerHTML;
        hasDisclaimer = true;
        return;
      }
    }

    const h1 = td.querySelector("h1");
    const h2 = td.querySelector("h2");
    const p = td.querySelector("p:first-child");

    if (h1) {
      const h1Text = h1.innerHTML;
      if (h1Text && h1Text.length > 0) {
        sections.push({
          id: Math.random().toString(36).substr(2, 9),
          type: "h1",
          text: h1Text,
        });
        return;
      }
    }

    if (h2) {
      const h2Text = h2.innerHTML;
      if (h2Text && h2Text.length > 0) {
        sections.push({
          id: Math.random().toString(36).substr(2, 9),
          type: "h2",
          text: h2Text,
        });
        return;
      }
    }

    if (p) {
      const pText = p.innerHTML;
      const divs = Array.from(p.querySelectorAll("div"));
      let allText = "";

      if (divs.length > 0) {
        const textBeforeDiv = pText
          .split(/<div[^>]*>/)[0]
          .replace(/<br\s*\/?>/gi, " ")
          .replace(/<[^>]+>/g, "")
          .trim();
        if (textBeforeDiv.length > 0) allText += textBeforeDiv;

        divs.forEach((div) => {
          const divText = (div.textContent || "").trim();
          if (divText.length > 0) {
            if (allText.length > 0) allText += "<br><br>";
            allText += divText;
          }
        });
      } else {
        allText = pText;
      }

      if (allText && allText.length > 3) {
        sections.push({
          id: Math.random().toString(36).substr(2, 9),
          type: "p",
          text: allText,
        });
        return;
      }
    }

    if (
      textContent &&
      textContent.length > 0 &&
      !textContent.includes("<table") &&
      !hasSignature &&
      !hasDisclaimer
    ) {
      if (textContent.length > 3) {
        sections.push({
          id: Math.random().toString(36).substr(2, 9),
          type: "p",
          text: textContent,
        });
      }
    }
  });

  return {
    sections: sections.length > 0 ? sections : undefined,
    signatureBest: importedSigBest,
    signatureName: importedSigName,
    disclaimerText: importedDisclaimer,
    showLogo: hasLogo,
    showSignature: hasSignature,
    showDisclaimer: hasDisclaimer,
    showFooter: hasFooter,
  };
};
