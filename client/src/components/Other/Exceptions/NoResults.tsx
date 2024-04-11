import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const NoResults = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-11">
            <FontAwesomeIcon icon={faSearch} size="6x" className="text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg text-center">
                No results found.
            </p>
        </div>
    );
};

export default NoResults;
