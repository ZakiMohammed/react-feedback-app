import { useParams, useNavigate } from 'react-router-dom'
import Button from './shared/Button'


function Post() {

    const params = useParams();
    const navigate = useNavigate();

    return (
        <div>
            <h1>Post {params.id}</h1>
            <p>Name: {params.name}</p>
            <Button type='button' version='secondary' handleClick={() => navigate('/about')}>Click</Button>
        </div>
    )
}

export default Post
