import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../api/components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div className="container">
      <Header currentUser={currentUser} /> 
      <Component currentUser={currentUser} {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client
    .get('api/users/currentUser')
    .catch((err) => console.log(err));

  let pageProps = {};
  if (appContext.Component.genInitialProps) {
    pageProps = await appContext.Component.genInitialProps(appContext.ctx);
  }
  
  return { pageProps, ...data };
};

export default AppComponent;