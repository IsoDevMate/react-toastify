import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import axios from 'axios'
import { useNotificationCenter } from 'react-toastify/addons/use-notification-center';
import { useEffect } from 'react';
 const notify = (message, position) => toast.success(message, {
   position: position,
   className: 'foobar'
 })

 const App = () => {
  const { notifications } = useNotificationCenter();

  const status = new Promise((resolve, reject) => {
  const data =axios.get("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.data)
    // eslint-disable-next-line no-const-assign
    .then(data= setTimeout(()=>resolve(data),3300))
    .catch(error => {
      console.error("Error:", error);
      reject(error); // Rejecting the promise on error

  })
})
useEffect(()=>{
  toast.promise(status,{data:{
     pending: "Promise is pending",
     success: "Promise  Loaded",
     error: "error"}
  })
},[])
  //container houses our toast pop-ups.

   return (
     <div>
       <button onClick={() => notify('wow so easy', toast.POSITION.TOP_RIGHT)}>NOTIFY</button>
       <ul>
                {notifications.map((notification) => (
                    <li
                        onClick={() => notify(notification.id)}
                        key={notification.id}
                        style={
                            notification.read ? (
                                { background: 'green', color: 'silver', padding: '0 20px' }
                            ) : (
                                {
                                    border: '1px solid black',
                                    background: 'navy',
                                    color: '#fff',
                                    marginBottom: 20,
                                    cursor: 'pointer',
                                    padding: '0 20px'
                                }
                            )
                        }
                    >
                        <span>id: {notification.id}</span>
                        <p>title: {notification.data.title}</p>
                        <p>text: {notification.data.text}</p>
                    </li>
                ))}
            </ul>
            <ToastContainer />
     </div>
   )
 }
  

export default App

