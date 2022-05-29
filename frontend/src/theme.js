import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
      brand: {
        50: '#F0FFF4',
        500: '#38A169'
      },
      fonts: {
        heading: 'Open Sans, sans-serif',
        body: 'Raleway, sans-serif',
      },
    },
  });

  export default theme