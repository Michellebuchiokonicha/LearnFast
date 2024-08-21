import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const EmptyState = ({title, subtitle}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
      source={images.empty} className="w-[270px] h-[215px]"
      resizeMode='contain'
      />
      <Text className="text-2xl font-bold">{title} </Text>
              <Text className="text-2xl font-bold">{subtitle}</Text>

    <CustomButton
    title="create video"
    handlePress={() => router.push('/create')}
    containerStyles="w-full my-5"
    />
    </View>
  )
}

export default EmptyState