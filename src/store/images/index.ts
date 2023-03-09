
export const uploadImage = async (image: File) => {
    const name = image ? image.name : 'image';


    const apiKey = 'fbd4e585a971f27b537805422981bcba';
    const formData = new FormData();
    formData.append('image', image);

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}&name=${replaceName(name)}`, {
            method: 'POST',
            body: formData,
        });

        return await response.json();
    } catch (error) {
        console.log(error);
    }
};


const replaceName = (name: string) => {
    const nameWithoutFormat = name.split('.')[0];

    return nameWithoutFormat;
}
