export const getMenuByRole = (roleId) => {
    const role = Number(roleId);
    switch (role) {
        case 1: 
            return ['Dashboard', 'Product', 'Product Tracking', 'Brand', 'Customer', 'Employee', 'Invoice', 'Voucher', 'Area', 'Bank', 'User', 'Role'];
        case 2:
            return ['Dashboard', 'Invoice', 'Voucher'];
        default:
            return [];
    }
};
