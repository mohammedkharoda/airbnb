import {ImageConfig} from "@/utils/ImageConfig";
import Image from "next/image";

const Avatar = () => {
    return (
        <>
            <Image className='rounded-full' height='30' width='30' alt='Avatar' src={ImageConfig.USER_LOGO}/>
        </>
    )
}
export default Avatar