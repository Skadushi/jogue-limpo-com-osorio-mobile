
const postWithoutImage = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    }
  }

const postWithImage = {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  }

  const requestsConfigList ={
     reqPostWithoutImage : postWithoutImage,
     reqPostWithImage : postWithImage,
  }

  export default requestsConfigList;