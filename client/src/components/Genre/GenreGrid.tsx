import React from "react";
import { ShieldCloseIcon } from "lucide-react";

export interface Genre {
    id: number;
    name: string;
}
interface GenreGridProps {
    genres: { [key: string]: Genre },
    style?: React.CSSProperties,
    setGenres: (genres: { [key: string]: Genre }) => void,
    columns?: number
}
export default function GenreGrid({ genres, style, setGenres, columns = 4}: GenreGridProps) {

    const onRemove = (id: number) => {
        const newGenres = { ...genres };
        delete newGenres[id];

        setGenres(newGenres);
    }

    return (
        <div style={style} className={`grid grid-cols-${columns} gap-4 pt-4 pb-4`}>
            {Object.keys(genres).map(key => (
                <GenreGridItem key={key} onRemove={onRemove} id={genres[key].id} name={genres[key].name} />
            ))}
        </div>
    );
}
function GenreGridItem({ id, name, onRemove }: Genre & { onRemove: (id: number) => void }) {
    return (
        <div className="rounded-md shadow-sm flex justify-around p-2 bg-white">
            <p className="text-sm">{name}</p>
            <ShieldCloseIcon className="cursor-pointer" onClick={() => {
                onRemove(id);
            }} />
        </div>
    );
}
