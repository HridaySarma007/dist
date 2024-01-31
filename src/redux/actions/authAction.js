import { LOGIN_SUCCESS, LOGIN_FAIL, SET_MESSAGE } from "./types";
import api from "../../utils/index";

export const login = (username, password) => async (dispatch) => {

  try {
    const res = await api.post("auth/signin", {
      username: username,
      password: password,
    });

    const store = {
      user: res.data.data.userProfile,
      token: res.data.data.accessToken,
    };

    dispatch({ type: LOGIN_SUCCESS, payload: store });
    window.localStorage.setItem("user", JSON.stringify(store.user));
    window.localStorage.setItem("token", JSON.stringify(store.token));
    //success message
  } catch (err) {
    console.log(err.response.data.error.details);
    const message =
      (err.response && err.response.data && err.response.data.error.details) ||
      err.details ||
      err.toString();

    dispatch({
      type: LOGIN_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
  }
};



export const logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
};

/*
store user
{
  "name": "eni ",
  "username": "endoryo",
  "role": "ADMIN",
  "phone": "9876543210",
  "email": "example@email.com",
  "password": "H0p35566@123",
  "state": "ASSAM"
}


get users
{
  "data": [
    {
      "id": "6183d14d0003d66da3f72bf3",
      "name": "Joe ",
      "username": "joe",
      "role": "ADMIN",
      "email": "example@email.com",
      "password": "$2b$10$4x0oVCbAvn7z4ZsbNhA8n.yOUxRlEfUilOjTJTQErx6n.yip74Fqe",
      "state": "ASSAM",
      "isActive": true
    },
    {
      "id": "6183d14d0003d66da3f72bf4",
      "name": "Joe ",
      "username": "joe",
      "role": "ADMIN",
      "email": "example@email.com",
      "password": "$2b$10$4BCtGAHH/uTQJ5UtmOCOxuvXAp7YLYxnzw7cB68Ob1O9C512MgE.C",
      "state": "ASSAM",
      "isActive": true
    },
    {
      "id": "6183d1520003d66da3f72bf5",
      "name": "Joe ",
      "username": "jo",
      "role": "ADMIN",
      "email": "example@email.com",
      "password": "$2b$10$Vm4rD0MgjfxQT2QPNWGj7.gX66GgCwYvnZkhTSB5EaaV0h7Oq/wZK",
      "state": "ASSAM",
      "isActive": true
    },
    {
      "id": "6183d15b0003d66da3f72bf6",
      "name": "Joe ",
      "username": "jome",
      "role": "ADMIN",
      "email": "example@email.com",
      "password": "$2b$10$5Au9C6QniNgNOTmGRE2sSu1PbN8xL0RUCO0yI1179iPJB1k1M312q",
      "state": "ASSAM",
      "isActive": true
    },
    {
      "id": "6183d15f0003d66da3f72bf7",
      "name": "Joe ",
      "username": "jomeo",
      "role": "ADMIN",
      "email": "example@email.com",
      "password": "$2b$10$1TS5SpxuF9WRNG4yvHot8.YjqATrxV7kcKY4nIh9ElaLhTYSjvutO",
      "state": "ASSAM",
      "isActive": true
    },
    {
      "id": "6183d1620003d66da3f72bf8",
      "name": "Joe ",
      "username": "jomeor",
      "role": "ADMIN",
      "email": "example@email.com",
      "password": "$2b$10$V5pfDvAsfgCl14YpVHZlEu81pN6e5OEwagZ6u0HAnTXHuMxX5Xd5G",
      "state": "ASSAM",
      "isActive": true
    },
    {
      "id": "6183d1670003d66da3f72bf9",
      "name": "Joe ",
      "username": "jomeorx",
      "role": "ADMIN",
      "email": "example@email.com",
      "password": "$2b$10$zT9Efm5pvQEe.aV.aqhpNOfnbFfGFDDmP8NvWJVhMVKZcwCFKoFz.",
      "state": "ASSAM",
      "isActive": true
    },
    {
      "id": "6183d16f0003d66da3f72bfa",
      "name": "Joe ",
      "username": "kyle",
      "role": "ADMIN",
      "email": "example@email.com",
      "password": "$2b$10$BtbzJm8sYE99ZeqY2d/Dcei1Fe6.qH.p.4Z/zuN5phiRfr/anQQAW",
      "state": "ASSAM",
      "isActive": true
    },
    {
      "id": "618393c6f1c1b93af05010f1",
      "name": "John ",
      "username": "john",
      "role": "AGENT",
      "email": "example@email.com",
      "password": "$2b$10$W84jjmiP2GMziu/QxcF9puJMB5KdOhTVPj5RWjfGwTjQjnJRYSg46",
      "state": "ASSAM",
      "isActive": true
    },
    {
      "id": "61790003bb0ec600175c00a5",
      "name": "John Smit",
      "username": "johnsmith",
      "role": "ADMIN",
      "email": "example@email.com",
      "password": "$2b$10$KhfEw4H.cETNZw/pzabsveydCCAJd1jGCs13vScycLmuPO8foGyvy",
      "state": "ASSAM",
      "isActive": true
    },
    {
      "id": "617900cabb0ec600175c00a6",
      "name": "John doe",
      "username": "johndoe",
      "role": "AGENT",
      "email": "example@email.com",
      "password": "$2b$10$5OBO5bB6a4y30Ngz4QMIDuAEaVMtunWi0xnDaUU0inR80LuG8B1y2",
      "state": "ASSAM",
      "isActive": true
    },
    {
      "id": "6183d1230003d66da3f72bf0",
      "name": "John th",
      "username": "johnth",
      "role": "ADMIN",
      "email": "example@email.com",
      "password": "$2b$10$EtUad7HWBceWLGPTW6zW5u4XB1PDMh3hAeHcXGWDkaVSeVPEtbjXq",
      "state": "ASSAM",
      "isActive": true
    },
    {
      "id": "6183d13f0003d66da3f72bf2",
      "name": "Jon ",
      "username": "joh",
      "role": "ADMIN",
      "email": "example@email.com",
      "password": "$2b$10$5wU4kOA/z5Zl4/Bx7EDpLuH39lZskiepkBm/97Jb3bS/YsLAlEjjK",
      "state": "ASSAM",
      "isActive": true
    },
    {
      "id": "6183d1310003d66da3f72bf1",
      "name": "Jon th",
      "username": "johnt",
      "role": "ADMIN",
      "email": "example@email.com",
      "password": "$2b$10$o3QavJR0OWISSR4Jueq2vuEf.H0IAgsl10E7bi5kh7tAnA7kmFLq6",
      "state": "ASSAM",
      "isActive": true
    },
    {
      "id": "6178ffa8bb0ec600175c00a4",
      "name": "Super Admin",
      "username": "admin",
      "role": "SUPER_USER",
      "email": "",
      "password": "$2b$10$4wUeaqGXXNozCw2AnfNEtu/jO6y1lcdcbGYcgsACAbjSDxwIAS1RG",
      "state": ""
    },
    {
      "id": "6183d1790003d66da3f72bfb",
      "name": "kyler ",
      "username": "kylem",
      "role": "ADMIN",
      "email": "example@email.com",
      "password": "$2b$10$JwT3nTRQxO5UYnYmFvYJJeZnGZB2CIJ2KXz.JbSwXyylHSM/yrGhC",
      "state": "ASSAM",
      "isActive": true
    },
    {
      "id": "6183d1810003d66da3f72bfc",
      "name": "kyleru ",
      "username": "kylemnu",
      "role": "ADMIN",
      "email": "example@email.com",
      "password": "$2b$10$9XrbNkxCib5l9WXcnUoBce3DvGaP03fqmW4mBOr40ZJPVY7o44PQi",
      "state": "ASSAM",
      "isActive": true
    },
    {
      "id": "6183d1850003d66da3f72bfd",
      "name": "kyleru ",
      "username": "kylemnum",
      "role": "ADMIN",
      "email": "example@email.com",
      "password": "$2b$10$J5.MEJ3Yo/UlI3G/7kpb1.RnrHly0CwpvRFPDCdeNgxpbhfdafUA6",
      "state": "ASSAM",
      "isActive": true
    },
    {
      "id": "6183d18b0003d66da3f72bfe",
      "name": "kylerut ",
      "username": "kylemnm",
      "role": "ADMIN",
      "email": "example@email.com",
      "password": "$2b$10$J4JW.Mnc5fOObqce8jspjeLplW2ScPYwkGgx7DbLtI4t8BI9jBwQi",
      "state": "ASSAM",
      "isActive": true
    },
    {
      "id": "6183d19d0003d66da3f72c00",
      "name": "lert ",
      "username": "lemn",
      "role": "ADMIN",
      "email": "example@email.com",
      "password": "$2b$10$aVnD/zYHqJiuNIxCusSEyu1FXic/pSD0Nw5m2PKNYkG7wQYDH1.Pe",
      "state": "ASSAM",
      "isActive": true
    }
  ],
  "page": 0,
  "countPerPage": 20
}
*/
