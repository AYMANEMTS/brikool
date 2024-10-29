function formatDate(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);

    const isSameDay = now.toDateString() === date.toDateString();
    const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === date.toDateString();
    const isSameYear = now.getFullYear() === date.getFullYear();

    const formatTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    if (isSameDay) {
        return formatTime; // Same day, show time only (e.g., 12:40AM)
    } else if (isYesterday) {
        return `Yesterday, ${formatTime}`; // Yesterday, show "Yesterday" and time (e.g., Yesterday, 12:40AM)
    } else if (isSameYear) {
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) + `, ${formatTime}`; // Same year, show month, day, and time (e.g., October 5, 12:30AM)
    } else {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + `, ${formatTime}`; // Different year, show year, month, day, and time (e.g., 2022, March 12, 12:22AM)
    }
}
export default formatDate