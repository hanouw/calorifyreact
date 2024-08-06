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
// export const getYolo = async (image) => {
//   const formData = new FormData();
//   formData.append("image", image);
//   const response = await axios.post(`http://localhost:5000/detact`, formData, {headers: { 'Content-Type': 'multipart/form-data' }});
//   return response.data;
// };

export const getYolo = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await axios.post(
      "http://127.0.0.1:5000/detect",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // 이미지 전송 시의 Content-Type 설정
        },
        withCredentials: true, // 필요시 쿠키 등을 전송할 때 사용
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error during YOLO request:", error);
    throw error; // 필요시 호출한 함수에서 에러를 처리하도록 하기 위해 에러를 던짐
  }
};
