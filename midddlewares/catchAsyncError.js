export const catchAsyncError = (passedFunctuon) => (req, res, next) => {
  Promise.resolve(passedFunctuon(req, res, next)).catch(next);
};
