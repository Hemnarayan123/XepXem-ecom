// import React, { useEffect } from 'react';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthToken';
// import AllProduct from './AllProduct';

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const { role } = useAuth();

//   useEffect(() => {
//     if (role !== 'admin') {
//       navigate('/');
//     }
//   }, [role, navigate]);

//   return (
//     <div className=' min-h-[calc(100vh-120px)] flex mt-8 font-Roboto'>
//       <aside className='bg-blurr-0 text-white min-h-full w-[150px] p-4'>
//         <div className='h-32 flex justify-center items-center flex-col'>
//           <div className='text-5xl cursor-pointer relative flex justify-center'>
//             {/* Uncomment and update this section if user profile pic is available */}
//             {/* {
//             user?.profilePic ? (
//                 <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
//             ) : (
//                 <FaRegCircleUser/>
//             )
//             } */}
//           </div>
//           <p className='capitalize text-lg font-semibold mt-2'>{role?.name}</p>
//           <p className='text-sm'>{role?.role}</p>
//         </div>
//         {/*** Navigation ***/}
//         <nav className='mt-8'>
//           <Link to="/allusers" className='block px-2 py-2 hover:bg-[#a2a2a266]  rounded'>All Users</Link>
//           <Link to="" className='block px-2 py-2 hover:bg-[#a2a2a266]  rounded'>All Products</Link>
//         </nav>
//       </aside>

//       <main className='flex-grow bg-gray-100 ms-2'>
    
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;
