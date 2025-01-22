import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image, pdf } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        paddingBottom: 20,
    },
    logo: {
        width: 80,
        height: 80,
    },
    companyInfo: {
        fontSize: 10,
        color: '#333333',
        textAlign: 'right',
        lineHeight: 1.5,
    },
    invoiceTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 30,
    },
    clientInfo: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#555555',
        marginBottom: 5,
        paddingBottom: 5,
    },
    sectionHeader: {
        fontSize: 12,
        color: '#000000',
        marginBottom: 5,
        lineHeight: 1.5,
    },
    table: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#555555',
        marginBottom: 20,
    },
    tableHeader: {
        fontSize: 8,
        padding: 8,
        flex: 1,
        color: '#555555',
        textAlign: 'center',
        borderRightWidth: 1,
        borderRightColor: '#555555',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#555555',
    },
    tableCell: {
        fontSize: 8,
        padding: 8,
        flex: 1,
        color: '#555555',
        textAlign: 'center',
        borderRightWidth: 1,
        borderRightColor: '#555555',
    },
    tableCellA: {
        fontSize: 8,
        padding: 5,
        flex: 1,
        color: '#555555',
        textAlign: 'center',
        borderRightWidth: 1,
        borderRightColor: '#555555',
    },
    lastCell: {
        borderRightWidth: 0, // Remove right border for the last cell in a row
    },
    totalSection: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
    },
    totalText: {
        fontSize: 12,
        color: '#555555',
        textAlign: 'right',
        marginBottom: 5,
    },
    totalTextBold: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'right',
    },
    footer: {
        marginTop: 30,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#DDDDDD',
        textAlign: 'center',
    },
    footerText: {
        fontSize: 10,
        color: '#777777',
        lineHeight: 1.5,
    },
    nestedTable: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
    },
});

// Create the PDF content
const CommandePDF = ({ commande, panierCommandes, articleCommandes, total }) => (
    <Document>
        <Page style={styles.page}>
            {/* Header with logo and company info */}
            <View style={styles.header}>
                <Image src="/logo.png" style={styles.logo} /> {/* Replace with your logo path */}
                <View style={styles.companyInfo}>
                    <Text>STE CENTRALE COMMERCIALE</Text>
                    <Text>123 OUED ELLIL, MANOUBA</Text>
                    <Text>MANOUBA, TUNIS, 2036</Text>
                    <Text>Phone: +216 29 613 714</Text>
                    <Text>Email: info@benyaghlaneshops.com</Text>
                </View>
            </View>

            {/* Invoice title */}
            <Text style={styles.invoiceTitle}>Bon de Commande N° {commande.id}</Text>

            {/* Client information */}
            <Text style={styles.sectionHeader}>Informations du Client : </Text>
            <View style={{ marginBottom: 20 }}>
                <Text style={styles.clientInfo}>Nom: {commande.user.name}</Text>
                <Text style={styles.clientInfo}>Email: {commande.user.email}</Text>
                <Text style={styles.clientInfo}>
                    Date de Commande: {new Date(commande.created_at).toLocaleDateString('fr-FR')}
                </Text>
                <Text style={styles.clientInfo}>Date Prévue: {commande.date}</Text>
            </View>

            {/* Panier table */}
            <Text style={styles.sectionHeader}>Détails des Paniers :</Text>
            <View style={styles.table}>
                {/* Table Header */}
                <View style={styles.tableRow}>
                    <Text style={[styles.tableHeader, styles.lastCell]}>Produit</Text>
                    <Text style={[styles.tableHeader, styles.lastCell]}>Quantité</Text>
                    <Text style={[styles.tableHeader, styles.lastCell]}>Prix Unitaire</Text>
                    <Text style={[styles.tableHeader, styles.lastCell]}>Total</Text>
                </View>
                {/* Table Rows */}
                {panierCommandes
                    .filter((pc) => pc.commande_id === commande.id)
                    .map((pc, index) => (
                        <View key={index}>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.lastCell]}>{pc.panier?.name || 'N/A'}</Text>
                                <Text style={[styles.tableCell, styles.lastCell]}>{pc.quantity}</Text>
                                <Text style={[styles.tableCell, styles.lastCell]}>{(pc.panier?.price || 0).toFixed(2)} DT</Text>
                                <Text style={[styles.tableCell, styles.lastCell]}>{((pc.panier?.price || 0) * pc.quantity).toFixed(2)} DT</Text>
                            </View>
                            {/* Nested table for articles */}
                            <View style={styles.nestedTable}>
                                <Text style={styles.sectionHeader}>Articles dans ce Panier :</Text>
                                <View style={styles.table}>
                                    {/* Table Rows */}
                                    {pc.panier.articles
                                        .map((ac, index) => (
                                            <View key={index} style={styles.tableRow}>
                                                <Text style={[styles.tableCellA, styles.lastCell]}>{ac.name || 'N/A'}</Text>
                                                <Text style={[styles.tableCellA, styles.lastCell]}>{ac.pivot.quantity * pc.quantity}</Text>
                                                <Text style={[styles.tableCellA, styles.lastCell]}>{(ac.price || 0).toFixed(2)} DT</Text>
                                                <Text style={[styles.tableCellA, styles.lastCell]}>{((ac.price || 0) * (ac.pivot.quantity * pc.quantity)).toFixed(2)} DT</Text>
                                            </View>
                                        ))}
                                </View>
                            </View>
                        </View>
                    ))}
            </View>

            {/* Extra articles table */}
            <Text style={styles.sectionHeader}>Articles Supplémentaires :</Text>
            <View style={styles.table}>
                {/* Table Header */}
                <View style={styles.tableRow}>
                    <Text style={[styles.tableHeader, styles.lastCell]}>Article</Text>
                    <Text style={[styles.tableHeader, styles.lastCell]}>Quantité</Text>
                    <Text style={[styles.tableHeader, styles.lastCell]}>Prix Unitaire</Text>
                    <Text style={[styles.tableHeader, styles.lastCell]}>Total</Text>
                </View>
                {/* Table Rows */}
                {articleCommandes
                    .filter((ac) => ac.commande_id === commande.id && !ac.panier_id)
                    .map((ac, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={[styles.tableCell, styles.lastCell]}>{ac.article?.name || 'N/A'}</Text>
                            <Text style={[styles.tableCell, styles.lastCell]}>{ac.quantity}</Text>
                            <Text style={[styles.tableCell, styles.lastCell]}>{(ac.article?.price || 0).toFixed(2)} DT</Text>
                            <Text style={[styles.tableCell, styles.lastCell]}>{((ac.article?.price || 0) * ac.quantity).toFixed(2)} DT</Text>
                        </View>
                    ))}
            </View>

            {/* Total section */}
            <View style={styles.totalSection}>
                <Text style={styles.totalText}>Sous-Total : {total.toFixed(2)} DT</Text>
                <Text style={styles.totalText}>TVA 0% : 0 DT</Text>
                <Text style={styles.totalTextBold}>Total : {total.toFixed(2)} DT</Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Merci pour votre confiance !{'\n'}
                    Pour toute question, contactez-nous à info@benyaghlaneshops.com.
                </Text>
            </View>
        </Page>
    </Document>
);

// Function to generate and download the PDF
export const generateCommandePDF = async (commande, panierCommandes, articleCommandes, total) => {
    const pdfBlob = await pdf(<CommandePDF commande={commande} panierCommandes={panierCommandes} articleCommandes={articleCommandes} total={total} />).toBlob();
    const url = URL.createObjectURL(pdfBlob);
    return url;
};
