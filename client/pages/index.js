import axios from 'axios';

const LandingPage = ({ currentUser }) => {
    console.log(currentUser)
  return <h1>Hello world</h1>;
};

LandingPage.getInitialProps = async () => {
  const response = await axios
    .get('/api/users/currentUser')
    // .catch((err) => console.log(err));

  return response.data;
};

export default LandingPage;
