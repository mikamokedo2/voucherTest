export function numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  
  function removeNumberWithCommas(x: any) {
    return x.replaceAll(".", "");
  }
  
  export const vouchersData = [
    {
      id: "ABCDEF",
      price: 1000000,
      displayPrice: numberWithCommas(1000000),
    },
    {
      id: "FBCDEF",
      price: 3000000,
      displayPrice: numberWithCommas(3000000),
    },
    {
      id: "YYCDEF",
      price: 5000000,
      displayPrice: numberWithCommas(5000000),
    },
    {
      id: "AFADEF",
      price: 15000000,
      displayPrice: numberWithCommas(15000000),
    },
    {
      id: "ABLKEF",
      price: 20000000,
      displayPrice: numberWithCommas(20000000),
    },
    {
      id: "ABCEEEF",
      price: 25000000,
      displayPrice: numberWithCommas(25000000),
    },
  ];
  