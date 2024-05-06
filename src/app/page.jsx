"use client";
import { useEffect, useState } from "react";
import api from "@/app/services/api";
import Link from "next/link";
import Slider from "./components/Slider";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get("movie/now_playing?", {
        params: {
          api_key: "b0d5979aeace1163c787c8bee0edda9b",
          language: "pt-BR",
          page: 1,
        },
      });

      //console.log(response.data.results.slice(0,10));
      setMovies(response.data.results.slice(0, 12));
      setLoading(false);
    }
    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center">
          <div
            className="loader ease-linear rounded-full border-4 border-t-4 h-12 w-12"
            style={{
              borderColor: "#1a202c",
              animation: "spin 2s linear infinite",
            }}
          ></div>
          <h2 className="mt-2">Carregando Filmes</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center items-center flex-col bg-gradient-to-t from-black via-red-600 to-[#160000]">
      <div className="">
        <div className="relative lg:mb-8 ">
          <Slider />
        </div>
      </div>
      <div className="bg-gradient-to-t from-red-500 to-white text-transparent bg-clip-text">
        <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text-3xl mt-10 font-bold mb-10">
          Filmes em Cartaz
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {movies.map((movie) => {
          return (
            <article
              key={movie.id}
              className=" text-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
            >
              <strong className="block truncate bg-gradient-to-t from-red-500 to-white text-transparent bg-clip-text ">
                {movie.title}
              </strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                className="mt-2 w-full h-auto rounded-t"
              />
              <Link
                href={`/Movies/${movie.id}`}
                className=" block text-center bg-red-400 text-white py-2 px-4 rounded-b hover:bg-red-800"
              >
                Acessar
              </Link>
            </article>
          );
        })}
      </div>
      <footer className=" mt-20 w-full bg-[#160000] text-white px-10 py-4 flex justify-between items-center">
        <span className="text-sm">
          Projeto Teste realizado para a empresa Next Tecnologia
        </span>
        <div className="flex flex-col text-center">
          <span className="text-sm">Todos os direitos reservados</span>
          <span className="text-sm">Matheus Henrique Correa Barbosa</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
