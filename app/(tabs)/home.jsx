import {
  FlatList,
  Text,
  View,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";
import { getAllPosts, getLatestPost } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPost } = useAppwrite(getLatestPost);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  console.log(posts);

  return (
    <SafeAreaView className="bg-white">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="text-2xl font-bold">welcome back </Text>
                <Text className="text-2xl font-bold">{user?.username}</Text>
              </View>
              <View className="mt-1.5">
                {/* <Image
                  source={images.logoSmall}
                  className="w-10 h-10"
                  resizeMode="contain"
                /> */}
              </View>
            </View>
            <SearchInput />
            <Text className="text-lg">Latest video</Text>

            <Trending posts={latestPost ?? []} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first on to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
