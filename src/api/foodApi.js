const foodApiStartWith =
  "http://apis.data.go.kr/1471000/FoodNtrIrdntInfoService1/getFoodNtrItdntList1?serviceKey=K2%2FtyPnwaOZfrMCvSUG10bEQaU8GaFxghNI2voZCpUhGx2UALE2Hn3aXUw4cc0xBYxt%2FWGf%2FoSPRSzd8XuhKvA%3D%3D&desc_kor=바나나칩&pageNo=1&numOfRows=5&type=json";

import axios from "axios";

export const getFoodData = async ({ food }) => {
  const response = await axios.get(``);
};
