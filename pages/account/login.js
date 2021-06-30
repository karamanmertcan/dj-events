import { FaUser } from 'react-icons/fa';
import { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Layout from '@/components/Layout';
import AuthContext from '@/context/AuthContext';
import styles from '@/styles/AuthForm.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = e => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
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

          <input type="submit" value="Login" className="btn" />
        </form>

        <p>
          Don't have an account ?{' '}
          <Link href="/account/register">
            <a>Register</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}
