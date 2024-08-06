import axios from "axios";

const serviceKey =
  "K2%2FtyPnwaOZfrMCvSUG10bEQaU8GaFxghNI2voZCpUhGx2UALE2Hn3aXUw4cc0xBYxt%2FWGf%2FoSPRSzd8XuhKvA%3D%3D";

const foodApiStartWith = `http://apis.data.go.kr/1471000/FoodNtrIrdntInfoService1/getFoodNtrItdntList1?serviceKey=${serviceKey}&`;
//   desc_kor=바나나칩&pageNo=1&numOfRows=5&type=json

export const getFoodData = async (food) => {
  const response = await axios.get(
    `${foodApiStartWith}desc_kor=${food}&pageNo=1&numOfRows=1&type=json`
  );
  return response.data;
};

// =============================================================================================
export const getYolo = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const response = await axios.post(`http://localhost:5000/detact`, formData);
  return response.data;
};
