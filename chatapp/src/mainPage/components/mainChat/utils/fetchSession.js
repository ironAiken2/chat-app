import axios from "axios";

const fetchSession = async (setSessionId) => {
  try {
    await axios.get("http://localhost:8080", {
      withCredentials: true,
    });
    setSessionId(document.cookie.split("=")[1]);
  } catch (error) {
    console.log(error);
  }
};

export default fetchSession;
