"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/app/services/api";
import { toast } from "react-toastify";

function Movies() {
  const { id } = useParams();
  const navigate = useRouter();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "b0d5979aeace1163c787c8bee0edda9b",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setMovie(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigate.push("/");
          return;
        });
    }

    loadMovie();

    return () => {
      console.log("Componente Desmontado");
    };
  }, []);

  function saveMovie() {
    const mylist = localStorage.getItem("@justmovies");

    let SaveMovies = JSON.parse(mylist) || [];

    const hasMovies = SaveMovies.some((MovieSave) => MovieSave.id === movie.id);

    if (hasMovies) {
      toast.warn("OPA, Parece que esse filme já está salvo em sua lista :) ");
      return;
    }

    SaveMovies.push(movie);
    localStorage.setItem("@justmovies", JSON.stringify(SaveMovies));
    toast.success("Filme Salvo com Sucesso");
  }

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
          <h2 className="mt-2">Carregando Detalhes</h2>
        </div>
      </div>
    );
  }
  return (
    <div className=" lg:max-w-[800px] flex flex-col m-auto">
      <h1 className="text-center mt-3 font-semibold lg:text-3xl md:text-3xl text-xl">
        {movie.title}
      </h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
        className="mt-2 w-full h-auto  p-4"
      />
      <h3 className="text-center lg:text-3xl mt-3 text-xl">Sinopse</h3>
      <span className="p-4 text-justify text-sm md:text-lg lg:text-lg font-light">
        {movie.overview}
      </span>
      <strong className="p-4 text-right">
        Avaliação: {movie.vote_average.toFixed(1)}/10
      </strong>
      <div className="flex text-center mr-3 mt-4 justify-around text-xl  ">
        <button
          onClick={saveMovie}
          className="bg-red-500 hover:bg-red-700 text-white  py-2 px-6 rounded"
        >
          Salvar
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white  py-2 px-6 rounded">
          <a
            target="blank"
            rel="external"
            href={`https://www.youtube.com/results?search_query=${movie.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Movies;
