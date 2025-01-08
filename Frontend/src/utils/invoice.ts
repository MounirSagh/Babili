
import axios from 'axios';


export const downloadInvoice = async (filePath: string) => {
    if (!filePath) {
      console.error("Invoice file path is missing");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000${filePath}`, {
        responseType: "blob",
      });

      const fileName = filePath.split("/").pop() || "invoice.pdf";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };
