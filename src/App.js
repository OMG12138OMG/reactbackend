import './App.css';
import router from './router';
import { RouterProvider } from "react-router-dom";
import { useEffect } from 'react'; 
import { useDispatch } from 'react-redux'; 
import { setMenuList } from './store/reducer/menu'; 


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const localMenu = localStorage.getItem("menu");
    if (localMenu) {
      dispatch(setMenuList(JSON.parse(localMenu)));
    }
  }, [dispatch]);
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
