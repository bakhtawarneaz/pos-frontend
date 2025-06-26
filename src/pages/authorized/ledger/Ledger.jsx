import React, { useState, useRef } from 'react';

/* packages */
import { useForm, Controller, useWatch } from 'react-hook-form';
import Select from 'react-select';
import DatePicker from 'react-multi-date-picker';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

/* hooks */
import { useLedger } from '@hooks/useMutation';
import { useFetchBrand, useFetchCustomer } from '@hooks/useQuery';

/* components */
import ButtonLoader from '@components/ButtonLoader';
import TableBlank from '@components/TableBlank';

/* icons...*/
import { RiFileExcel2Line } from "react-icons/ri";

const Ledger = () => {
  const { control, handleSubmit, reset, getValues } = useForm();
  const [ledgerData, setLedgerData] = useState({ brands: [], customers: [] });
  const [dateRange, setDateRange] = useState([]);
  const datePickerRef = useRef();

  const brandId = useWatch({ control, name: 'brand_id' });
  const customerId = useWatch({ control, name: 'customer_id' });

  const { data: brandData } = useFetchBrand({ page: 1, perPage: 'all' });
  const { data: customerData } = useFetchCustomer({ page: 1, perPage: 'all' });

  const brandList = brandData?.data?.data || [];
  const customerList = customerData?.data?.data || [];
  const isLedgerEmpty = !ledgerData?.brands?.length && !ledgerData?.customers?.length;

  const ledgerMutation = useLedger(reset, (res) => {
    const safeData = {
      brands: res?.data?.brands || [],
      customers: res?.data?.customers || [],
    };
    setLedgerData(safeData);
  });

  const handleDateChange = (range) => {
    setDateRange(range);
  };

  const onSubmit = () => {
    const values = getValues();
    const payload = {
      brand_ids: values.brand_id ? [values.brand_id] : [],
      customer_ids: values.customer_id ? [values.customer_id] : [],
      from_date: dateRange?.[0]?.toISOString?.() || null,
      to_date: dateRange?.[1]?.toISOString?.() || null,
    };

    if (!payload.brand_ids.length && !payload.customer_ids.length) {
      toast.error('Please select at least Brand or Customer');
      return;
    }

    ledgerMutation.mutate(payload);
  };

  const handleClear = () => {
    reset();
    setDateRange([]);
    setLedgerData({ brands: [], customers: [] });
  };


  const handleDownloadExcel = () => {
    const combinedData = [
      ...ledgerData.brands.map(item => ({
        Type: 'Brand',
        Name: item.brand_name,
        Date: new Date(item.date).toLocaleDateString('en-GB'),
        Description: item.description,
        Debit: item.debit,
        Credit: item.credit,
        Balance: item.balance
      })),
      ...ledgerData.customers.map(item => ({
        Type: 'Customer',
        Name: item.customer_name,
        Date: new Date(item.date).toLocaleDateString('en-GB'),
        Description: item.description,
        Debit: item.debit,
        Credit: item.credit,
        Balance: item.balance
      }))
    ];
  
    const worksheet = XLSX.utils.json_to_sheet(combinedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ledger');
  
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'ledger.xlsx');
  };

  const renderTableRows = () => (
    <>
      {ledgerData?.brands?.map((item, index) => (
        <tr key={`brand-${index}`}>
          <td>Brand</td>
          <td>{item.brand_name}</td>
          <td>{new Date(item.date).toLocaleDateString('en-GB')}</td>
          <td>{item.description}</td>
          <td>{item.debit}</td>
          <td>{item.credit}</td>
          <td>{item.balance}</td>
        </tr>
      ))}
      {ledgerData?.customers?.map((item, index) => (
        <tr key={`customer-${index}`}>
          <td>Customer</td>
          <td>{item.customer_name}</td>
          <td>{new Date(item.date).toLocaleDateString('en-GB')}</td>
          <td>{item.description}</td>
          <td>{item.debit}</td>
          <td>{item.credit}</td>
          <td>{item.balance}</td>
        </tr>
      ))}
    </>
  );

  return (
    <div className="product_tracking_wrap">
      <div className="form_header_buttons">
        <button type="button" className="btn" onClick={handleDownloadExcel} disabled={isLedgerEmpty}>
            <RiFileExcel2Line />
            <span>download excel</span>
        </button>
      </div>
      <div className="product_tracking_form ledger_wrap">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form_group">
            <label>Brand</label>
            <Controller
              control={control}
              name="brand_id"
              render={({ field }) => {
                const selectedOption = brandList.find((b) => b.id === field.value);
                return (
                  <Select
                    {...field}
                    isDisabled={!!customerId}
                    options={brandList.map((b) => ({ label: b.name, value: b.id }))}
                    placeholder="Select Brand"
                    className="invoice_react_select"
                    isSearchable
                    value={
                      selectedOption
                        ? { label: selectedOption.name, value: selectedOption.id }
                        : null
                    }
                    onChange={(selected) => field.onChange(selected?.value)}
                    styles={{
                      control: (base) => ({ ...base, fontFamily: '"Poppins", system-ui' }),
                      input: (base) => ({ ...base, fontFamily: '"Poppins", system-ui' }),
                      option: (base) => ({ ...base, fontFamily: '"Poppins", system-ui' }),
                    }}
                  />
                );
              }}
            />
          </div>

          <div className="form_group">
            <label>Customer</label>
            <Controller
              control={control}
              name="customer_id"
              render={({ field }) => {
                const selectedOption = customerList.find((c) => c.id === field.value);
                return (
                  <Select
                    {...field}
                    isDisabled={!!brandId}
                    options={customerList.map((c) => ({ label: c.name, value: c.id }))}
                    placeholder="Select Customer"
                    className="invoice_react_select"
                    isSearchable
                    value={
                      selectedOption
                        ? { label: selectedOption.name, value: selectedOption.id }
                        : null
                    }
                    onChange={(selected) => field.onChange(selected?.value)}
                    styles={{
                      control: (base) => ({ ...base, fontFamily: '"Poppins", system-ui' }),
                      input: (base) => ({ ...base, fontFamily: '"Poppins", system-ui' }),
                      option: (base) => ({ ...base, fontFamily: '"Poppins", system-ui' }),
                    }}
                  />
                );
              }}
            />
          </div>

          <div className="form_group custom_date_picker">
            <label>Date Range</label>
            <DatePicker
              value={dateRange}
              onChange={handleDateChange}
              ref={datePickerRef}
              range
              numberOfMonths={2}
              dateSeparator=" - "
              placeholder="Select Date Range"
              showOtherDays
              monthYearSeparator="-"
              className="invoice_react_select"
            />
          </div>

          <div className="form_btn_cover">
            <button type="button" className="cancel" onClick={handleClear}>
              Clear
            </button>
            <button type="submit" className="btn" disabled={ledgerMutation.isPending}>
              {ledgerMutation.isPending ? <ButtonLoader /> : 'Search'}
            </button>
          </div>
        </form>
      </div>
      <div className="product_tracking_table">
        {(!ledgerData?.brands?.length && !ledgerData?.customers?.length) ? (
          <TableBlank />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Date</th>
                <th>Description</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Ledger;
