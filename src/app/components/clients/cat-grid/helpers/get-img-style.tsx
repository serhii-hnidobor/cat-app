function getImgStyles(blockIndex: number, imgIndex: number) {
    const isFirstLayout = !Boolean(blockIndex % 2);

    const getValueForFirstLayout = () => {
        switch (imgIndex) {
            case 0: {
                return `col-start-1 col-end-2 row-start-1 row-end-3`;
            }
            case 1: {
                return `col-start-2 col-end-3 row-start-1 row-end-2`
            }
            case 2: {
                return `col-start-3 col-end-4 row-start-1 row-end-2`
            }
            case 3: {
                return `col-start-1 col-end-2 row-start-3 row-end-4`
            }
            case 4: {
                return `col-start-2 col-end-4 row-start-2 row-end-4`;
            }
            default: {
                return '';
            }
        }
    }

    if (isFirstLayout) {
      return getValueForFirstLayout();
    }

    switch (imgIndex) {
        case 0: {
            return `col-start-1 col-end-2 row-start-1 row-end-2`;
        }
        case 1: {
            return `col-start-2 col-end-3 row-start-1 row-end-2`
        }
        case 2: {
            return `col-start-3 col-end-4 row-start-1 row-end-3`
        }
        case 3: {
            return `col-start-1 col-end-3 row-start-2 row-end-4`;
        }
        case 4: {
            return `col-start-3 col-end-4 row-start-3 row-end-4`
        }
        default: {
            return '';
        }
    }
}

export default getImgStyles;