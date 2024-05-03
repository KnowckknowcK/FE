import axios from 'axios';

// 비동기 함수로 변경
export async function fetchUtil(endpoint, options = {}) {
    const api = process.env.REACT_APP_API_URL;
    console.log(api)
    try {
        const axiosInstance = axios.create({
            baseURL: `${api}/api`,
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
        return response.data.data; // 데이터 반환
    } catch (error) {
        console.error(error);
        // 오류 처리 및/또는 오류 데이터 반환
        return null; // 또는 적절한 오류 데이터 반환
    }
}