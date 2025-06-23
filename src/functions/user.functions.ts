//src/functions/user.functions.ts


 function generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6 رقمی
  }


  export {generateOtp};