export const getMenuByRole = (roleId) => {
    const role = Number(roleId);
    switch (role) {
        case 1: 
            return ['Dashboard', 'Product', 'Brand', 'Customer', 'Employee', 'Invoice', 'Voucher', 'Area', 'Bank'];
        case 2:
            return ['Dashboard', 'Invoice', 'Voucher'];
        default:
            return [];
    }
};
