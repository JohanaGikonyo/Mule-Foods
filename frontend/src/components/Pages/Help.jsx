import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';

function Help() {
    const handlePhoneCall = () => {
        window.location.href = 'tel:+254784267825'
    }
    return (
        <div>
            <div className="flex flex-col justify-around items-center m-10 gap-10 p-5">
                <h1>Call Us
                    <span className='m-3 cursor-pointer' onClick={handlePhoneCall}>

                        <PhoneIcon className='text-green-400' />
                        (+254) 784267825
                    </span>

                </h1>
                <h1>Let`s Chat Here 👉
                    <span className='m-3'>
                        <a href="https://wa.me/+254742377527">
                            <WhatsAppIcon className='text-green-400' />
                        </a>
                    </span>
                </h1>
            </div>
        </div >
    )
}

export default Help;
