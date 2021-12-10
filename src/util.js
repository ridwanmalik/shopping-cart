export default function formatCurrency(num) {
  // return "$" + Number(num.toFixed(1)).toLocaleString() + " ";
  return `$${num.toFixed(1)}`;
}
