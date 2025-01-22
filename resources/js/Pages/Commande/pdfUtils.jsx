import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image, pdf } from '@react-pdf/renderer';

const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};
// Define styles for the PDF
const styles = StyleSheet.create({
    page: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 50,
        fontFamily: 'Helvetica',
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
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
    sectionHeaderA: {
        fontSize: 8,
        color: '#111111',
        marginBottom: 5,
        lineHeight: 1.5,
    },
    table: {
        width: '100%',
        marginBottom: 20,
        borderWidth: 1,
    },
    tableA: {
        width: '100%',
        borderColor: '#555555',
        marginBottom: 20,
    },
    tableHeader: {
        fontSize: 8,
        padding: 8,
        flex: 1,
        color: '#000000',
        backgroundColor: '#bbbbbb',
        textAlign: 'center',
        borderRightWidth: 1,
        borderRightColor: '#555555',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableRowA: {
        flexDirection: 'row',
    },
    tableCell: {
        fontSize: 8,
        paddingTop: 8,
        paddingBottom: 8,
        flex: 1,
        color: '#555555',
        textAlign: 'center',
        borderRightColor: '#555555',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCellA: {
        fontSize: 7,
        paddingTop: 5,
        paddingBottom: 5,
        flex: 1,
        color: '#555555',
        textAlign: 'center',
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
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
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
            <View > {/* Ensure the entire panier table stays together */}
                <Text style={styles.sectionHeader}>Détails des Paniers :</Text>
                <View style={styles.table}>
                    {/* Table Header */}
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableHeader]}>Produit</Text>
                        <Text style={[styles.tableHeader]}>Quantité</Text>
                        <Text style={[styles.tableHeader]}>Prix Unitaire</Text>
                        <Text style={[styles.tableHeader]}>Total</Text>
                    </View>
                    {/* Table Rows */}
                    {panierCommandes
                        .filter((pc) => pc.commande_id === commande.id)
                        .map((pc, index) => (
                            <View key={index} >
                                <View style={styles.tableRow}>
                                    <Text wrap={false} style={[styles.tableCell]}>{pc.panier?.name || 'N/A'}</Text>
                                    <Text wrap={false} style={[styles.tableCell]}>{pc.quantity}</Text>wrap={false}
                                    <Text wrap={false} style={[styles.tableCell]}>{(pc.panier?.price || 0).toFixed(2)} DT</Text>wrap={false}
                                    <Text wrap={false} style={[styles.tableCell]}>{((pc.panier?.price || 0) * pc.quantity).toFixed(2)} DT</Text>
                                </View>
                                {/* Nested table for articles */}
                                <View style={styles.nestedTable}>
                                    <View style={styles.tableA}>
                                        {/* Table Rows */}
                                        {pc.panier.articles
                                            .map((ac, index) => (
                                                <View key={index} style={styles.tableRowA}>
                                                    <Text wrap={false} style={[styles.tableCellA]}>{truncateText(ac.name || 'N/A', 26)}</Text>
                                                    <Text wrap={false} style={[styles.tableCellA]}>{ac.pivot.quantity * pc.quantity}</Text>
                                                    <Text wrap={false} style={[styles.tableCellA]}>{(ac.price || 0).toFixed(2)} DT</Text>
                                                    <Text wrap={false} style={[styles.tableCellA]}>{((ac.price || 0) * (ac.pivot.quantity * pc.quantity)).toFixed(2)} DT</Text>
                                                </View>
                                            ))}
                                    </View>
                                </View>
                            </View>
                        ))}
                </View>
            </View>

            {/* Extra articles table */}
            <View> {/* Ensure the entire extra articles table stays together */}
                <Text style={styles.sectionHeader}>Articles Supplémentaires :</Text>
                <View style={styles.table}>
                    {/* Table Header */}
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableHeader]}>Article</Text>
                        <Text style={[styles.tableHeader]}>Quantité</Text>
                        <Text style={[styles.tableHeader]}>Prix Unitaire</Text>
                        <Text style={[styles.tableHeader]}>Total</Text>
                    </View>
                    {/* Table Rows */}
                    {articleCommandes
                        .filter((ac) => ac.commande_id === commande.id && !ac.panier_id)
                        .map((ac, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text wrap={false} style={[styles.tableCell]}>{truncateText(ac.article?.name || 'N/A', 26)}</Text>
                                <Text wrap={false} style={[styles.tableCell]}>{ac.quantity}</Text>
                                <Text wrap={false} style={[styles.tableCell]}>{(ac.article?.price || 0).toFixed(2)} DT</Text>
                                <Text wrap={false} style={[styles.tableCell]}>{((ac.article?.price || 0) * ac.quantity).toFixed(2)} DT</Text>
                            </View>
                        ))}
                </View>
            </View>

            {/* Total section */}
            <View wrap={false}> {/* Ensure the total section stays together */}
                <View style={styles.totalSection}>
                    <Text style={styles.totalText}>Sous-Total : {total.toFixed(2)} DT</Text>
                    <Text style={styles.totalText}>TVA 0% : 0 DT</Text>
                    <Text style={styles.totalTextBold}>Total : {total.toFixed(2)} DT</Text>
                </View>
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
