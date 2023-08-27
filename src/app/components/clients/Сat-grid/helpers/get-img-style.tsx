const getValueForFirstLayout = (imgIndex: number) => {
  switch (imgIndex) {
    case 0: {
      return {
        className: `col-start-1 col-end-2 row-start-1 row-end-3`,
        width: 200,
        height: 300,
      };
    }
    case 1: {
      return {
        className: `col-start-2 col-end-3 row-start-1 row-end-2`,
        width: 200,
        height: 140,
      };
    }
    case 2: {
      return {
        className: `col-start-3 col-end-4 row-start-1 row-end-2`,
        width: 200,
        height: 140,
      };
    }
    case 3: {
      return {
        className: `col-start-1 col-end-2 row-start-3 row-end-4`,
        width: 200,
        height: 140,
      };
    }
    case 4: {
      return {
        className: `col-start-2 col-end-4 row-start-2 row-end-4`,
        width: 420,
        height: 300,
      };
    }
    default: {
      return { className: "", width: 0, height: 0 };
    }
  }
};

function getImgStyles(blockIndex: number, imgIndex: number) {
  const isFirstLayout = !(blockIndex % 2);

  if (isFirstLayout) {
    return getValueForFirstLayout(imgIndex);
  }

  switch (imgIndex) {
    case 0: {
      return {
        className: `col-start-1 col-end-2 row-start-1 row-end-2`,
        width: 200,
        height: 140,
      };
    }
    case 1: {
      return {
        className: `col-start-2 col-end-3 row-start-1 row-end-2`,
        width: 200,
        height: 140,
      };
    }
    case 2: {
      return {
        className: `col-start-3 col-end-4 row-start-1 row-end-3`,
        width: 200,
        height: 300,
      };
    }
    case 3: {
      return {
        className: `col-start-1 col-end-3 row-start-2 row-end-4`,
        width: 420,
        height: 300,
      };
    }
    case 4: {
      return {
        className: `col-start-3 col-end-4 row-start-3 row-end-4`,
        width: 200,
        height: 140,
      };
    }
    default: {
      return { className: "", width: 0, height: 0 };
    }
  }
}

export default getImgStyles;
