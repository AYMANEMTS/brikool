const displayImage =  (preview,user) => {
    let defaultImageUrl = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
    if (preview) {
        // Condition 1: Show the preview image if the user is updating their image
        return preview;
    } else if (user?.image) {
        // Condition 2: Show the user's uploaded image
        return `http://localhost:8000/${user?.image}`;
    } else {
        // Condition 3: Show a default image when the user has no uploaded image
        return defaultImageUrl;
    }
}
export default displayImage