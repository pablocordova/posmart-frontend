import axios from 'axios'
import google from 'googleapis'

const GET_PRINTER_DATA_PATH = '/list'
var instance = axios.create();

instance.defaults.headers.common['Authorization'] = 'OAuth ' + localStorage.getItem('googleToken')

var OAuth2 = google.auth.OAuth2
const redirect_url = 'http://localhost:3001/setting'
var oauth2Client = new OAuth2(
  '193086894675-510ggki4pbe16ntvmuhqotr3bojhte96.apps.googleusercontent.com',
  'OUG7KOIqd_mV1517jEwAkMku',
  redirect_url
)
var url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://www.googleapis.com/auth/cloudprint'
});

const getTokenGoogle = () => {
  return () => {
    var win = window.open(url, 'Authentification Printer', 'width=800,height=600')
    var pollTimer = window.setInterval(function() {
      if (win.document.URL.indexOf(redirect_url) !== -1) {
        window.clearInterval(pollTimer)
        const url_all = win.document.URL
        const indexCode = url_all.indexOf('code')
        const authorizationCode = url_all.substring(indexCode + 5);
        win.close()
        oauth2Client.getToken(authorizationCode, function (err, tokens) {
          if (!err) {
            localStorage.setItem('googleToken', tokens.access_token)
            console.log(tokens.access_token)
          }
        })
      }
    }, 100);
  }
}

const getPrinterData = () => {

  return () => {
    return instance.get(
      process.env.REACT_APP_GOOGLE_PRINT_PATH + GET_PRINTER_DATA_PATH,
      {
        params: {
          proxy: '9ff10dfa-866d-40a5-afbe-563771671def'
        }
      }
    )
      .then(response => {
        console.log('response of google cloud print')
        console.log(response)
      })
  }

}

export { getPrinterData, getTokenGoogle }