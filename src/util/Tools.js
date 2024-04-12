export function getDeviceType() {
    const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    return mobile ? "mobile" : "desktop";
}

export function goToLoginPage() {
    localStorage.setItem('unauthorized', "1")
    localStorage.setItem("isLogin", "0")
    window.location.href = '/login';
}