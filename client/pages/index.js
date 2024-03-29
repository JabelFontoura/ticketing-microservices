import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>Hello, you are signed in!</h1> : <h1>You are not signed in!</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const { data } = await buildClient(context)
    .get('api/users/currentUser')
    .catch((err) => console.log(err));

  return data;
};

export default LandingPage;
