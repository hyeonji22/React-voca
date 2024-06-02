import './App.css';
import Hello from "./component/Hello";
import Welcome from './component/Welcome';
import styles from './App.module.css';
function App() {
  const name ="tom"
  const naver = {
    name:'네이버',
    url:"https://naver.com",
  }
  return (
    <div className="App">
      <h1 
      style={{
        color:"red",
        backgroundColor:"green"
      }}>
        welcome, {name}
      </h1>
      <a href={naver.url}>{naver.name}</a>
      <Hello age={10} />
      <Hello age={20}/>
      <Hello age={30}/>
      <div className={styles.box}>app</div>
      <Welcome/>
    </div>
  );
}

export default App;
