type Tokens = {
  accessToken: string;
  refreshToken: string;
};

const setCookie = (tokens: Tokens): void => {
  document.cookie = `accessToken=${tokens.accessToken}; max-age=${
    10 * 60
  }; path=/`; // 60 seconds
  document.cookie = `refreshToken=${tokens.refreshToken}; max-age=${
    30 * 24 * 60 * 60
  }; path=/`;
  console.log("🍪 CURRENT COOKIES →", document.cookie);
};

const getCookie = (cookieName: string): string | undefined => {
  return document.cookie
    .split(";")
    .find((token) => token.trim().split("=")[0] === cookieName)
    ?.split("=")[1];
};

export { setCookie, getCookie };
