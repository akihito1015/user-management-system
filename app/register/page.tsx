'use client';

import React from 'react';
<<<<<<< Updated upstream
import RegisterForm from '../../components/RegisterForm';

const RegisterPage: React.FC = () => {
  return <RegisterForm />;
};

export default RegisterPage;
=======
import { useRouter } from 'next/navigation';
import RegisterForm from '../../components/RegisterForm';

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const handleSuccess = () => {
    // 登録成功時にユーザー一覧ページへ遷移
    router.push('/users');
  };

  return <RegisterForm onSuccess={handleSuccess} />;
};

export default RegisterPage;
>>>>>>> Stashed changes
