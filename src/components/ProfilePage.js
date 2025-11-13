import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { setProfile } from '../store/resumeSlice'
import '../styles/App.css'
const ProfilePage = () => {

  const dispatch=useDispatch();
  const profile=useSelector((state)=>state.resume.profile);

  const [form,setForm]=useState({
    fname:"",
    lname:"",
    phone:"",
    address:"",
    url:"",
    image:"",
  });

  useEffect(()=>{
    setForm(profile);
  },[profile]);

  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value,
    })
  }

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm({
        ...form,
        image: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };  

  const saveProfile = () => {
    dispatch(setProfile(form));
    alert("Profile Saved!");
  };


  return (
    <div className='profile-sectio'>
        <h1 className='profile-heading'>Add your profile details</h1>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:15}}>

        <input
        name='fname'
        placeholder='First Name'
        value={form.fname}
        onChange={handleChange}
        className='inputBox'
        /> 

        <input
          name='lname'
          placeholder='Last Name'
          value={form.lname}
          onChange={handleChange}
          className='inputBox'
        />

        <input
          name='phone'
          placeholder='Phone'
          value={form.phone}
          onChange={handleChange}
          className='inputBox'
        />

        <input
          name='address'
          value={form.address}
          placeholder='Address'
          className='inputBox'
        />

        <input
        name='url'
        value={form.url}
         placeholder="Portfolio / Website URL"
         onChange={handleChange}
          className="inputBox"
          style={{ gridColumn: "span 2" }}
        />

        <div style={{gridColumn:"span 2"}} className='img-div'>
        <label>Profile Image</label>
        <br></br>
        <input type="file" accept='image' onChange={handleImage}/>

        {form.image && (
          <div style={{margin:10}}>
            <img
              src={form.image}
              alt='Profile'
               style={{
                  width: 120,
                  height: 120,
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
            />

          </div>
        )}
        </div>
      </div>

       <button
        onClick={saveProfile}
        style={{
          padding: "8px 20px",
          marginTop: 20,
          cursor: "pointer",
        }}
      >
        Save Profile
      </button>
    </div>
  )
}

export default ProfilePage
