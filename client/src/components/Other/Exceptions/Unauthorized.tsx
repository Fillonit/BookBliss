import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';

const Unauthorized = ({style}:{style?:React.CSSProperties}) => {
    return (
        <div style={style} className="flex flex-col items-center justify-center h-full p-11">
            <FontAwesomeIcon icon={faUserShield} size="6x" className="text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg text-center">
                Unauthorized
            </p>
        </div>
    );
};

export default Unauthorized;
