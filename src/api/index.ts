import axios from "axios";

interface payloadProps {

}

export const sendChat = async (id: string, newAccessToken: string) => {
    const {
      data: { data },
    } = await axios.get(`https://adewole.pythonanywhere.com/api/${id}/History/ListChatIdentifiers/`,
          {
            headers: {
              Authorization: 'Bearer ' + newAccessToken,
            },
          }
        );
    return data;
  };