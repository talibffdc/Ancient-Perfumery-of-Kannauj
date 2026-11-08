const SPREADSHEET_ID = '1GgNw0XkZQk2_dO6FR3ltmjcUWvLx7iOdAbPvDk-Cr0c';
const ORDERS_SHEET_NAME = 'Orders';
const WEBHOOK_VERSION = '2026-11-08-hex-order-id-v2';
const HEADERS = [
  'Order ID',
  'Order Date (UTC)',
  'Customer Name',
  'Email',
  'Phone',
  'Country',
  'Address',
  'City',
  'State / Region',
  'PIN / Postal Code',
  'Items',
  'Items Subtotal (INR)',
  'Shipping (INR)',
  'COD Fee (INR)',
  'Collect on Delivery (INR)',
  'Payment Method',
  'Payment Status',
  'Order Status',
  'Dispatch Status',
  'Courier',
  'Tracking Number',
  'Dispatch Date',
  'Internal Notes',
  'Custom Fragrance Brief',
];

function setupOrdersSheet() {
  const sheet = getOrdersSheet_();
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setFontWeight('bold')
    .setBackground('#35291f')
    .setFontColor('#f5ead9')
    .setWrap(true);
  sheet.setRowHeight(1, 42);
  sheet.autoResizeColumns(1, HEADERS.length);
  sheet.setColumnWidth(7, 260);
  sheet.setColumnWidth(11, 360);
  sheet.setColumnWidth(23, 240);
  sheet.setColumnWidth(24, 420);
  if (!sheet.getFilter()) {
    sheet.getRange(1, 1, sheet.getMaxRows(), HEADERS.length).createFilter();
  }
  const statusRows = Math.max(sheet.getMaxRows() - 1, 1);
  sheet.getRange(2, 11, statusRows, 1).setWrap(true);
  sheet.getRange(2, 24, statusRows, 1).setWrap(true);
  sheet.getRange(2, 12, statusRows, 4).setNumberFormat('"₹"#,##0.00');
  const orderStatusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['New', 'Confirmed', 'Packed', 'Dispatched', 'Delivered', 'Cancelled'], true)
    .setAllowInvalid(false)
    .build();
  const dispatchStatusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Pending', 'Packed', 'Dispatched', 'Delivered', 'Returned'], true)
    .setAllowInvalid(false)
    .build();
  const paymentMethodRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Cash on Delivery', 'Razorpay'], true)
    .setAllowInvalid(false)
    .build();
  const paymentStatusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Unpaid — collect on delivery', 'Paid', 'Refunded', 'Failed'], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, 18, statusRows, 1).setDataValidation(orderStatusRule);
  sheet.getRange(2, 19, statusRows, 1).setDataValidation(dispatchStatusRule);
  sheet.getRange(2, 16, statusRows, 1).setDataValidation(paymentMethodRule);
  sheet.getRange(2, 17, statusRows, 1).setDataValidation(paymentStatusRule);
}

function doGet() {
  try {
    const expectedSecret = PropertiesService.getScriptProperties()
      .getProperty('ORDER_WEBHOOK_SECRET');
    if (!expectedSecret) {
      return jsonResponse_({
        success: false,
        status: 'missing_secret',
        message: 'Add ORDER_WEBHOOK_SECRET in Script Properties.',
      });
    }

    getOrdersSheet_();
    return jsonResponse_({
      success: true,
      status: 'ready',
      version: WEBHOOK_VERSION,
      message: 'COD and Razorpay order receiver is ready.',
    });
  } catch (error) {
    console.error('Order receiver health check failed: ' + error);
    return jsonResponse_({
      success: false,
      status: 'spreadsheet_unavailable',
      message: 'Could not access the configured spreadsheet.',
    });
  }
}

