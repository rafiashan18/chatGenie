// 'use client';

// import { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { useRouter } from 'next/navigation';
// import { auth } from '../firebase';
// import Link from 'next/link';

// export default function Signup() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       showAlert();
//       router.push('/login');
//     } catch (error) {
//       console.error('Error signing up:', error);
//     }
//   };

//   function showAlert() {
//     alert('Account created successfully');
//   }
//   return (
//     <div>
//       <h1>Signup</h1>
//       <form onSubmit={handleSignup}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Signup</button>
//       </form>
//       <Link href="/">  <button>Back to home</button></Link>
//     </div>
//   );
// }
