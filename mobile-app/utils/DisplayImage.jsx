const DisplayImage =  (preview,user) => {
    const defaultImageUrl = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
    let imageUrl = preview
        ? preview
        : user?.image
            ? user.googleId
                ? user.image
                : `${process.env.EXPO_PUBLIC_BACKEND_URL}/${user?.image}`
            : defaultImageUrl;

    imageUrl = imageUrl.replace(/\\/g, '/');
    return imageUrl
}
export default DisplayImage
