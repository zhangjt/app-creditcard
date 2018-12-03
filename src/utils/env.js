let baseUrl = '';
let accessUrl = '';

let host = window.location.host;   
if (host === 'aaa88.com' ||host ==='www.aaa88.com') {	
	baseUrl ="https://prod.aaa88.com/";
	accessUrl="http://www.aaa88.com/";
			
}else{
    baseUrl = 'http://test.api.aaa88.com/';
	accessUrl="http://test.aaa88.com/";
}

export {
  baseUrl,
  accessUrl
}
