import axios from 'axios';
import { BASE_URL } from "../config";

// 비동기 함수로 변경
export async function fetchUtil(endpoint, options = {}) {
    try {
        const axiosInstance = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
        });

        const axiosOptions = {
            method: options.method || 'GET',
            url: endpoint,
            data: options.body || {},
        };

        if (axiosOptions.method === 'GET') {
            delete axiosOptions.data;
        }

        const response = await axiosInstance(axiosOptions);
        console.log((response.data))
        return response.data; // 데이터 반환
    } catch (error) {
        console.error(error);
        // 오류 처리 및/또는 오류 데이터 반환
        return null; // 또는 적절한 오류 데이터 반환
    }
}
