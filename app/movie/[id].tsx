import { icons } from "@/constants/icons";
import { fetchMoviesDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5 px-5">
    <Text className="text-white font-normal text-lg">{label}</Text>
    <Text className="text-gray-500 font-bold text-xl mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMoviesDetails(id as string));

  if (loading) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <Text className="text-white">Failed to load movie details.</Text>
      </View>
    );
  }

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            style={{ width: "100%", height: 500 }}
            resizeMode="stretch"
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5 w-full">
          <Text className="text-white font-bold text-2xl">{movie.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">{movie.runtime}m</Text>
          </View>

          <View className="flex-row items-center py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm w-full">
              ({movie?.vote_count} votes)
            </Text>
          </View>
        </View>

        <MovieInfo label="Overview" value={movie?.overview} />
        <MovieInfo
          label="Genres"
          value={movie?.genres.map((g) => g.name).join(" - ") || "N/A"}
        />

        <View className="flex flex-row justify-between w-1/2">
          <MovieInfo
            label="Budget"
            value={`$${movie?.budget / 1_000_000} million`}
          />
          <MovieInfo
            label="Revenue"
            value={`$${Math.round(movie?.revenue) / 1_000_000}`}
          />
        </View>
        <MovieInfo
          label="Production Companies"
          value={
            movie?.production_companies.map((c) => c.name).join(" - ") || "N/A"
          }
        />
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
