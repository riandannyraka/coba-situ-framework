import { environment } from './../../environments/environment';
/**
 * Igracias Gen 2 Base Endpoint class
 * https://www.telkomuniversity.ac.id
 * adityazulkarnain@telkomuniversity.ac.id
 */

// Define API URL and API Version Here
/**
 * IG2 API Live
 *
 */
const API_LIVE = 'https://gateway.telkomuniversity.ac.id';
const API = environment.apiUrl;
const APP_CODE = 208;

/**
 * General Config
 */
// const API_VERSION = 'v1';

export class Endpoint {

  getUrl(namespace: any, key: any, context: any) {
    /*
    * Endpoint Object you can create object based on endpoint namespace
    * example the namespace of endpoint is user you can create user object on endpoint base object
    * You can create key inside endpoint namespace, key is defined as endpoint namespace key
    * example url is user/profile
    * you can create object like this
    * user : {
    *   profile:`${API}/user/profile`
    * }
    */
    const ENDPOINT = {
      oauth: {
        access_token: `${API}/issueauth`,
        user_profile: `${API}/issueprofile`,
        user_scope: `${API}/issuescope/${APP_CODE}`
      },
      dokumen: {
        get_document: `${API}/539377bbba3b257766056fe60bc04c98/${context}`,
        create_document: `${API}/c5a27f890c837cbc63802ca3d6f06e40`,
        update_document: `${API}/8b5d5ab2f56e9ad000f1e31b43f1a50b`
      },
      dashboard: {
        get_all_data_pegawai: `${API}/2200e114e171737b3588a912a77db23d/${context}`
      }
    };
    return ENDPOINT[namespace] && ENDPOINT[namespace][key];
  }
}
