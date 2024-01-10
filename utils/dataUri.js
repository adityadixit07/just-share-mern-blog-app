import DataUriParser from "datauri/parser.js";

import path from "path";

const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  // console.log(extName); //extensionname
  return parser.format(extName, file.buffer);
};

export default getDataUri;
