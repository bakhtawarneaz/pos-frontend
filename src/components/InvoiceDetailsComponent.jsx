import React from 'react';

const InvoiceDetailsComponent = ({ invoice }) => {
  
    const INVOICE_MODE_MAP = {
        1: "Purchase",
        2: "Sale",
        3: "Purchase Return",
        4: "Sale Return"
    };
      
    const INVOICE_TYPE_MAP = {
        1: "Company",
        2: "Customer"
    };
  
  
    if (!invoice) return null;

  return (
    <div className="invoice-details-modal">
      <h2>Invoice #{invoice.id}</h2>
      <p><strong>Date:</strong> {invoice.date ? new Date(invoice.date).toLocaleDateString('en-GB') : '-'}</p>
      <p><strong>Invoice Mode:</strong> {INVOICE_MODE_MAP[invoice.invoice_type] || '-'}</p>
      <p><strong>Invoice Type:</strong> {INVOICE_TYPE_MAP[invoice.type] || '-'}</p>
      <p><strong>Brand ID:</strong> {invoice.brand_id || '-'}</p>
      <p><strong>Customer ID:</strong> {invoice.customer_id || '-'}</p>
      <p><strong>Transport:</strong> {invoice.transport_name || '-'}</p>
      <p><strong>Party:</strong> {invoice.party_name || '-'}</p>
      <p><strong>Booker:</strong> {invoice.booker_name || '-'}</p>
      <p><strong>Total:</strong> {invoice.total || '-'}</p>

      <hr />
      <h3>Invoice Items</h3>
      <table className="invoice-items">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Gross</th>
            <th>GST</th>
            <th>Discount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.InvoiceDetails?.map((item) => (
            <tr key={item.id}>
              <td>{item.product_name}</td>
              <td>{item.quantity}</td>
              <td>{item.rate}</td>
              <td>{item.gross_amount}</td>
              <td>{item.gst_amount}</td>
              <td>{item.discount_amount}</td>
              <td>{item.total_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceDetailsComponent;
