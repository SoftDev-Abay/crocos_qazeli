import http from "../utils/http";

import {
  WhatsNewRecord,
  WhatsNewRecordsResponse,
} from "../constants/WhatsNewRecordTypes";

export const getWhatsNewRecords = async (page: number, Language: string) => {
  try {
    const response = await http.get(`/whats-new/records?page=${page}`, {
      headers: {
        "Accept-Language": Language,
      },
    });
    return response.data as WhatsNewRecordsResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getWhatsNewRecord = (id: number, Language: string) => {
  return http.get(`/whats-new/records/${id}`, {
    headers: {
      "Accept-Language": Language,
    },
  });
};
