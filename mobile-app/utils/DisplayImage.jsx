const DisplayImage =  (preview,user) => {
    const defaultImageUrl = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
    if (preview) {
        return preview;
    } else if (user?.image) {
        if (user.googleId){
            return user.image
        }else{
            return `${process.env.EXPO_PUBLIC_BACKEND_URL}/${user?.image}`;
        }
    } else {
        return defaultImageUrl;
    }
}
export default DisplayImage
