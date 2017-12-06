import axios from 'axios'

const SALES_PATH = '/sales'

const getAllReceipts= () => {

  return () => {

    return axios.get(
      process.env.REACT_APP_SERVER_PATH + SALES_PATH,
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
        }
      }
    )
      .then(response => {
        console.log('All receipts')
        console.log(response.data.result)
      })
  }

}

export { getAllReceipts }