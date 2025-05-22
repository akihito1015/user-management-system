// components/RegisterForm.tsx

import React, { useState }  from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { createUser } from "../utils/api";

// 必要に応じて利用する
interface RegisterFormInputs {
  name: string;
  email: string;
  role: string;
}

interface RegisterFormProps {
  onSuccess?:() => void;
  onError?: (error: any) => void;
  disabled?: boolean;
 }

// TODO: 新規登録フォームコンポーネントを実装する
const RegisterForm: React.FC<RegisterFormProps> = ({
    onSuccess,
    onError,
    disabled = false,
  }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<RegisterFormInputs>();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      await createUser(data);
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/users");
      }
    } catch (error: any) {
      setErrorMessage("登録に失敗しました。もう一度お試しください。");
      console.error(error);
      if (onError) onError(error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        新規登録
      </Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="名前"
          fullWidth
          margin="normal"
          {...register("name", { required: "名前は必須です" })}
          error={!!errors.name}
          helperText={errors.name?.message}
          disabled={disabled}
        />

        <TextField
          label="メールアドレス"
          type="email"
          fullWidth
          margin="normal"
          {...register("email", {
            required: "メールは必須です",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "有効なメールアドレスを入力してください",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={disabled}
        />

        <TextField
          label="役職"
          fullWidth
          margin="normal"
          {...register("role", { required: "役職は必須です" })}
          error={!!errors.role}
          helperText={errors.role?.message}
          disabled={disabled}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={disabled}>
          登録
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
