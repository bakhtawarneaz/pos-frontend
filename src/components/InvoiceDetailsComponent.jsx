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
    <>
      <div className="invoice_detail_wrap">
        <h2>Invoice #{invoice.id}</h2>
        <div className="invoice_detail_top">
          <p><strong>Date:</strong> {invoice.date ? new Date(invoice.date).toLocaleDateString('en-GB') : '-'}</p>
          <p><strong>Invoice Mode:</strong> {INVOICE_MODE_MAP[invoice.invoice_mode] || '-'}</p>
          <p><strong>Invoice Type:</strong> {INVOICE_TYPE_MAP[invoice.invoice_type] || '-'}</p>
          <p><strong>Per Balance:</strong> {invoice.per_balance || '-'}</p>
          {invoice.bilty_no && (
            <p><strong>Bilty No:</strong> {invoice.bilty_no}</p>
          )}
          {invoice.vehicle_no && (
            <p><strong>Vehicle No:</strong> {invoice.vehicle_no}</p>
          )}
          {invoice.delivery_no && (
            <p><strong>Delivery No:</strong> {invoice.delivery_no}</p>
          )}
          {invoice.transport_name && (
            <p><strong>Transport Name:</strong> {invoice.transport_name}</p>
          )}
          {invoice.party_name && (
            <p><strong>Party Name:</strong> {invoice.party_name}</p>
          )}
          {invoice.party_code && (
            <p><strong>Party Code:</strong> {invoice.party_code}</p>
          )}
          {invoice.area_name && (
            <p><strong>Area Name:</strong> {invoice.area_name}</p>
          )}
          {invoice.booker_name && (
            <p><strong>Booker:</strong> {invoice.booker_name}</p>
          )}
          {invoice.reason && (
            <p><strong>Reason:</strong> {invoice.reason}</p>
          )}
        </div>
        <h2>Invoice Items</h2>
        <div className="invoice_detail_item">
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Code</th>
                <th>Product Name</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Gross</th>
                <th>GST</th>
                <th>Discount</th>
                <th>Damage</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.InvoiceDetails?.map((item) => (
                <tr key={item.id}>
                  <td>{item.product_id}</td>
                  <td>{item.product_code}</td>
                  <td>{item.product_name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.rate}</td>
                  <td>{item.gross_amount}</td>
                  <td>{item.gst_amount}</td>
                  <td>{item.discount_amount}</td>
                  <td>{item.damage_amount}</td>
                  <td>{item.total_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="summary_invoice_detail">
          <div className="summary_container">
              <div className="summary_row">
                <span className="label">Gross Amount Total</span>
                <span className="value">{invoice.gross_amount_total || '-'}</span>
              </div>
              <div className="summary_row">
                <span className="label">GST Amount Total</span>
                <span className="value">{invoice.gst_amount_total || '-'}</span>
              </div>
              <div className="summary_row">
                <span className="label">Discount Amount Total</span>
                <span className="value">{invoice.discount_amount_total || '-'}</span>
              </div>
              <div className="summary_row">
                <span className="label">Damage Amount Total</span>
                <span className="value">{invoice.damage_amount_total || '-'}</span>
              </div>
              <div className="summary_row">
                <span className="label">Extra Discount</span>
                <span className="value">{invoice.extra_discount || '-'}</span>
              </div>
              <div className="summary_row">
                <span className="label">Total</span>
                <span className="value">{invoice.total || '-'}</span>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default InvoiceDetailsComponent;
