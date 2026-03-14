import jsPDF from "jspdf";
import certificate from "./assets/certificate.png";

const generatePDF = (data) => {

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [1123, 794]
  });

  const img = new Image();
  img.src = certificate;

  img.onload = () => {

    doc.addImage(img, "PNG", 0, 0, 1123, 794);

    /* Student Name */

    doc.setFont("Times", "Bold");
    doc.setFontSize(38);

    doc.text(data.studentName, 561, 365, {
      align: "center"
    });

    /* Domain */

    doc.setFontSize(26);

    doc.text(data.domain, 561, 440, {
      align: "center"
    });

    /* Duration */

    doc.setFontSize(22);

    doc.text(
      `${data.startDate} - ${data.endDate}`,
      561,
      490,
      { align: "center" }
    );

    /* Certificate ID */

    doc.setFontSize(18);

    doc.text(
      `Certificate ID: ${data.certificateId}`,
      180,
      630
    );

    doc.save(`${data.certificateId}.pdf`);

  };

};

export default generatePDF;