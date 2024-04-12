export function getDeviceType() {
    const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    return mobile ? "mobile" : "desktop";
}

export function goToLoginPage() {
    localStorage.setItem('unauthorized', "1")
    setTimeout(() => {
        localStorage.setItem('unauthorized', "0")
    }, 1000)
    window.location.href = '/login';
}