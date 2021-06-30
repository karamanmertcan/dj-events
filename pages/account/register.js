import { FaUser } from 'react-icons/fa';
import { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import AuthContext from '@/context/AuthContext';
import Layout from '@/components/Layout';
import styles from '@/styles/AuthForm.module.css';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { register, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = e => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    }

    register({ username, email, password });
  };

  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              onChange={e => setUsername(e.target.value)}
              id="username"
              value={username}
            />
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <input type="text" onChange={e => setEmail(e.target.value)} id="email" value={email} />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={e => setPassword(e.target.value)}
              id="password"
              value={password}
            />
          </div>

          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              onChange={e => setPasswordConfirm(e.target.value)}
              id="passwordConfirm"
              value={passwordConfirm}
            />
          </div>

          <input type="submit" value="Register" className="btn" />
        </form>

        <p>
          Don't have an account ?{' '}
          <Link href="/account/login">
            <a>Login</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}
