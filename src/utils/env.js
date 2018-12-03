let baseUrl = '';
let accessUrl = '';

let host = window.location.host;   
if (host === 'wdjzt88.com' ||host ==='www.wdjzt88.com') {	
	baseUrl ="https://prod.wdjzt88.com/";
	accessUrl="http://www.wdjzt88.com/";
			
}else{
    baseUrl = 'http://test.api.wdjzt88.com/';
	accessUrl="http://test.wdjzt88.com/";
}

export {
  baseUrl,
  accessUrl
}
