import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Register the fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

/**
 * Generates and downloads a PDF for a given commande.
 * @param {Object} commande - The commande object.
 * @param {Array} panierCommandes - The list of panierCommandes associated with the commande.
 * @param {Function} calculateTotal - A function to calculate the total for the commande.
 */
export const generateCommandePDF = (commande, panierCommandes, calculateTotal) => {
    // Define the document content
    const documentDefinition = {
        content: [
            // Header with logo and company info
            {
                columns: [
                    {
                        image: "logo", // Replace with your logo path
                        width: 50,
                        height: 50,
                        alignment: "left",
                    },
                    {
                        stack: [
                            { text: "STE CENTRALE COMMERCIALE", style: "companyInfo" },
                            { text: "123 OUED ELLIL, MANOUBA", style: "companyInfo" },
                            { text: "MANOUBA, TUNIS, 2036", style: "companyInfo" },
                            { text: "Phone: +216 29 613 714", style: "companyInfo" },
                            { text: "Email: info@benyaghlaneshops.com", style: "companyInfo" },
                        ],
                        alignment: "right",
                    },
                ],
                margin: [0, 0, 0, 20], // Add margin below the header
            },

            // Invoice title
            {
                text: `Bon de Commande N° ${commande.id}`,
                style: "invoiceTitle",
                margin: [0, 0, 0, 10], // Add margin below the title
            },

            // Client information
            {
                text: "Informations du Client",
                style: "sectionHeader",
                margin: [0, 0, 0, 10], // Add margin below the section header
            },
            {
                columns: [
                    {
                        stack: [
                            { text: `Nom: ${commande.user.name}`, style: "clientInfo" },
                            { text: `Email: ${commande.user.email}`, style: "clientInfo" },
                            { text: `Date de Commande: ${new Date(commande.created_at).toLocaleDateString("fr-FR")}`, style: "clientInfo" },
                            { text: `Date Prévue: ${commande.date}`, style: "clientInfo" },
                        ],
                        width: "*",
                    },
                ],
                margin: [0, 0, 0, 20], // Add margin below the client info
            },

            // Commande details table
            {
                text: "Détails de la Commande",
                style: "sectionHeader",
                margin: [0, 0, 0, 10], // Add margin below the section header
            },
            {
                table: {
                    headerRows: 1,
                    widths: ["*", "auto", "auto", "auto"], // Column widths
                    body: [
                        // Table headers
                        [
                            { text: "Produit", style: "tableHeader" },
                            { text: "Quantité", style: "tableHeader" },
                            { text: "Prix Unitaire", style: "tableHeader" },
                            { text: "Total", style: "tableHeader" },
                        ],
                        // Table rows
                        ...panierCommandes
                            .filter((pc) => pc.commande_id === commande.id)
                            .map((pc) => [
                                pc.panier?.name || "N/A",
                                pc.quantity,
                                `${(pc.panier?.price || 0).toFixed(2)} DT`,
                                `${((pc.panier?.price || 0) * pc.quantity).toFixed(2)} DT`,
                            ]),
                    ],
                },
                layout: "lightHorizontalLines", // Table styling
                margin: [0, 0, 0, 20], // Add margin below the table
            },

            // Total section
            {
                stack: [
                    { text: `Sous-Total: ${calculateTotal(commande.id).toFixed(2)} DT`, style: "totalText" },
                    { text: `TVA 0%: 0 DT`, style: "totalText" },
                    { text: `Total: ${calculateTotal(commande.id).toFixed(2)} DT`, style: "totalTextBold" },
                ],
                margin: [0, 0, 0, 20], // Add margin below the total section
            },

            // Footer
            {
                text: [
                    { text: "Merci pour votre confiance !\n", style: "footerText" },
                    { text: "Pour toute question, contactez-nous à info@benyaghlaneshops.com.", style: "footerText" },
                ],
                alignment: "center",
                margin: [0, 0, 0, 10], // Add margin below the footer
            },
        ],

        // Styles for the document
        styles: {
            companyInfo: {
                fontSize: 9,
                color: "#666666", // Gray color
                margin: [0, 0, 0, 5], // Add margin below each line
            },
            invoiceTitle: {
                fontSize: 18,
                bold: true,
                alignment: "center",
            },
            sectionHeader: {
                fontSize: 14,
                bold: true,
                margin: [0, 0, 0, 10], // Add margin below the header
            },
            clientInfo: {
                fontSize: 10,
                color: "#666666", // Gray color
                margin: [0, 0, 0, 5], // Add margin below each line
            },
            tableHeader: {
                fontSize: 12,
                bold: true,
                fillColor: "#808080", // Gray background
                color: "#FFFFFF", // White text
                alignment: "center",
            },
            totalText: {
                fontSize: 10,
                alignment: "right",
                margin: [0, 0, 0, 5], // Add margin below each line
            },
            totalTextBold: {
                fontSize: 14,
                bold: true,
                alignment: "right",
            },
            footerText: {
                fontSize: 10,
                color: "#666666", // Gray color
                alignment: "center",
            },
        },
    };

    // Generate and download the PDF
    pdfMake.createPdf(documentDefinition).download(`Commande_${commande.id}.pdf`);
};
