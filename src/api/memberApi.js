import axios from "axios";

export const CALORIFY_API_SERVER_HOST = "http://localhost:8083";

export const loginPost = async (loginParam) => {
  const header = { Headers: { "Content-Type": "x-www-form-urlencoded" } };
  const form = new FormData();
  form.append("username", loginParam.memId);
  form.append("password", loginParam.password);

  // const object = {};
  // form.forEach((value, key) => {
  //   object[key] = value;
  // });
  // console.log(JSON.stringify(object));

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
  return response.data;
};

export const deleteMember = async (mid) => {
  console.log("deleteMember 실행");
  const response = await axios.delete(
    `${CALORIFY_API_SERVER_HOST}/members/${mid}`
  );
  return response.data;
};

export const nameIsduplicate = async (name) => {
  const response = await axios.get(
    `${CALORIFY_API_SERVER_HOST}/members/name?name=${name}`
  );
  return response.data;
};
