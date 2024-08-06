import axios from "axios";

const serviceKey =
  "K2%2FtyPnwaOZfrMCvSUG10bEQaU8GaFxghNI2voZCpUhGx2UALE2Hn3aXUw4cc0xBYxt%2FWGf%2FoSPRSzd8XuhKvA%3D%3D";

const foodApiStartWith = `http://apis.data.go.kr/1471000/FoodNtrIrdntInfoService1/getFoodNtrItdntList1?serviceKey=${serviceKey}&`;
//   desc_kor=바나나칩&pageNo=1&numOfRows=5&type=json

export const getFoodData = async (food) => {
  const response = await axios.get(
    `${foodApiStartWith}desc_kor=${food}&pageNo=1&numOfRows=5&type=json`
  );
  console.log(response);
  return response.data;
};

// =============================================================================================
// export const getYolo = async (image) => {
//   const formData = new FormData();
//   formData.append("image", image);
//   const response = await axios.post(`http://localhost:5000/detact`, formData, {headers: { 'Content-Type': 'multipart/form-data' }});
//   return response.data;
// };

export const getYolo = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(
      "http://127.0.0.1:5000/detect",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error during YOLO request:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
