export function timeSince(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = seconds / 31536000; // 년 단위
    if (interval > 1) {
        return Math.floor(interval) + "년 전";
    }
    interval = seconds / 2592000; // 월 단위
    if (interval > 1) {
        return Math.floor(interval) + "개월 전";
    }
    interval = seconds / 86400; // 일 단위
    if (interval > 1) {
        return Math.floor(interval) + "일 전";
    }
    interval = seconds / 3600; // 시간 단위
    if (interval > 1) {
        return Math.floor(interval) + "시간 전";
    }
    interval = seconds / 60; // 분 단위
    if (interval > 1) {
        return Math.floor(interval) + "분 전";
    }
    return Math.floor(seconds) + "초 전";
}