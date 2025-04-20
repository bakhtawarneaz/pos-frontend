export const getDynamicPath = (basePath, subPath = '') => {

    return `/dashboard${basePath}${subPath ? `/${subPath}` : ''}`;
    
};