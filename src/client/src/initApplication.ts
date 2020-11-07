export const initApplication = async () => {
    await fetch('/api/devices/discover');
};
