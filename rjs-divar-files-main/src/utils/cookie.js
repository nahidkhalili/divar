const setCookie = (tokens) => {
  console.log("set", tokens.accessToken, tokens.refreshToken);
  document.cookie = `accessToken=${tokens.accessToken} ; max-age=${1 * 60}`; // 60 seconds
  document.cookie = `refreshToken=${tokens.refreshToken} ; max-age=${
    30 * 24 * 60 * 60
  }`;
};

const getCookie = (cookieName) => {
  return document.cookie
    .split(";")
    .find((token) => token.trim().split("=")[0] === cookieName)
    ?.split("=")[1];
};

export { setCookie, getCookie };
