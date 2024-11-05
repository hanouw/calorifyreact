import axios from "axios";

export const CALORIFY_API_SERVER_HOST = "http://localhost:8083";

export const loginPost = async (loginParam) => {
  const header = { Headers: { "Content-Type": "x-www-form-urlencoded" } };
  console.log(loginParam.memId);
  console.log(loginParam.password);
  const form = new FormData();
  form.append("username", loginParam.memId);
  form.append("password", loginParam.password);

  console.log(loginParam);

  const response = await axios.post(
    `${CALORIFY_API_SERVER_HOST}/api/login`,
    form,
    header
  );

  return response.data;
};

export const register = async (val) => {
  console.log("register 실행", val);
  const header = { Headers: { "Content-Type": "application/json" } };

  const response = await axios.post(
    `${CALORIFY_API_SERVER_HOST}/members`,
    val,
    header
  );
  if (response.data.error == "ERROR_LOGIN") {
    return response.data;
  } else {
    return { memId: val.memId, password: val.password };
  }
};

// export const deleteMember = async (mid) => {
//   console.log("deleteMember 실행");
//   const response = await axios.delete(
//     `${CALORIFY_API_SERVER_HOST}/members/${mid}`
//   );
//   return response.data;
// };

export const idIsduplicate = async (name) => {
  const response = await axios.get(
    `${CALORIFY_API_SERVER_HOST}/members/${name}`
  );
  return response.data;
};

export const getMemInfo = async ({ memId }) => {
  console.log("getMeminfo 실행");
  const response = await axios.get(
    `${CALORIFY_API_SERVER_HOST}/members/mem-info/${memId}`
  );
  console.log(response);
  return response.data.RESULT;
};
