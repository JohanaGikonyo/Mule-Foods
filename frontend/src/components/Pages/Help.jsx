import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';

function Help() {
    const handlePhoneCall = () => {
        window.location.href = 'tel:+254707556905'
    };

    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-md">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold mb-4">Need Help?</h1>
                    <p className="text-gray-600">Contact us for assistance.</p>
                </div>
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Call Us On:</h2>
                    <button className="flex items-center justify-center bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500" onClick={handlePhoneCall}>
                        <PhoneIcon className="mr-2" />
                        (+254) 707556905
                    </button>
                </div>
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Chat On WhatsApp:</h2>
                    <a href="https://wa.me/+254707556905" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                        <WhatsAppIcon className="mr-2" />
                        Chat On WhatsApp 👉
                    </a>
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-2">Technical Department:</h2>
                    <button className="flex items-center justify-center bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mb-2">
                        <WhatsAppIcon className="mr-2" />
                        <a href="https://wa.me/+254701423251" target="_blank" rel="noopener noreferrer">Chat On WhatsApp 👉</a>
                    </button>
                    <button className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-2">
                        <a href="mailto:mule@martial.co.ke">Send Us an Email</a>
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Help;
