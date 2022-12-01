import { ReactStateStore } from '@astro-auth/client';
import { Login } from './Login';
import styles from './User.module.css';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  image: string;
}

export const User = () => {
  const user = (
    ReactStateStore.useUser({ update: true }) as { user?: UserInfo }
  )?.user as UserInfo;

  if (!user) {
    return (
      <div className={styles.login}>
        <Login />
      </div>
    );
  }

  return (
    <div className={styles.user}>
      <span className={styles.name}>{user.name}</span>
      <img className={styles.image} src={user.image} width={50} height={50} />
    </div>
  );
};
