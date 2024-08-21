import axios from "axios";
import { CALORIFY_API_SERVER_HOST } from "./memberApi";

const MEAL_API_SERVER_HOST = CALORIFY_API_SERVER_HOST + "/meal";

export const saveMeal = async ({ imageFile, mealData, loginInfo, date }) => {
  const formData = new FormData();
  // 이미지 파일 리스트를 반복하여 FormData에 추가
  formData.append("image", imageFile);
  formData.append("nutrients", JSON.stringify(mealData));
  formData.append("memId", loginInfo);
  formData.append("date", date);

  const response = await axios.post(`${MEAL_API_SERVER_HOST}/save`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getMeal = async ({ memId, date }) => {
  const response = await axios.get(
    `${MEAL_API_SERVER_HOST}/get/${memId}/${date}`
  );

  return response.data;
};

export const deleteMeal = async ({ mealIdData, memIdData }) => {
  const response = await axios.delete(
    `${MEAL_API_SERVER_HOST}/delete?mealId=${mealIdData}&memId=${memIdData}`
  );
};
