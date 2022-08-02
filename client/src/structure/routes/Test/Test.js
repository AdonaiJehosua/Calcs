import {useQuery, gql} from '@apollo/client';
const GET_MOVIES = gql`
        query directors {
  directors {
    name
  }
}
    `
export const Test = () => {



    const {loading, error, data} = useQuery(GET_MOVIES)
    console.log(error)


    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    return data.directors.map(({id, name}) => (
        <div key={id}>
            <p>{name}</p>
        </div>
    ))
}