function doPost(event) {
  const lock = LockService.getScriptLock();
  try {
    const body = JSON.parse(event.postData.contents);
    const expectedSecret = PropertiesService.getScriptProperties()
      .getProperty('ORDER_WEBHOOK_SECRET');

    if (!expectedSecret || body.secret !== expectedSecret) {
      return jsonResponse_({ success: false, error: 'Unauthorized' });
    }
    const validationError = validateOrder_(body.order);
    if (validationError) {
      console.error('Order validation failed: ' + validationError);
      return jsonResponse_({
        success: false,
        error: validationError,
        version: WEBHOOK_VERSION,
      });
    }

    lock.waitLock(20000);
    const sheet = getOrdersSheet_();
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const existing = sheet.getRange(2, 1, lastRow - 1, 1)
        .createTextFinder(body.order.orderId)
        .matchEntireCell(true)
        .findNext();
      if (existing) {
        return jsonResponse_({ success: true, duplicate: true });
      }
    }

    const order = body.order;
    const itemSummary = order.items.map(function(item) {
      return item.productName + ' / ' + item.variantName + ' / ' + item.size +
        ' × ' + item.quantity + ' @ ₹' + item.unitPrice +
        ' = ₹' + item.lineTotal;
    }).join('\n');
    const customBriefSummary = order.items
      .filter(function(item) { return item.customBrief; })
      .map(function(item) {
        const brief = item.customBrief;
        return item.productName + ' (' + item.size + ')\n' +
          'Description: ' + brief.description + '\n' +
          'Top notes: ' + brief.topNotes.join(', ') + '\n' +
          'Middle notes: ' + brief.middleNotes.join(', ') + '\n' +
          'Base notes: ' + brief.baseNotes.join(', ') + '\n' +
          'Families: ' + brief.fragranceFamilies.join(', ') + '\n' +
          'Intensity: ' + (brief.intensity || 'No preference') + '\n' +
          'Occasion: ' + (brief.occasion || 'No preference') + '\n' +
          'Avoid: ' + (brief.avoid || 'Nothing specified') + '\n' +
          'Additional instructions: ' + (brief.instructions || 'None');
      }).join('\n\n');
    const customer = order.customer;
    const row = [
      safeCell_(order.orderId),
      safeCell_(order.createdAt),
      safeCell_(customer.name),
      safeCell_(customer.email),
      safeCell_(customer.phone),
      safeCell_(customer.country),
      safeCell_(customer.address),
      safeCell_(customer.city),
      safeCell_(customer.region),
      safeCell_(customer.postalCode),
      safeCell_(itemSummary),
      Number(order.subtotal),
      Number(order.shippingFee),
      Number(order.codFee),
      Number(order.total),
      safeCell_(order.paymentMethod),
      safeCell_(order.paymentStatus),
      safeCell_(order.orderStatus),
      safeCell_(order.dispatchStatus),
      '',
      '',
      '',
      order.couponCode ? 'Coupon ' + safeCell_(order.couponCode) + ': -₹' + Number(order.couponDiscount || 0) : '',
      safeCell_(customBriefSummary),
    ];

    sheet.appendRow(row);
    return jsonResponse_({ success: true, duplicate: false, orderId: order.orderId });
  } catch (error) {
    console.error('Order sheet write failed: ' + error);
    return jsonResponse_({ success: false, error: 'Could not record order' });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function getOrdersSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(ORDERS_SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(ORDERS_SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  } else {
    const currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
    for (let index = 0; index < HEADERS.length - 1; index += 1) {
      if (currentHeaders[index] !== HEADERS[index]) {
        throw new Error('Orders sheet has unexpected headers; refusing to append.');
      }
    }
    if (!currentHeaders[HEADERS.length - 1]) {
      sheet.getRange(1, HEADERS.length).setValue(HEADERS[HEADERS.length - 1]);
    } else if (currentHeaders[HEADERS.length - 1] !== HEADERS[HEADERS.length - 1]) {
      throw new Error('Custom brief column has an unexpected header; refusing to append.');
    }
  }
  return sheet;
}

function validateOrder_(order) {
  if (!order) return 'Missing order';
  if (!/^KA-\d{8}-[A-F0-9]{12}$/i.test(String(order.orderId || ''))) return 'Invalid order ID';
  if (!order.customer) return 'Missing customer';
  if (!Array.isArray(order.items) || order.items.length === 0) return 'Missing order items';
  if (order.paymentMethod !== 'Cash on Delivery' && order.paymentMethod !== 'Razorpay') {
    return 'Unsupported payment method: ' + String(order.paymentMethod || '');
  }
  if (!Number.isFinite(Number(order.total))) return 'Invalid order total';
  return '';
}

function safeCell_(value) {
  const text = String(value == null ? '' : value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse_(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
