"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

function Favorite() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const mylist = localStorage.getItem("@justmovies");
    setMovies(JSON.parse(mylist) || []);
  }, []);

  function deleteMovie(id) {
    let filterMovies = movies.filter((item) => {
      return item.id !== id;
    });

    setMovies(filterMovies);
    localStorage.setItem("@justmovies", JSON.stringify(filterMovies));
    toast.success("Filme removido com sucesso");
  }

  return (
    <div className="flex justify-center items-center mt-7 text-center ">
      <div>
        <h1 className="mb-5 font-semibold text-3xl uppercase">Minha Lista</h1>
        {movies.length === 0 && <span>Você não possui nenhum filme salvo</span>}
        <div className="flex flex-wrap justify-center">
          {movies.map((item, index) => {
            return (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center lg:w-1/2 m-4"
              >
                <span className="font-semibold text-xl">{item.title}</span>
                <Image
                  src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                  alt={item.title}
                  className="mt-2 w-full h-auto"
                />
                <div className="flex justify-between mt-2 w-full">
                  <div className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-6 rounded">
                    <Link href={`/Movies/${item.id}`}>Ver detalhes</Link>
                  </div>
                  <div className="bg-red-500 hover:bg-red-700 text-white  py-2 px-6 rounded">
                    <button onClick={() => deleteMovie(item.id)}>
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Favorite;
