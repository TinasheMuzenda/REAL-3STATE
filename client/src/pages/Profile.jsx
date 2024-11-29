// import { useSelector } from "react-redux";
// import { useRef, useState } from "react";
// import {
//   updateUserFailure,
//   updateUserSuccess,
//   updateUserStart,
// } from "../redux/user/userSlice";
// import { useDispatch } from "react-redux";

// const Profile = () => {
//   const { currentUser, loading, error } = useSelector((state) => state.user);
//   const fileRef = useRef(null);
//   const [formData, setFormData] = useState({});
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(updateUserStart());
//       const res = await fetch(`/server/user/update/${currentUser._id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(updateUserFailure(error.message));
//         return;
//       }
//       dispatch(updateUserSuccess(data));
//     } catch (error) {
//       dispatch(updateUserFailure(error.message));
//     }
//   };

//   return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input type="file" ref={fileRef} hidden accept="image/*" />
//         <img
//           onClick={() => fileRef.current.click()}
//           src={currentUser}
//           alt="profile"
//           className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
//         />
//         <input
//           type="text"
//           placeholder="username"
//           defaultValue={currentUser.username}
//           id="username"
//           className="border p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           placeholder="email"
//           defaultValue={currentUser.email}
//           id="email"
//           className="border p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           placeholder="password"
//           defaultValue={currentUser.password}
//           id="password"
//           className="border p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <button
//           className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-80"
//           disabled={loading}
//         >
//           {loading ? "Loading..." : "Update"}
//         </button>
//       </form>
//       <div className="flex justify-between mt-5 ">
//         <span className="text-red-700 cursor-pointer">Delete Account</span>
//         <span className="text-red-700 cursor-pointer">Sign Out</span>
//       </div>

//       <p className="text-red-700 mt-5">{error ? error : ''}</p>
//     </div>
//   );
// };

// export default Profile;
// 21

import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/server/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(updateUserFailure(data.message || "Update failed"));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/server/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(deleteUserFailure(data.message || "Delete failed"));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" />
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser?.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser?.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser?.email}
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-80"
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5 ">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>

      {/* <p className="text-red-700 mt-5">{error ? error : 'none'}</p> */}
    </div>
  );
};

export default Profile;
