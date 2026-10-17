
export function exportGenealogyPdf({ title, text }) {
  const printWindow = window.open("", "_blank", "width=900,height=700");

  if (!printWindow) {
    throw new Error(
      "The print window was blocked. Allow pop-ups and try again.",
    );
  }

  const safeTitle = escapeHtml(title || "Family Genealogy");
  const safeText = escapeHtml(text || "");

  printWindow.document.open();

  printWindow.document.write(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${safeTitle}</title>

        <style>
          @page {
            size: A4;
            margin: 22mm 20mm;
          }

          body {
            color: #222;
            font-family: Georgia, "Times New Roman", serif;
            font-size: 12pt;
            line-height: 1.8;
          }

          h1 {
            margin-bottom: 28px;
            color: #2E5E99;
            font-size: 22pt;
            text-align: center;
          }

          .genealogy {
            white-space: pre-wrap;
            overflow-wrap: anywhere;
          }

          .footer {
            margin-top: 36px;
            border-top: 1px solid #ddd;
            padding-top: 10px;
            color: #666;
            font-size: 9pt;
          }
        </style>
      </head>

      <body>
        <h1>${safeTitle}</h1>
        <main class="genealogy">${safeText}</main>
        <div class="footer">Family Diary · Family history record</div>

        <script>
          window.addEventListener("load", () => {
            window.print();
          });
        <\/script>
      </body>
    </html>
  `);

  printWindow.document.close();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}