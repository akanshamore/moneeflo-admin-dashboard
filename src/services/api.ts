import axios from "axios";

const api = axios.create({
  baseURL: "https://x8ki-letl-twmt.n7.xano.io/api:WAxMY5Nt",
});

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const submitFormData = async (
  formData: {
    basicDetails: { name: string; email: string; phone: string };
    address: {
      addressLine1: string;
      addressLine2: string;
      city: string;
      state: string;
      pincode: string;
      country: string;
    };
    geolocation: { latitude: number; longitude: number } | null;
    data: { multiFiles: string[]; file: string | null };
  },
  token: string
) => {
  const response = await api.post("/data_table", formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
