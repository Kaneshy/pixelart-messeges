'use client'
import { FormEvent, useEffect, useState, ChangeEvent } from "react";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "@/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Inputs {
    imgUrl?: string;
    videoUrl?: string;
    // Add other fields/types as needed
}

interface UploadProductsPageProps {
    onDataSubmit: (data: Inputs) => void;
}

const UploadProductsPage = ({ onDataSubmit }: UploadProductsPageProps) => {
    const [img, setImg] = useState<File | undefined>(undefined);
    const [video, setVideo] = useState<File | undefined>(undefined);
    const [imgPerc, setImgPerc] = useState<number>(0);
    const [videoPerc, setVideoPerc] = useState<number>(0);
    const [inputs, setInputs] = useState<Inputs>({});
    const router = useRouter()

    useEffect(() => {
        const data: Inputs = { ...inputs };
        console.log(data);

        onDataSubmit(data)
    }, [inputs])


    const uploadFile = (file: File, urlType: string) => {
        const storage = getStorage(app);

        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;

                    case 'storage/unknown':
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev) => {
                        return { ...prev, [urlType]: downloadURL };
                    });
                });
            }
        );
    };

    useEffect(() => {
        video && uploadFile(video, "videoUrl");
    }, [video]);

    useEffect(() => {
        img && uploadFile(img, "imgUrl");
    }, [img]);

    // const handleUpload = async (e: FormEvent<HTMLButtonElement>) => {
    //     e.preventDefault();

    //     const data: Inputs = { ...inputs };
    //     console.log(data);

    //     onDataSubmit(data)

    // }

    const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.files && setImg(e.target.files[0]);

    };

    return (
        <main className="bg-neutral-950 rounded-lg text-white">
            <div className="max-w-xl mx-auto mt-4 p-4 ">
                <h1 className='text-center border-b border-neutral-500    font-bold text-2xl text-white border-a1 pb-2 mb-6 '>Upload your video </h1>


                <div className="mb-4">
                    <label htmlFor="thumbnail" className=" text-gray-400 justify-around gap-x-2 font-bold mb-2 flex  ">
                        <p className="text-small-semibold"> Select thumbnail here</p>
                        <div className="bg-blue-2 text-small-semibold bg-blue text-white p-2 rounded-xl hover:scale-105 transition-transform transform  ">Select form computer</div>
                    </label>
                    {imgPerc > 0 ? ('Uploading ' + imgPerc + '%') : (
                        <input type="file" id="thumbnail" onChange={handleImgChange} className="border-gray-300 hidden" />
                    )}
                </div>

                <div className="max-h-96 flex ">
                    <img className="object-contain "  src={inputs.imgUrl} alt="" />
                </div>
                {/* <button

                    className="bg-blue-1 w-full hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
                    onClick={handleUpload}
                >
                    Submit
                </button> */}
            </div>
        </main >
    )
}



export default UploadProductsPage