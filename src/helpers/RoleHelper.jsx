export const getMenuByRole = (roleId) => {
    const role = Number(roleId);
    switch (role) {
        case 1: 
            return ['Dashboard', 'Product', 'Product Tracking', 'Brand', 'Customer', 'Employee', 'Invoice', 'Report', 'Voucher', 'Area', 'Bank'];
        case 2:
            return ['Dashboard', 'Invoice', 'Report', 'Voucher'];
        default:
            return [];
    }
};
