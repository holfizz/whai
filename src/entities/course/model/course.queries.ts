'use client'
import {gql, useQuery} from '@apollo/client'
import {ICourse} from "@/entities/course";


export const GET_LAST_COURSE = gql`
    query {
        getLastCourse {
            id
            name
            description
            progressPercents
        }

    }
`
export const useGetLastCourse = () => {
  const {data, error, loading} = useQuery<{ getLastCourse: ICourse }>(GET_LAST_COURSE, {
    fetchPolicy: 'cache-and-network',
  })
  return {lastCourseData: data?.getLastCourse, errorLastCourse: error, loadingLastCourse:loading}
}
