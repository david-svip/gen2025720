export const getDataTsApi = () => {
  return httpRequest.request('http://localhost:3100','GET',{},{ server: true });
}

export const getHomeJsonApi = () => {
  const url = 'http://localhost:3100/home.json';
  return httpRequest.request(url,'GET',{},{
    responseType: 'json',
    cache: 'no-cache',
  })
}

export const getVideoBlobApi = () => {
  const url = 'http://localhost:3100/video-blob-test';
  return httpRequest.request(url,'GET');
}
