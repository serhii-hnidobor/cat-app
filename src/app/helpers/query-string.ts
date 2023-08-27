const prepareParam = (
  param: Record<string, string | undefined | number | boolean>
): Record<string, string> => {
  for (const key of Object.keys(param)) {
    const value = param[key];

    if (Number.isNaN(value) || typeof value === "undefined") {
      delete param[key];
      continue;
    }

    param[key] = String(value);
  }

  return param as Record<string, string>;
};

function queryString(param: Record<string, string | undefined | number>) {
  prepareParam(param);

  return new URLSearchParams(param as Record<string, string>).toString();
}

export default queryString;
