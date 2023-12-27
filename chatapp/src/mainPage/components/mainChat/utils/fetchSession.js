import axios from "axios";

const fetchSession = async () => {
  try {
    const response = await axios.get("http://localhost:8080", {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export default fetchSession;
