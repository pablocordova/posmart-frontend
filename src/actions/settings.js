import axios from 'axios'

const GET_PRINTER_DATA_PATH = '/printerinfo'
const SETTINGS_PATH = '/settings'

const getPrinterData = () => {

  return () => {

    return axios.get(
      process.env.REACT_APP_SERVER_PATH + SETTINGS_PATH + GET_PRINTER_DATA_PATH,
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
        }
      }
    )
      .then(response => {
        console.log('Printer info')
        console.log(response.data.result)
      })
  }

}

export { getPrinterData }