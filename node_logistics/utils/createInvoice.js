const pdfKit = require('pdfkit');
const fs = require('fs');
const logger = require('../winston')

const { customAlphabet } = require('nanoid');
const alphabet = '0123456789';

let nanoid = customAlphabet(alphabet, 17);
invoiceId = nanoid()

let fileName = "./invoices/" + invoiceId + ".pdf";
let fontNormal = 'Helvetica';
let fontBold = 'Helvetica-Bold';

let sellerInfo = {
    "companyName": "node-logistics",
    "address": "Bangalore",
    "state": "Karnataka",
}





module.exports = async function createPdf(orderDetails) {
    try {
        let orderInfo = {
            "orderNo": orderDetails.orderId,
            "invoiceNo": invoiceId,
            "invoiceDate": new Date().toLocaleDateString("en-US"),
            "products": [
                {
                    "id": orderDetails.itemId,
                    "name": orderDetails.item,
                    "unitPrice": orderDetails.price,
                },
            ],
            "totalValue": orderDetails.price,
        }
        let customerInfo = {
            "customerName": orderDetails.customerName,
            "address": orderDetails.customerCity,
        }
        let pdfDoc = new pdfKit();

        let stream = fs.createWriteStream(fileName);
        pdfDoc.pipe(stream);

        pdfDoc.text("Order Invoice", 5, 5, { align: "center", width: 600 });

        pdfDoc.font(fontBold).text("Sold by:", 7, 100);
        pdfDoc.font(fontNormal).text(sellerInfo.companyName, 7, 115, { width: 250 });
        pdfDoc.text(sellerInfo.address, 7, 130, { width: 250 });
        pdfDoc.text(sellerInfo.state, 7, 145, { width: 250 });

        pdfDoc.font(fontBold).text("Customer details:", 400, 100);
        pdfDoc.font(fontNormal).text(customerInfo.customerName, 400, 115, { width: 250 });
        pdfDoc.text(customerInfo.address, 400, 130, { width: 250 });

        pdfDoc.text("Order No:", 7, 195, { width: 250 });
        pdfDoc.text(orderInfo.orderNo, 70, 195, { width: 250 });
        pdfDoc.text("Invoice No:", 7, 210, { width: 250 });
        pdfDoc.text(orderInfo.invoiceNo, 70, 210, { width: 250 });
        pdfDoc.text("Date:", 7, 225, { width: 250 });
        pdfDoc.text(orderInfo.invoiceDate, 70, 225, { width: 250 });

        pdfDoc.rect(7, 250, 560, 20).fill("#FC427B").stroke("#FC427B");
        pdfDoc.fillColor("#fff").text("ItemID", 20, 256, { width: 90 });
        pdfDoc.text("Item", 300, 256, { width: 190 });
        pdfDoc.text("Price", 400, 256, { width: 100 });

        let productNo = 1;
        orderInfo.products.forEach(element => {
            console.log("adding", element.name);
            let y = 256 + (productNo * 20);
            pdfDoc.fillColor("#000").text(element.id, 20, y, { width: 300 });
            pdfDoc.text(element.name, 300, y, { width: 190 });
            pdfDoc.text(element.unitPrice, 400, y, { width: 100 });
            productNo++
        });

        pdfDoc.rect(7, 256 + (productNo * 20), 560, 0.2).fillColor("#000").stroke("#000");
        productNo++;

        pdfDoc.font(fontBold).text("Total Price:", 400, 256 + (productNo * 17));
        pdfDoc.font(fontBold).text(orderInfo.totalValue, 500, 256 + (productNo * 17));

        pdfDoc.end();
        logger.info(`invoice generated for order ${orderDetails.orderId}`);
        return invoiceId
    } catch (err) {
        throw err
    }
}