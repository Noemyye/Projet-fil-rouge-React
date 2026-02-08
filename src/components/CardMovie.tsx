import EndGameImage from '../assets/end-game.jpg';

export default function CardMovie() {
    const movie = {
        title: "Inception",
        director: "Christopher Nolan",
        year: 2010,
        genre: "Science Fiction",
        rating: 8.8,
        src: EndGameImage, // Utilisation de l'import
    };

    return (
        <div className="w-70 h-100 bg-gray-700 rounded-2xl">
            <img src={movie.src} className="w-full h-full rounded-2xl object-cover" alt={movie.title} />
        </div>
    );
}