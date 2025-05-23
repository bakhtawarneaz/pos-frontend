import React, { useEffect, useRef, useState } from 'react'

/* icons...*/
import Arrow from  '@icon/arrow';

/* styles...*/
import '@styles/_home.css'

/* View...*/
import Products from '@view/Products'
import SalesAndPurchases from '@view/SalesAndPurchases'

/* components...*/
import TableComponent from '@components/TableComponent';
import ButtonLoader from '@components/ButtonLoader';

/* api...*/
import { getDashboard, getDashboardData } from '@api/dashboardApi';

/* hooks... */
import { useMutation } from '@tanstack/react-query';

/* packages...*/
import DatePicker from "react-multi-date-picker";

/* assets...*/
import usericon from '@assets/user.png'


const Home = () => {

  /* Variables Here...*/
  const initialData = {
      totalPurchases: 0,
      totalSales: 0,
      totalSalesReturns: 0,
      totalPurchaseReturns: 0,
      topProducts: [],
      monthlyStats: [],
      stockAlerts: [],
      recentInvoices: [],
  };

    /* UseState Here...*/
  const [data, setData] = useState(initialData);
  const [dateRange, setDateRange] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isManualSearch, setIsManualSearch] = useState(false);
  const datePickerRef = useRef(null);
  const isMounted = useRef(false);
  let hasFetchedDashboard = false;

  useEffect(() => {
    isMounted.current = true;
    if (!hasFetchedDashboard) {
        hasFetchedDashboard = true;
        setIsPageLoading(true);
        getDashboard()
        .then((res) => {
            if (isMounted.current) setData(res.data);
        })
        .finally(() => {
            if (isMounted.current) {
            setIsManualSearch(false);
            setIsPageLoading(false);
            }
        });
    }
    return () => {
        isMounted.current = false;
    };
  }, []);

   const mutation = useMutation({
    mutationFn: (payload) => getDashboardData(payload),
    onSuccess: (res) => {
      if (isMounted.current) {
        setData(res.data);
      }
    },
    onSettled: () => {
      if (isMounted.current) {
        setIsManualSearch(false);
      }
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setIsManualSearch(true);
    setData(initialData);
    const [startDate, endDate] = dateRange;
    const PAY_LOAD = {
      start_date: startDate ? new Date(startDate).toISOString().split('T')[0] : null,
      end_date: endDate ? new Date(endDate).toISOString().split('T')[0] : null,
    };
    mutation.mutate(PAY_LOAD);
  };

   const handleClear = (e) => {
    e.preventDefault();
    setIsManualSearch(true);
    setDateRange([]);
    setData(initialData);
    getDashboard().then(res => setData(res.data)).finally(() => setIsManualSearch(false));
  };

  const handleDateChange = (value) => {
    setDateRange(value);
    if (value.length === 2) {
      datePickerRef.current.closeCalendar();
    }
  };


{/*  Stock Alert Columns */}

const productColumns = [
    { key: "id", label: "ID" },
    {
      key: "product_img",
      label: "Image",
      render: (row) => <img 
        src={row.product_img || usericon } 
        alt={row.name} 
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = usericon;
        }} 
      />,
    },
    { key: "code", label: "Code" },
    { key: "name", label: "Name" },
    { key: "qty", label: "Qty" },
];

{/*  Invoices Columns */}

const invoiceColumns = [
    { key: "id", label: "ID" },
    { key: "invoice_mode", label: "Invoice Mode" },
    { key: "invoice_type", label: "Invoice Type" },
    { key: "total", label: "Amount" },
];

const isSearchDisabled = dateRange.length < 2;
const isLoading = isPageLoading || isManualSearch || mutation.isPending;

  return (
    <div className='home_wrap'>
        <div className='heading'>
            <div className='heading_wrap'>
                <h2>dashboard</h2>
                <p>here's your statistics overview.</p>
            </div>
            <form>
              <div className='form_group custom_date_picker'>
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
                  />
              </div>
              <div className='btn_group'>
                <button onClick={handleSearch} disabled={isSearchDisabled}>
                  {isManualSearch  ? (
                        <ButtonLoader />
                      ) : (
                        "search"
                  )}
                </button>
                <button onClick={handleClear} disabled={isSearchDisabled}>clear</button>
              </div>
            </form>
        </div>
        <div className='top_box'>
            <div className='box'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart h-4 w-4 small"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
                <h3>total purchases</h3>
                <div className='value'>{isLoading ? <ButtonLoader /> : data.totalPurchases || 0}</div>
                <span>view details<Arrow /></span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart h-4 w-4 big"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
            </div>
            <div className='box'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag h-4 w-4 small"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                <h3>total sales</h3>
                <div className='value'>{isLoading ? <ButtonLoader /> : data.totalSales || 0}</div>
                <span>view details<Arrow /></span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag h-4 w-4 big"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            </div>
            <div className='box'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-box h-4 w-4 small"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>
                <h3>total sales returns</h3>
                <div className='value'>{isLoading ? <ButtonLoader /> : data.totalSalesReturns || 0}</div>
                <span>view details<Arrow /></span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-box h-4 w-4 big"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>
            </div>
            <div className='box'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-4 w-4 small"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <h3>total purchase returns</h3>
                <div className='value'>{isLoading ? <ButtonLoader /> : data.totalPurchaseReturns || 0}</div>
                <span>view details<Arrow /></span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-4 w-4 big"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
        </div>
        <div className='chart_wrap'>
            <div className='chart_box'>
                <p className="title">products</p>
                <p className="disc">top selling products</p>
                <div className='product_chart'>
                    <Products data={data?.topProducts} isLoading={isLoading} />
                </div>
            </div>
            <div className='chart_box'>
                <p className="title">purchases & sales</p>
                <p className="disc">this month purchases & sales</p> 
                <SalesAndPurchases data={data?.monthlyStats} isLoading={isLoading} /> 
            </div>
        </div>
        {/* Table */}
        <div className='dashboard_table_wrap'>
            <div className='dashboard_table_body'>
                <p className="title">stock alert</p>
                <TableComponent 
                    columns={productColumns}
                    data={data?.stockAlerts || []}
                    isLoading={isLoading}
                    showAction={false}
                    showSummary={true}
                    showPagination={false}
                />
            </div>
            <div className='dashboard_table_body'>
                <p className="title">recent invoices</p>
                <TableComponent 
                    columns={invoiceColumns}
                    data={data?.recentInvoices || []}
                    isLoading={isLoading}
                    showAction={false}
                    showSummary={true}
                    showPagination={false}
                />
            </div>
        </div>
    </div>
  )
}

export default Home
