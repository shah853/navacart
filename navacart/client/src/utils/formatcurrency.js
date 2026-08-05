export const formatCurrency = (amount) => {
    if(amount === null || amount === undefined) {
        return "$0.00";
    }
    return new Intl.NumberFormat("en-PK", {
        style: "currency",
        currency: "PKR",
    }).format(amount);
};